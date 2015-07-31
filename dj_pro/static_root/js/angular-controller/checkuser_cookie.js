app.factory('AuthService', ['$resource',
function($resource) {
    return $resource(
        '/users/:action', ///:password',
        {action:'@action',
        },
        {
            login: {
                method:'post',
                params: {
                    action: 'login/',
                    username: '@username',
                    password: '@password',
                }   
            },  
            logout: {
                method:'post',
                params: {
                    action: 'logout/'
                }   
            }   
        }
    );
}]);

app.controller('LoginCtrl', function LoginCtrl($scope, $window, AuthService, ipCookie, md5) {
    $scope.credentials = { username: "", password: "",gologin : true};
    $scope.login = function(credentials) {
        $scope.credentials.password =  md5.createHash($scope.credentials.password);
        console.log(credentials);
        AuthService.login({'username':credentials.username,'password':credentials.password},
        function(result){
            $scope.message = 'now login';
            console.log('come here');
            ipCookie('loginname', $scope.credentials.username, {path: '/'});
            ipCookie('password', $scope.credentials.password, {path: '/'});
            $window.location.href = "/ipinfo/ip_info_main";
            },  
        function(err){
            $scope.message = "password error or loginname not exists!"
            alert($scope.message);
            ipCookie.remove('loginname', {path: '/'});
            ipCookie.remove('password', {path: '/'});
            $window.location.href = "/login";
    });     
}   
});
