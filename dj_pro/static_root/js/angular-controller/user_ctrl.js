app.controller('user_ctrl', function($scope,ipCookie,$window,$http,md5, User) {
  // Get all posts
    $scope.users = User.query();
    
    $scope.isCollapsed = true;

    $scope.UserData = {};
    $scope.UserPost = function() {
        $scope.password_alert = '';
        var post = new User($scope.UserData);
        User.query(function(users){
            for( i in users){
                if($scope.UserData.username == users[i].username){
                        $scope.user_alert = "your register name has used";
                        return false;
                    };
                };
        alert("your register name is:"+ $scope.UserData.username+"\npassword is:"+$scope.UserData.password);
        if($scope.UserData.password != $scope.UserData.passwordcheck)
        {$scope.password_alert="password not match!"}else{
        console.log($scope.UserData);
        delete $scope.UserData.passwordcheck;
        console.log($scope.UserData);
        $http({
            method: 'POST',
            url: '/users/register/',
            data: {
                username: $scope.UserData.username,
                password: md5.createHash($scope.UserData.password),
                },
        }).success(function(result){
        $window.location.href = "/setgame/mainpage";
        ipCookie('loginname', $scope.UserData.username);
        ipCookie('loginname', md5.createHash($scope.UserData.password));
        }).error(function(err){
        $window.location.href = "/login";
        console.log($scope.UserData.username);
        });
        $window.location.href = "/setgame/mainpage";
        };
        });
        };
});
