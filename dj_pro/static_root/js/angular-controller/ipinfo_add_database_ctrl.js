app.controller('ipinfo_add_database_ctrl',
function($scope, Place, Ip_Info, Database_Addr, Database_Conn, Database_Info, ipCookie, $http){
    $scope.AddrData = {};
    $scope.AddrData.database_addr = '';
    $scope.ConnData = {};
    $scope.ConnData.data_user = '';
    $scope.ConnData.data_pass = '';
    $scope.database_addrs = Database_Addr.query();
    $scope.database_conns = Database_Conn.query();
    
    Database_Addr.query(function(AddrData){


         window.operateEvents = {
    	    'click .remove': function (e, value, row, index) {
             alert('You click edit icon, row: ' + row.id);

             console.log(value, row, index);
             checklog = ipCookie('loginname');
             console.log(checklog);
             if(checklog === undefined){
                 alert('非法操作，请先登录！');
                 return;
             };

             id = {id: row.id};
             return;
            $window.location.href = "/ipinfo/ip_add_place";
            }
         };

            function operateFormatter(value, row, index) {
                return [
                      '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
                      '<i class="glyphicon glyphicon-edit"></i>',
                      '</a>',
                ].join('');
            };

            function rowStyles(row, index) {
                var classes = ['active', 'success', 'info', 'warning', 'danger'];

                return {};
            };
            table_dataaddr = [{
                field: 'database_addr',
                title: '数据库地址',
               align: 'center',
               valign: 'middle'
            },{
               field: 'operate',
               title: '项目操作',
               align: 'center',
               valign: 'middle',
               clickToSelect: false,
               formatter: operateFormatter,
               events: operateEvents
            }];

            $('#table-dataaddr-basic').bootstrapTable({
                method: 'get',
                striped: true,
                cache: false,
                pagination: false,
                pageSize: 50,
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                columns: table_dataaddr,
                rowStyle: rowStyles,
                data: $scope.database_addrs
            });
 
 
    // -------- 修改地址信息
        $scope.data_addr_post = function() {
            checklog = ipCookie('loginname');
            console.log(checklog);
            if(checklog === undefined){
                alert('非法操作，请先登录！');
                return;
            };
            msg = '';
            var post = new Database_Addr($scope.AddrData);

            if($scope.AddrData.database_addr == ''){
                msg = '数据库连接地址不能为空';
            };
            for( i in AddrData){
                if($scope.AddrData.database_addr == AddrData[i].database_addr){
                    console.log(AddrData[i]);
                    msg = "对象已存在:" + AddrData[i].database_addr;
                    };
                };
            $scope.AddrData_msg = msg;
            if(msg != ''){
                return;
            };
            //地址信息检测结束

            //alert("数据将被修改");
            // $scope.IpData.place = 1;
            console.log($scope.AddrData);
            $http({
                method: 'POST',
                url: '/ipinfo/database_addr_api/',
                data: JSON.stringify($scope.AddrData),
            }).success(function(result){
                console.log('success');
                alert('信息添加成功！');
                window.location.href = "/ipinfo/ip_add_place";
            }).error(function(err){
            // $window.location.href = "/login";
                console.log('error');
            });
        };
        // --------
    });


    Database_Conn.query(function(ConnData){

         window.operateEvents = {
    	    'click .remove': function (e, value, row, index) {
             alert('You click edit icon, row: ' + row.id);

             console.log(value, row, index);
             checklog = ipCookie('loginname');
             console.log(checklog);
             if(checklog === undefined){
                 alert('非法操作，请先登录！');
                 return;
             };

             id = {id: row.id};
             return;
            $window.location.href = "/ipinfo/ip_add_place";
            }
         };

            function operateFormatter(value, row, index) {
                return [
                      '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
                      '<i class="glyphicon glyphicon-edit"></i>',
                      '</a>',
                ].join('');
            };

            function rowStyles(row, index) {
                var classes = ['active', 'success', 'info', 'warning', 'danger'];

                return {};
            };
            table_dataconn = [{
                field: 'data_user',
                title: '数据库用户名',
               align: 'center',
               valign: 'middle'
            },{
                field: 'data_pass',
                title: '数据库密码',
               align: 'center',
               valign: 'middle'
            },{
               field: 'operate',
               title: '项目操作',
               align: 'center',
               valign: 'middle',
               clickToSelect: false,
               formatter: operateFormatter,
               events: operateEvents
            }];

            $('#table-dataconn-basic').bootstrapTable({
                method: 'get',
                striped: true,
                cache: false,
                pagination: false,
                pageSize: 50,
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                columns: table_dataconn,
                rowStyle: rowStyles,
                data: $scope.database_conns
            });
 
 
    // -------- 修改地址信息
        // -------- 修改地址信息
        $scope.data_conn_post = function() {
            checklog = ipCookie('loginname');
            console.log(checklog);
            if(checklog === undefined){
                alert('非法操作，请先登录！');
                return;
            };
            msg = '';
            console.log($scope.ConnData);
            var post = new Database_Conn($scope.ConnData);

            if($scope.ConnData.data_user == ''){
                msg = '数据库连接用户不能为空';
            };
            if($scope.ConnData.data_pass == ''){
                msg = '数据库连接密码不能为空';
            };
            for( i in ConnData){
                if($scope.ConnData.data_user == ConnData[i].data_user && $scope.ConnData.data_pass == ConnData[i].data_pass){
                    console.log(ConnData[i]);
                    msg = "对象已存在:" + ConnData[i].data_user;
                    };
                };
            $scope.ConnData_msg = msg;
            if(msg != ''){
                return;
            };
            //地址信息检测结束

            //alert("数据将被修改");
            // $scope.IpData.place = 1;
            console.log($scope.ConnData);
            $http({
                method: 'POST',
                url: '/ipinfo/database_conn_api/',
                data: JSON.stringify($scope.ConnData),
            }).success(function(result){
                console.log('success');
                alert('信息添加成功！');
                window.location.href = "/ipinfo/ip_add_place";
            // $window.location.href = "/setgame/mainpage";
            }).error(function(err){
            // $window.location.href = "/login";
                console.log('error');
            });
        };
        // --------
    });
    
    $scope.InfoData = {};
    $scope.InfoData.database_addr = '';
    $scope.InfoData.database_conn = '';
    $scope.InfoData.database_name = '';
    $scope.data_database_post = function(){
        checklog = ipCookie('loginname');
        console.log(checklog);
        if(checklog === undefined){
            alert('非法操作，请先登录！');
            return;
        };
        msg = '';
        database_conn = $scope.InfoData.database_conn;
        $scope.ip_detail_id = (window.location.pathname).split('/')[3];
        $scope.InfoData.ip_info = $scope.ip_detail_id;
        if($scope.InfoData.database_addr == ''){
            msg = '数据库地址不能为空';
        };
        $scope.database_addr_msg = '';
        if($scope.InfoData.database_conn == ''){
            msg = '数据库连接信息不能为空';
        };
        $scope.database_conn_msg = '';
        if($scope.InfoData.database_name == ''){
            msg = '数据库名不能为空';
        };
        $scope.database_name_msg = '';
        console.log($scope.InfoData);
        $scope.InfoData.database_conn = $scope.InfoData.database_conn.id;
        $scope.InfoData.database_addr = $scope.InfoData.database_addr.database_addr;
        $http({
            method: 'POST',
            url: '/ipinfo/database_info_api/',
            data: JSON.stringify($scope.InfoData),
        }).success(function(result){
            console.log('success');
            $scope.make_log = {};
            $scope.make_log.ip_info = $scope.ip_detail_id;
            $scope.make_log.username = ipCookie('loginname');
            $scope.make_log.log_add = 'databaseinfo: ' +$scope.InfoData.database_addr + " " + $scope.InfoData.database_name + " " + 'has been added';
            console.log($scope.make_log);

            $http({
                method: 'POST',
                url: '/ipinfo/log_save_api/',
                data: JSON.stringify($scope.make_log),
            }).success(function(result){
                        console.log('log add success');
            }).error(function(err){
                        console.log('log add error');
            });


            $scope.database_addr = $scope.InfoData.database_addr;
            $scope.database_conn = database_conn;
            $scope.database_name = $scope.InfoData.database_name;
            window.location.href = "/ipinfo/ip_info_add/" + $scope.ip_detail_id;
        }).error(function(err){
        // $window.location.href = "/login";
            console.log('error');
        });
        


        
    };
    
});
