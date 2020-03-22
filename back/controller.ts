import * as express from "express";
import { Service } from './service';

export class Controller {
  public router = express.Router();
  constructor() {
    const service = new Service();

    this.router.get('/', async (req, res) => {
      console.log(req.query);
      const { countries } = req.query;
      Promise.all([
        service.getTotalResult(countries),
        service.getAverageOrderPrice(countries),
        service.getCustomerAmount(countries),
        service.getRevenuPerMonth(countries),
      ]).then(([totalEarn, averagePrice, customerAmount, revenuePerMonth]) => {
        res.send({totalEarn, averagePrice, customerAmount, revenuePerMonth});
      }).catch((error) => {
        console.error(error);
        res.status(400).end();
      });
    });

    this.router.get('/countries', async (req, res) => {
      Promise.all([
        service.getCountries(),
      ]).then(([countries]) => {
        res.send({countries: countries.map(({country}) => country)});
      }).catch((error) => {
        console.error(error);
        res.status(400).end();
      });
    });
  }
}