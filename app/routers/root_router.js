const BaseRouter = require('./base_router');
const HomeController = require('../controllers/home_ctrl');
const OrderController = require('../controllers/order_ctrl');
const DeliveryController = require('../controllers/delivery_ctrl');
const CustomerController = require('../controllers/customer_ctrl');
const UserController = require('../controllers/user_ctrl');
const SettingController = require('../controllers/setting_ctrl');

class RootRouter extends BaseRouter{
    constructor() {
        super();
    }
    config() {
        const homeCtrl = new HomeController();
        const orderCtrl = new OrderController();
        const deliveryCtrl = new DeliveryController();
        const customerCtrl = new CustomerController();
        const userCtrl = new UserController();
        const settingCtrl = new SettingController();

        this.addRouter('GET', '/', homeCtrl.index.bind(homeCtrl));
        this.addRouter('GET', '/order', orderCtrl.index.bind(orderCtrl));
        this.addRouter('GET', '/order/detail', orderCtrl.detail.bind(orderCtrl));
        this.addRouter('GET', '/delivery', deliveryCtrl.index.bind(deliveryCtrl));
        this.addRouter('GET', '/customer', customerCtrl.index.bind(customerCtrl));
        this.addRouter('GET', '/user', userCtrl.index.bind(userCtrl));
        this.addRouter('GET', '/setting', settingCtrl.index.bind(settingCtrl));
        this.addRouter('GET', '/login', homeCtrl.login);
    }
}

module.exports = RootRouter;