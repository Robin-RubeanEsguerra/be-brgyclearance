import express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/private/userRouter";
import { private_api, public_api } from "./routes";
import cors from "cors";
AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/private/api", private_api);
    app.use("/public/api", public_api);
    app.listen(8000);
    console.log(
      "Express server has started on port 8000. Open http://localhost:8000/private/api/users to see results"
    );
  })
  .catch((error) => console.log(error));
