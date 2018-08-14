const RequestModel = require('../models/request_model');
const BranchModel = require('../models/branch_model');
const OrderModel = require('../models/order_model');
const RequestStatusModel = require('../models/request_status_model');

class OrderController {
    constructor() {
        this.requestModel = new RequestModel();
        this.branchModel = new BranchModel();
        this.requestStatusModel = new RequestStatusModel();
        this.orderModel = new OrderModel();
    }

    async index(req, res) {
        const branchs = await this.branchModel.getAll();
        const status = await this.requestStatusModel.getAll();
     
        res.render('pages/order', {branchs, status});
    }

    async detail(req, res) {
        const branchs = await this.branchModel.getAll();
        const status = await this.requestStatusModel.getAll();
     
        res.render('pages/order-detail', {branchs, status});
    }

    async getOrders(req, res) {
        const orders = await this.orderModel.filter(req.query);
        (typeof orders !== "undefined") ?
            res.json({ message: 'success', data: [].concat(orders)}) :
            res.json({ message: 'success', data: []});
    }
}
module.exports = OrderController;