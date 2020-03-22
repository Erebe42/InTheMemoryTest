import * as db from './models/index';

export class Service {
  //@ts-ignore
  private model: db.BoughtProduct;
  constructor() {
    this.model = db.BoughtProduct;
  }

  public getTotalResult = async () => {
    const data = await this.model.findAll({
      attributes: [
        [db.sequelize.literal('SUM(ROUND("unitPrice"::numeric * "quantity"::numeric, 2))'), 'totalEarn']
      ],
    });
    return data[0];
  };

  public getAverageOrderPrice = async () => {
    const data = await db.sequelize.query('SELECT AVG(price) AS "averagePrice" FROM (SELECT SUM(ROUND("unitPrice"::numeric * "quantity"::numeric, 2)) as price FROM "BoughtProducts" GROUP BY "orderId") AS orderPrice;');
    return data[0][0].averagePrice;
  }

  public getCustomerAmount = async () => {
    const data = await this.model.count({
      distinct: true,
      col: 'BoughtProducts.customerId',
    });
    return data;
  }
}
