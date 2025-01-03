import express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/private/user.router";
import { private_api } from "./routes";
import cors from "cors";
AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/private/api", private_api);
    app.listen(8000);
    console.log(
      "Express server has started on port 8000. Open http://localhost:8000/public/all to see results"
    );
  })
  .catch((error) => console.log(error));
