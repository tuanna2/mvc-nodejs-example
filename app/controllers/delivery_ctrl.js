const RequestModel = require('../models/request_model');
const BranchModel = require('../models/branch_model');
const RequestStatusModel = require('../models/request_status_model');

class DeliveryController {
    constructor() {
        this.requestModel = new RequestModel();
        this.branchModel = new BranchModel();
        this.requestStatusModel = new RequestStatusModel();
    }

    async index(req, res) {
        res.render('pages/delivery');
    }
}
module.exports = DeliveryController;