app.controller('ipinfo_add_place_ctrl',
function($scope, Place, Ip_Info, ipCookie, $modal, $log, $http){
    $scope.gochecklog = ipCookie('loginname');
    $scope.places = Place.query();
    $scope.ip_infos = Ip_Info.query();
    $scope.FirmData = {};
    $scope.FirmData.firm = '';
    $scope.FirmData.district = '';
    
    Place.query(function(firmdata){
 
 
    // -------- 修改地址信息
    $scope.firm_place_post = function() {
        checklog = ipCookie('loginname');
        console.log(checklog);
        if(checklog === undefined){
            alert('非法操作，请先登录！');
            return;
        };
        msg = '';
        console.log($scope.FirmData);
        var post = new Place($scope.FirmData);

        if($scope.FirmData.firm == ''){
            msg = '公司名不能为空';
        };
        if($scope.FirmData.district == ''){
            msg = '地区不能为空';
        };
        for( i in firmdata){
            if($scope.FirmData.firm == firmdata[i].firm && $scope.FirmData.district == firmdata[i].district){
                console.log(firmdata[i]);
                msg = "对象已存在:" + firmdata[i].firm + ',' + firmdata[i].district;
                };
            };
        $scope.firmdata_msg = msg;
        if(msg != ''){
            return;
        };
        //地址信息检测结束

       // alert("数据将被修改");
        // $scope.IpData.place = 1;
        console.log($scope.FirmData);
        $http({
            method: 'POST',
            url: '/ipinfo/place_api/',
            data: JSON.stringify($scope.FirmData),
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
    
    

    Place.query(function(place_key){
             window.operateEvents = {
                'click .edit': function (e, value, row, index) {
                alert('You click edit icon, row: ' + row.id);

                console.log(value, row, index);
                checklog = ipCookie('loginname');
                if(checklog === undefined){
                    alert('非法操作，请先登录！');
                    return;
                };
		rowid = row.id;
		var modalInstance = $modal.open({
      			templateUrl: 'myModalContent.html',
      			controller: 'ModalInstanceCtrl',
      			resolve: {
        		items: function () {
          			return rowid;
        			}
      			}
    		});

		modalInstance.result.then(function (selectedItem) {
      			$scope.selected = selectedItem;
    			}, function () {
      			$log.info('Modal dismissed at: ' + new Date());
    		});
		

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
	    table_place = [{
                field: 'firm',
                title: '公司',
               align: 'center',
               valign: 'middle'
            },{
                field: 'district',
                title: '所在地',
               align: 'center',
               valign: 'middle'
	    }, {
               field: 'operate',
               title: '项目操作',
               align: 'center',
               valign: 'middle',
               clickToSelect: false,
               formatter: operateFormatter,
               events: operateEvents
            }];
            
            $('#table-place-basic').bootstrapTable({
                method: 'get',
                striped: true,
                cache: false,
                pagination: false,
                pageSize: 50,
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                columns: table_place,
                rowStyle: rowStyles,
                data: $scope.places
            });
        });


});


app.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  console.log(items);
  $scope.selected = {
    item: $scope.items
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
