const BranchModel = require('./app/models/branch_model');
const RequestModel = require('./app/models/request_model');

(async () => {
    const model = new RequestModel();
    const rows = await model.getAll();
    console.log(rows);
    console.log('count ', await model.count());
    // const id = await model.add({name: 'ZARA', site: 'http://zara.com'});
    // console.log(id);

    // const res = await model.update({id: 3, name: 'ZARA', site: 'http://zara.uk'});
    // console.log(res);
    
})();
