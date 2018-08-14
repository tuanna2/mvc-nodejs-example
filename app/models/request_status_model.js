const BaseModel = require('./base_model');
const TABLE = 'request_status';
class RequestStatusModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = RequestStatusModel