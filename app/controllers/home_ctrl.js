const RequestModel = require('../models/request_model');
const BranchModel = require('../models/branch_model');
const RequestStatusModel = require('../models/request_status_model');

class HomeController {
    constructor() {
        this.requestModel = new RequestModel();
        this.branchModel = new BranchModel();
        this.requestStatusModel = new RequestStatusModel();
    }

    async index(req, res) {
        const branchs = await this.branchModel.getAll();
        const status = await this.requestStatusModel.getAll();
        res.render('pages/index', {branchs, status});
    }
    async order(req, res) {
        // const branchs = await this.branchModel.getAll();
        // const status = await this.requestStatusModel.getAll();
        res.render('pages/order');
    }
    
    login(req, res) {
        res.render('pages/login');
    }

    async orderRequest(req, res) {
        console.log(req.body['ids[]']);
        const rs = await this.requestModel.updateStatus(req.body['ids[]']);
        res.json({ message: 'success', data: rs});
    }

    async updateRequest(req, res) {
        console.log(req.body);
        const rs = await this.requestModel.update(req.body);
        res.json({ message: 'success', data: rs});
    }

    async addRequest(req, res) {
        console.log(req.body);
        const rs = await this.requestModel.add(req.body);
        res.json({ message: 'success', data: rs});
    }

    async getRequests(req, res) {
        // console.log(req.query);
        // const requests = await this.requestModel.getAll();
        const requests = await this.requestModel.filter(req.query);
        (typeof requests !== "undefined") ?
            res.json({ message: 'success', data: [].concat(requests)}) :
            res.json({ message: 'success', data: []});
    }

    async getBranchs(req, res) {
        const requests = await this.branchModel.getAll();
        (typeof requests !== "undefined") ?
            res.json({ message: 'success', data: requests}) :
            res.json({ message: 'success', data: []});
    }

    async getRequestStatus(req, res) {
        console.log(req.query);
        // const requests = await this.requestModel.getAll();
        const requests = await this.requestStatusModel.getAll();
        (typeof requests !== "undefined") ?
            res.json({ message: 'success', data: requests}) :
            res.json({ message: 'success', data: []});
    }
    
}
module.exports = HomeController;