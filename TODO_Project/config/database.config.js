import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URI, {
        dbName: "TODO_Backend",
    })
        .then(() => {
            console.log("Database connected!");
        })
        .catch((err) => {
            console.log("DB connection Error: : " + err);
        })
}