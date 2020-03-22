import * as db from './models/index';
import { Op } from 'sequelize';

export class Service {
  //@ts-ignore
  private model: db.BoughtProduct;
  constructor() {
    this.model = db.BoughtProduct;
  }

  public getTotalResult = async (countries?: string[]) => {
    const whereCondition = {} as { country?: any };
    if (countries && countries.length > 0) {
      whereCondition.country = { [Op.or]: countries };
    }

    const data = await this.model.findAll({
      attributes: [
        [db.sequelize.literal('SUM(ROUND("unitPrice"::numeric * "quantity"::numeric, 2))'), 'totalEarn']
      ],
      where: whereCondition,
    });

    return data[0].dataValues.totalEarn;
  };

  public getAverageOrderPrice = async (countries?: string[]) => {
    let whereCondition = '';
    if (countries && countries.length > 0) {
      whereCondition = 'WHERE (' + countries.map((country) => `"BoughtProducts"."country" = '${country}'`).join(' OR ') + ')';
    }

    const data = await db.sequelize.query(
      `
        SELECT ROUND(AVG(price), 2) AS "averagePrice"
        FROM (SELECT SUM(ROUND("unitPrice"::numeric * "quantity"::numeric, 2)) as price
        FROM "BoughtProducts"
        ${whereCondition}
        GROUP BY "orderId") AS orderPrice;
      `
    );

    return data[0][0].averagePrice;
  }

  public getCustomerAmount = async (countries?: string[]) => {
    const whereCondition = {} as { country?: any };
    if (countries && countries.length > 0) {
      whereCondition.country = { [Op.or]: countries };
    }
    
    const data = await this.model.count({
      distinct: true,
      col: 'BoughtProduct.customerId',
      where: whereCondition,
    });

    return data;
  }

  public getRevenuPerMonth = async (countries?: string[]) => {
    let whereCondition = '';
    if (countries && countries.length > 0) {
      whereCondition = 'WHERE (' + countries.map((country) => `"BoughtProducts"."country" = '${country}'`).join(' OR ') + ')';
    }

    const data = await db.sequelize.query(
      `
        SELECT SUM(ROUND("unitPrice"::numeric * "quantity"::numeric, 2)) as revenue, to_char(date, 'YYYY-MM') AS date
        FROM "BoughtProducts"
        ${whereCondition}
        GROUP BY 2;
      `
    );

    return data[0];
  }

  public getCountries = async () => {
    const data = await db.sequelize.query('SELECT country FROM "BoughtProducts" GROUP BY 1');
    return data[0];
  }
}
