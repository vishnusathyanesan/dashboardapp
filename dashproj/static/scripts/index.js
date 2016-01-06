var app = angular.module('myapp', ['ngCookies'])

app.run(function($http, $cookies) {
    // set the CSRF token here
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

});

app.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


app.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .success(function(data) {
            	alert(data)
            })
            .error(function() {});
    }
}]);


app.controller('login', function($scope, $http, fileUpload) {

    $scope.submit_login = function() {
        console.log($scope.email, $scope.password)
        if (!$scope.email) {
            $scope.error_message = 'Email not valid'
                // console.log('enter email')
        } else {
            var data = {
                email: $scope.email,
                password: $scope.password
            }
            $http.post("/login/", {
                data: data
            }).success(function(data) {
                if (data.status == "login successfull") {
                    window.location.href = "/upload/";
                }
                else{
            		$scope.error_message_bknd = data.status;

                }
            })
        }

    }
    $scope.uploadFile = function() {
        var file = $scope.myFile;
        var uploadUrl = "/upload/";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    }

    $scope.get_files = function(){
    	$http.get('/getFile/').success(function(data){
    		$scope.file_names = data['data'];
    	});
    }
    $scope.show_pdf = function(name){
    	console.log(name);
    	
    	window.location.href = "/pdf/?name="+name;
     }
});