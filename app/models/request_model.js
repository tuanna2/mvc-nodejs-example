const db = require('../utils/dbconnect');
const BaseModel = require('./base_model');
const TABLE = 'requests';

class RequestModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
    updateStatus(ids) {
        return new Promise( (resolve, reject) => {
            db(TABLE).whereIn('id', ids)
            .update('status', 2)
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
    filter(query) {
        return new Promise( (resolve, reject) => {
            let cond = {};
            if (query.branch_id != 0) cond.branch_id = query.branch_id;
            // cond.product_link
            db(TABLE).where( (builder) => {
                if (query.branch_id != 0) builder = builder.where('branch_id', query.branch_id)
                builder
                    .where('product_link', 'like', `%${query.product_link}%`)
                    .where('color', 'like', `%${query.color}%`)
                    .where('size', 'like', `%${query.size}%`)
                    .where('note', 'like', `%${query.note}%`)
                    .where('customer', 'like', `%${query.customer}%`)
                    .where('created_at', 'like', `%${query.created_at}%`)
                if (query.status != 0) builder.where('status', query.status)
            }).select('*')
            .then( res => resolve(res))
            .catch( err => reject(err));
        })
    }
}
module.exports = RequestModel