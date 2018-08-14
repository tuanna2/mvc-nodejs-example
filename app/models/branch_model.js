const BaseModel = require('./base_model');
const TABLE = 'branchs';
class BranchModel extends BaseModel {
    constructor() {
        super(TABLE);
    }
}
module.exports = BranchModel