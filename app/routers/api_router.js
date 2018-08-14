const BaseRouter = require('./base_router');
const HomeController = require('../controllers/home_ctrl');
const OrderController = require('../controllers/order_ctrl');

class ApiRouter extends BaseRouter{
    constructor() {
        super();
    }
    config() {
        const homeCtrl = new HomeController();
        const orderCtrl = new OrderController();
        this.addRouter('GET', '/requests', homeCtrl.getRequests.bind(homeCtrl));
        this.addRouter('POST', '/requests', homeCtrl.addRequest.bind(homeCtrl));
        this.addRouter('POST', '/requests/order', homeCtrl.orderRequest.bind(homeCtrl));
        this.addRouter('PUT', '/requests', homeCtrl.updateRequest.bind(homeCtrl));
        this.addRouter('GET', '/branchs', homeCtrl.getBranchs.bind(homeCtrl));
        this.addRouter('GET', '/request-status', homeCtrl.getRequestStatus.bind(homeCtrl));
        this.addRouter('GET', '/orders', orderCtrl.getOrders.bind(orderCtrl));
    }
}

module.exports = ApiRouter;