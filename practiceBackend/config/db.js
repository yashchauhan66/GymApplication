import mongoose from "mongoose";

const mongooUrl =
  "mongodb+srv://yashchauhan6660:Yash123@cluster0.7zebztz.mongodb.net/";

 function connectDB() {
  mongoose
    .connect(mongooUrl)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log("DB error", error);
    });
}

export default connectDB;