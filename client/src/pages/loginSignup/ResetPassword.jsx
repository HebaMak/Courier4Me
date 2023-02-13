import React from "react";

export const ResetPassword = () => {
  return (
    <>
      <div className="login_container">
        <div className="content">
          <div className="login-form">
            <h2 className="form-title"> </h2>
            <form method="POST" id="login-form">
              <div className="form-group form-group-login">
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                />
              </div>

              <div className="loginBtnContainer">
                <div className="form-group form-button">
                  <input type="submit" value="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
