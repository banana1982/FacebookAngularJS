myApp.controller('myCtrl', ['$scope', 'facebookService', function($scope, facebookService){
    $scope.isLogined = false;
    $scope.isUnlogined = !$scope.isLogined;
    $scope.imgProfileUrl = "";
    $scope.FBName = "";
    $scope.FBId = "";
    $scope.btnLogin = "Login";
    $scope.btnLogout = "Logout";
    $scope.listPage = [];
    $scope.listPageTemp = [];
    $scope.hiddened = "";
    $scope.pictureData = [];

    $scope.checkLoginStatus = function(){
        facebookService.checkLoginStatus().then(function(response){
            $scope.statusLogin = response.status;
            console.log(response);
        });
    };
    $scope.FBLogin = function(){
        facebookService.FBLogin().then(function(response){
            if(response.status){
                if(response.info.uname !== "" && response.status){
                    $scope.FBName = "Chào " + response.info.uname;
                    $scope.isLogined = response.status;
                    $scope.FBId = response.info.uid;
                    var ID =response.info.uid;
                    var picUrl = "";
                    facebookService.getPictureProfile(ID).then(function(response){
                        $scope.imgProfileUrl = response.data.url;
                        facebookService.getPagesList().then(function(response){
                            $scope.listPage = response.data;
                            $scope.isLogined = false;
                        });
                    });
                    console.log($scope.listPage);
                    $scope.isLogined = true;
                    $("#myModal").modal("show");    
                }
                else{
                    $scope.FBName = "Chưa đăng nhập";
                    $scope.isLogined = false;
                }
            }
            else{
                $scope.FBName = "Lỗi đăng nhập";
                $scope.isLogined = false;
            }
        });
    };
    $scope.getPagesList = function(){
        facebookService.getPagesList().then(function(response){
            console.log(response);
            $scope.listPage = response.data;
            console.log($scope.listPage);
        });
    };

    $scope.FBLogout = function(){
        facebookService.FBLogout().then(function(response){
            $scope.FBName = "Logout";
            $scope.FBId = "";
            $scope.hiddened = "hidden";
            $scope.listPage = [];
        });
    };

    $scope.getPageTab =function(){
        facebookService.getPageTab().then(function(response){
            
        });
    };
    $scope.getPictureProfile = function(){
        var ID = $scope.FBId;
        facebookService.getPictureProfile(ID).then(function(response){
            $scope.imgProfileUrl = response.data.url; 
        });
    };
    $scope.getAssignPage = function () {
        var ID = $scope.FBId;
        facebookService.getAssignedPage(ID).then(function (response) {
            console.log(response);
        });
    }
    $scope.getPagePicture = function(ID){
        var picUrl = '';
        var PID = ID;
        console.log("Get picture");
        facebookService.getPicturePage(PID).then(function(response){
            picUrl = response.data.url;
        });
        return picUrl;
    };
    
    $scope.disconnectFB = function(){
        console.log("Ngung ket noi");
    };

    $scope.disconnectChatFB = function(){
        console.log("Ngung nhan tin nhan");
    };

    $scope.Open = function(){
        $("#myModal").modal("show");
    };

    $scope.Ok = function(){
        $("#myModal").modal("hide");
    };

    $scope.Cancel = function(){
        $("#myModal").modal("hide");
    };
    
    
}]);