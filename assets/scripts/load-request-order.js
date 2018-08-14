(function ($) {
    'use strict';

    var optDefault = {
        height: "700px",
        width: "100%",
        filtering: true,
        inserting: false,
        editing: false,
        sorting: true,
        rowClick: rowClick,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
    }
    var ctrl = {
        loadData: loadData
    };
    var fields = []
    var status = [];
    var currItem = {};
    var selectedItem = [];
    $('#btnChangeStatusRequest').click(function (e) {
        var data = selectedItem.map(function(item) {return item.id})
        $("body").loading();
        $.post('/api/requests/order', {ids: data}, function(res){
            clearCheck();
            $("#js-grid").jsGrid("loadData");
            $("body").loading('stop');
        })
    })
    $('#btnRequestAdd').click(function (e) {
        currItem = {};
        clearForm();
        if (!$("#right-sidebar").hasClass('open'))
            $("#right-sidebar").toggleClass("open");
    })
    $('#btnRequestDetail').click(function (e) {
        console.log('submit', currItem);
        $("#right-sidebar").loading();
        var data = {
            id: currItem.id,
            branch_id: $('#requestBranch').val(),
            product_link: $('#requestLink').val(),
            color: $('#requestColor').val(),
            size: $('#requestSize').val(),
            note: $('#requestNote').val(),
            customer: $('#requestCustomer').val(),
            deposits: $('#requestDeposits').val(),
            status: $('#requestStatus').val(),
            price: $('#requestPrice').val()
        };
        $.ajax({
            url: '/api/requests',
            type: 'PUT',
            data: data,
            success: function(res) {
                $("#right-sidebar").loading('stop');
                console.log(res);
                $("#js-grid").jsGrid("loadData");
            }
        });
    })
    $('#btnAddRequestDetail').click(function (e) {
        console.log('submit', currItem);
        $("#right-sidebar").loading();
        var data = {
            branch_id: $('#requestBranch').val(),
            product_link: $('#requestLink').val(),
            color: $('#requestColor').val(),
            size: $('#requestSize').val(),
            note: $('#requestNote').val(),
            customer: $('#requestCustomer').val(),
            deposits: $('#requestDeposits').val(),
            status: $('#requestStatus').val(),
            price: $('#requestPrice').val(),
            created_at: (new Date()).toLocaleDateString('vi')
        };
        $.post('/api/requests', data, function (res) {
            console.log(res);
            $("#js-grid").jsGrid("loadData");
            clearForm();
            $("#right-sidebar").loading('stop');
        })
    })
    function clearForm() {
        $('#requestBranch').val("")
        $('#requestLink').val("")
        $('#requestColor').val("")
        $('#requestSize').val("")
        $('#requestNote').val("")
        $('#requestCustomer').val("")
        $('#requestDeposits').val("")
        $('#requestStatus').val("")
        $('#requestPrice').val("")
    }
    function rowClick(args) {
        if ($(args.event.target).attr("class") == "form-check-input" ||
            $(args.event.target).attr("class") == "input-helper") {
            if ($(args.event.target).attr("class") == "form-check-input") {
                if (args.event.target.checked) {
                    selectedItem.push(args.item)
                } else {
                    selectedItem.splice(selectedItem.indexOf(args.item), 1);
                }
            }
        } else {
            currItem = args.item;
            if (!$("#right-sidebar").hasClass('open')) {
                $("#right-sidebar").toggleClass("open");
                
            }
            
            showDetail(currItem);
            
        }
    }
    function clearCheck() {
        $('.form-check-input').each(function(i, item) {item.checked = false});
    }
    function checkAll() {
        $('.form-check-input').each(function(i, item) {item.checked = true});
    }
    function showDetail(item) {
        $('#requestBranch').val(item.branch_id);
        $('#requestLink').val(item.product_link);
        $('#requestColor').val(item.color);
        $('#requestSize').val(item.size);
        $('#requestNote').val(item.note);
        $('#requestCustomer').val(item.customer);
        $('#requestDeposits').val(item.deposits);
        $('#requestStatus').val(item.status);
        $('#requestPrice').val(item.price);
    } 
    function loadData(filter) {
        var def = $.Deferred();

        $.ajax({
            type: "GET",
            url: "/api/requests",
            data: filter
        }).done(function (res) {
            console.log(res.data);
            def.resolve(res.data);
        });

        return def.promise();
    }
    function addItem(item) {
        fields.push(item);
    }
    function getCheckBoxItem(value, item) {
        var ele = $("<div>").addClass("form-check mt-0");
        var label = $("<label>").addClass("form-check-label"); 
        label.append($("<input>").attr("type", "checkbox")
                                .addClass("form-check-input")
                                .attr("checked", value || item.Checked))
                                .on("change", function () {
                                    item.Checked = $(this).is(":checked");
                                })
        label.append("<i class=\"input-helper\"></i>");
        ele.append(label);
        return ele;
    }
    function getLinkItem(value, item) {
        return $("<a>").attr("href", value).text("Link")
    }
    function getBadgeItem(value, item) {
        console.log(item, value);
        var ele = $("<div>").addClass("badge badge-fw")
        if (value == 1) ele.addClass("badge-warning")
        else if (value == 2) ele.addClass("badge-success")
        else if (value == 3) ele.addClass("badge-danger")
        ele.text(status.filter(function(i) {return i.id == value})[0].name);
        // ele.text("test");
        return ele;
    }
    function createOption(data) {
        addItem({ itemTemplate: getCheckBoxItem, width: 15 });
        addItem({ name: "branch_id", title: "Hãng", type: "select", items: [{ id: 0, name: "" }].concat(data.branchs), valueField: "id", textField: "name" });
        addItem({ name: "product_link", title: "Sản phẩm", type: "text", width: 60, itemTemplate: getLinkItem });
        addItem({ name: "color", title: "Màu", type: "text", width: 50 });
        addItem({ name: "size", title: "Size", type: "text", width: 50 });
        addItem({ name: "price", title: "Giá", type: "number", width: 50 });
        addItem({ name: "note", title: "Note", type: "text", width: 60 });
        addItem({ name: "customer", title: "Khách", type: "text", width: 70 });
        addItem({ name: "deposits", title: "Cọc", type: "number", width: 80 });
        addItem({ name: "status", title: "Trạng thái", type: "select", items: [{ id: 0, name: "" }].concat(data.status), valueField: "id", textField: "name", itemTemplate: getBadgeItem });
        addItem({ name: "created_at", title: "Ngày tạo", type: "text", width: 80 });
        addItem({ name: "created_at", title: "Mã đơn", type: "text" });
        optDefault.controller = ctrl;
        optDefault.fields = fields;
        return optDefault;
    }
    function initGrid(id, data) {
        if ($(id).length) {
            var opt = createOption(data);
            $(id).jsGrid(opt);
        }
    }
    $(function () {
        $.get('/api/branchs', function (res) {
            var branchs = res.data;
            $.get('/api/request-status', function (res) {
                status = res.data;
                initGrid("#js-grid", {branchs: branchs, status: status});
            })
        })
    });
})(jQuery);
