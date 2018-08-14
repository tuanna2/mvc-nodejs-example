const BaseModel = require('./base_model');
const TABLE = 'customers';
class CustomerModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = CustomerModel