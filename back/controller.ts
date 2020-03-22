import * as express from "express";
import { Service } from './service';

export class Controller {
  public router = express.Router();
  constructor() {
    const service = new Service();

    this.router.get('/', async (req, res) => {
      const totalPrice = await service.getTotalResult();
      const averagePrice = await service.getAverageOrderPrice();
      const customerAmount = await service.getCustomerAmount();
      res.send({totalPrice, averagePrice, customerAmount});
    });
  }
}