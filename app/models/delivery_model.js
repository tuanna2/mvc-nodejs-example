const BaseModel = require('./base_model');
const TABLE = 'delivery';
class DeliveryModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = DeliveryModel