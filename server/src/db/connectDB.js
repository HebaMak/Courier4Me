import mongoose from "mongoose";

const connectDB = () =>
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default connectDB;
