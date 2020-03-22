import * as express from "express";
import * as bodyParser from "body-parser";
import { Controller } from "./controller";
import * as cors from 'cors';

class App {
  public app: express.Application;
  public controller: Controller = new Controller();

  constructor() {
    this.app = express();
    this.config();
    this.app.use(this.controller.router);
  }
  
  private config(): void {
    this.app.use(cors({}));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;