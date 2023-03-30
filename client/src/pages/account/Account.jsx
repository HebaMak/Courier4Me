import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../hooks/AuthContext";
import SignButton from "../../components/buttons/SignButton";
import MainButton from "../../components/buttons/MainButton";
import ClearButton from "../../components/buttons/ClearButton";
import DeliveryHistory from "../delivery/DeliveryHistory";
import ActiveDeliveriesforCourier from "../../components/courier/ActiveDeliveriesforCourier";
import ActiveDeliveriesforCustomer from "../../components/courier/ActiveDeliveriesforCustomer";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./account.css";

const Account = () => {
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newData, setNewData] = useState({});
  const [file, setFile] = useState("");
  const [openUploadWin, setOpenUploadWin] = useState(false);
  const [enabled, setEnabled] = useState(false);

  const { user, dispatch, currentUser, setCurrentUser } =
    useContext(AuthContext);

  const onSuccess = (data) => {
    setCurrentUser({ ...data.user });
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      setEnabled(false);
    }, 2000);
  };

  const { performFetch } = useFetch(`/user/${user._id}`, onSuccess);

  const handleChange = (e) => {
    setNewData((previous) => ({ ...previous, [e.target.id]: e.target.value }));
    setEnabled(true);
  };

  const changePic = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const uploadPic = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      let result;
      try {
        result = await axios.post(
          `${process.env.BASE_SERVER_URL}/api/photo/upload`,
          {
            image: reader.result,
          }
        );
      } catch (error) {
        setFile("");
        setErrorMessage("Unable to upload image, please check the size");
      }

      if (result?.data?.secure_url) {
        const url = result.data.secure_url;
        setCurrentUser((prevState) => {
          return { ...prevState, profilePic: url };
        });
        setNewData((prevState) => {
          return { ...prevState, profilePic: url };
        });

        updateData({ profilePic: url });
        setOpenUploadWin(false);
      }
    };
  };

  const updateData = (data) => {
    performFetch({
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: {
          _id: user._id,
          ...data,
        },
      }),
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setCurrentUser((prevState) => {
      return { ...prevState, ...newData };
    });
    updateData(newData);
  };

  const handleDelete = async () => {
    performFetch({
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>COURIER4ME | Account</title>
      </Helmet>
      <div className="account_page">
        <div className={openUploadWin ? "upload_win opened" : "upload_win"}>
          <i
            title="close window"
            className="fa fa-times close_win"
            onClick={() => {
              setOpenUploadWin(false);
              setFile(null);
            }}
          ></i>
          <img
            src={
              user.profilePic && file
                ? URL.createObjectURL(file)
                : currentUser && currentUser.profilePic
            }
            alt="profilePic"
          />
          <div className="upload_buttons_container">
            <label htmlFor="file">
              <i
                className="fa fa-upload upload_pic"
                aria-hidden="true"
                title="Upload a Pic"
              ></i>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              hidden
              onChange={(e) => changePic(e)}
            />
            {errorMessage && (
              <div className="error_message">{errorMessage}</div>
            )}
            <button onClick={uploadPic}>Submit</button>
          </div>
        </div>
        <div className="container">
          <div className="account_title">
            <div className="profile_image">
              <div className="image">
                <img
                  src={
                    currentUser?.profilePic
                      ? currentUser.profilePic
                      : "https://res.cloudinary.com/hapiii/image/upload/v1674139127/HYF/graduation%20project/go4nbxhyzhve9udxjnff.png"
                  }
                  alt="profilePic"
                />
                <i
                  className="fa fa-upload open_win"
                  aria-hidden="true"
                  title="Upload a Pic"
                  onClick={() => setOpenUploadWin(!openUploadWin)}
                ></i>
              </div>
            </div>

            <h3>
              {" "}
              Welcome,{" "}
              {currentUser &&
                `${currentUser.firstName} ${currentUser.lastName}`}{" "}
            </h3>
            <div className="delete_btn_container">
              <ClearButton title="Delete Account" handleClick={handleDelete} />
            </div>
          </div>
          <div className="user_info">
            <form action="POST" onSubmit={handleUpdate}>
              <div className="personal_data">
                <h4>update you information</h4>
                <h5 className="status">
                  {" "}
                  your status is:{" "}
                  {currentUser && currentUser.isCourier ? "Courier" : "User"}
                </h5>
                <div className="form-group">
                  <label htmlFor="firstName">first name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={handleChange}
                    placeholder={currentUser && currentUser.firstName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">last name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    onChange={handleChange}
                    placeholder={currentUser && currentUser.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">email</label>
                  <input
                    className="email"
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    placeholder={currentUser && currentUser.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">phone number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleChange}
                    placeholder={currentUser && currentUser.phoneNumber}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="******"
                  />
                </div>
                <div className="form-group select_box">
                  <label htmlFor="isCourier">Become a</label>
                  <select
                    name="isCourier"
                    id="isCourier"
                    onChange={handleChange}
                  >
                    <option value={false}>User</option>
                    <option value={true}>Courier</option>
                  </select>
                </div>
                <div className="form-group update_btn">
                  <div type="submit" className="update_btn">
                    <SignButton
                      title="Update"
                      disabled={!enabled}
                      titleTxt="update field/s before clicking"
                    />
                  </div>
                  {successMessage && (
                    <span className="update_msg">
                      data updated successfully
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
          {currentUser.isCourier && (
            <>
              <div className="deliveries courier-deliveries">
                <h4 className="title">all deliveries requests</h4>
                <Link to="/deliveryRequests">
                  <MainButton title="See the Requests" />
                </Link>
              </div>
              <div className="deliveries courier-deliveries">
                <ActiveDeliveriesforCourier />
              </div>
            </>
          )}
          <div className="deliveries courier-deliveries">
            <ActiveDeliveriesforCustomer />
          </div>
          <div className="deliveries courier-deliveries">
            <DeliveryHistory />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
