const db = require('../utils/dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'orders';
class OrderModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    filter(query) {
        return new Promise( (resolve, reject) => {
            let cond = {};
            if (query.branch_id != 0) cond.branch_id = query.branch_id;
            // cond.product_link
            db(TABLE).where( (builder) => {
                if (query.branch_id != 0) builder = builder.where('branch_id', query.branch_id)
                builder
                    .where('code', 'like', `%${query.code}%`)
                    .where('order_date', 'like', `%${query.order_date}%`)
                if (query.status != 0) builder.where('status', query.status)
            }).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
}
module.exports = OrderModel