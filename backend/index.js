import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
console.log("loaded ", process.env.CORS_ORIGIN);

import connectDB from "./src/db/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connecetion failed !!!", err);
  });
