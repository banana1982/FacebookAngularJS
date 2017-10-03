myApp.factory('facebookService',function($q) {
    return {
        checkLoginStatus : function(){
            var deferred = $q.defer();
            var check = false;
            var uid = '';
            var accessToken = '';
            var result = {};
            FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                check = true;
                uid = response.authResponse.userID;
                accessToken = response.authResponse.accessToken;
                result = {
                    status:check,
                    message: "Login successful",
                    uid:uid,
                    accessToken:accessToken
                };
                deferred.resolve(result);
            } else if (response.status === 'not_authorized') {
                check = false;
                result = {
                    status: check,
                    message: response.status
                };
                deferred.reject(result);
            } else {
                result = {
                    status: check,
                    message: "Login failed"
                };
                deferred.resolve(result);
            }
            });
            return deferred.promise;
        },
        getPagesList: function() {
            var deferred = $q.defer();
            FB.api('/me/accounts', {
                    scope: 'pages_show_list',
                    auth_type: 'request'
            }, function(response) {
                // console.log(response);
                if (!response || response.error) {
                    var pages = {
                        status:false,
                        message:"GET_LIST_PAGE_ERROR",
                        details: response.error
                    };
                    deferred.resolve(pages);
                } else {
                    var pages = {
                        status:true,
                        message:"GET_LIST_PAGE_SUCCESSFUL",
                        data: response.data,
                        paging:response.paging
                    };
                    deferred.resolve(pages);
                }
            });
            return deferred.promise;
        },
        FBLogin: function(){
            var deferred = $q.defer();
            var result = {};
            FB.login(function(response) {
                if (response.authResponse) {
                    console.log('Welcome!  Fetching your information.... ');
                    console.log(response);
                    FB.api('/me', function(response) {
                    result = {
                        status: true,
                        message:"LOGIN_SUCCESSFUL",
                        info:{
                            uid: response.id,
                            uname: response.name
                        }
                    };
                    deferred.resolve(result);
                });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                    result = {
                        status: true,
                        message:"LOGIN_UNAUTHORIZE",
                    };
                    deferred.resolve(result);
                }
            },  {
                    scope: 'manage_pages',
                    auth_type: 'rerequest'
                },
                {
                    scope: 'pages_show_list',
                    auth_type: 'granted'
                }
            );
            return deferred.promise;
        },
        FBLogout : function(){
            var deferred = $q.defer();
            FB.logout(function(response) {
                console.log('Welcome!  Fetching your information.... ');
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        getPageInfo : function(){
            var deferred = $q.defer();
            FB.Canvas.getPageInfo(
                function(info) {
                    console.log(info);
                    deferred.resolve(info);
                }
            );
            return deferred.promise;
        },
        getPageTab : function(){
            var deferred = $q.defer();
            FB.ui({
                method: 'pagetab',
                redirect_uri: 'YOUR_URL'
            }, 
            function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        },
        getPictureProfile : function(ID){
            var deferred = $q.defer();
            FB.api(
                "/"+ ID +"/picture",
                function (response) {
                    if (response && !response.error) {
                        deferred.resolve(response);
                    }
                }
            );
            return deferred.promise;
        },
        getAssignedPage : function(ID){
            var deferred = $q.defer();
            FB.api(
                "/" + ID + "/assigned_pages",
                function (response) {
                  if (response && !response.error) {
                    deferred.resolve(response);
                  }
                  else{
                    deferred.resolve(response.error);
                  }
                }
            );
            return deferred.promise;
        }
    };    
});