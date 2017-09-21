
angular.module("login.controller", [])

/**
 * @ngdoc type
 * @module login.controller
 * @name loginGeneralCtrl
 *
 * @description
 *
 * ## Controlador para el Login de las plantillas
 * 
 */
.controller('loginGeneralCtrl', ['$rootScope','formatValidateService','$location', '$scope', '$http', 'AuthenticationService', 
function($rootScope,formatValidateService, $location, $scope, $http, AuthenticationService) {
    /*********************
    *	Public Vars
    **********************/
    $scope.validateMail = formatValidateService.validateMail;
    $scope.loginDataCustom = {};
    $scope.loginValidateCustom = {};
    $scope.isCustomValidate = false;
    $scope.isCustomRecoverPassword = false;
    $scope.loginRecoverPassword = {};
    $scope.isCustomRecoverSendMail = false;


    /*********************
    *	Public Functions
    **********************/
    $scope.loginCustomRecoverForm = _loginCustomRecoverForm;
    $scope.loginCustomRecoverPassword = _loginCustomRecoverPassword;
    $scope.loginCustomAccess = _loginCustomAccess;
    $scope.loginCustom = _loginCustom;
    $scope.loginCustomValidate = _loginCustomValidate;
    $scope.login = _login;


    /****************************************************
     * initialization
     ***************************************************/
    _init();


    /****************************************************
     *  Private functions
     ***************************************************/
    /**
     * @ngdoc method
     * @name loginGeneralCtrl#_init
     *
     * Inicializa elementos, se maneja como un constructor del controlador
     */
    function _init() {
    };

    function _loginCustomRecoverForm() {
        $scope.isCustomRecoverPassword = true;
        $scope.isCustomValidate = false;
        $scope.isCustomSendMail = false;
    };
    function _loginCustomRecoverPassword() {
        $scope.dataLoadingRecoverPassword = true;
        AuthenticationService.LoginCustomRecoverPassword($scope.loginRecoverPassword.email, configSite.id_sitio).then(function(data) {
            if (data.msg === 'ok') {
                $scope.isCustomRecoverPassword = false;
                $scope.dataLoadingRecoverPassword = false;
                $scope.isCustomRecoverSendMail = true;
                $scope.isCustomValidate = true;
                $scope.isCustomSendMail = false;
            } else if (data.msg === 'error') {
                $scope.errorRecoverPassword = data.response;
                $scope.dataLoadingRecoverPassword = true;
            } else {
                $scope.errorRecoverPassword = data.response;
                $scope.dataLoadingRecoverPassword = true;
            }
        }).catch(function(e) {
            console.log('Error: ', e);
            $scope.dataLoadingRecoverPassword = true;
            throw e;
        });
    };
    function _loginCustomAccess() {
        $scope.isCustomValidate = true;
        $scope.isCustomSendMail = false;
        $scope.isCustomRecoverSendMail = false;
    };

    function _loginCustom() {
        AuthenticationService.ClearCredentialsCustom();
        $scope.dataLoadingLoginCustom = true;
        AuthenticationService.LoginCustom($scope.loginDataCustom.email, $scope.loginDataCustom.password, configSite.id_sitio).then(function(data) {
            if (data.msg === "ok") {
                if (data.response === "ok") {
                    AuthenticationService.SetCredentialsCustom($scope.loginDataCustom.password, $scope.loginDataCustom.email, data.extraData.SESSION, configSite.id_sitio, data.extraData.CUSTOMER_ID);
                    $location.path('/');
                } else {
                    $scope.errorLoginCustom = data.response;
                    $scope.dataLoadingLoginCustom = false;
                }
            } else {
                $scope.errorLoginCustom = "Usuario no registrado"; // data.msg;
                $scope.dataLoadingLoginCustom = false;
            }
        }).catch(function(e) {
            $scope.dataLoadingLoginCustom = false;
            console.log('Error: ', e);
            throw e;
        });
    };

    function _loginCustomValidate() {
        AuthenticationService.ClearCredentialsCustom();
        $scope.dataLoadingValidateCustom = true;
        $scope.isCustomSendMail = false;

        AuthenticationService.LoginCustomValidate($scope.loginValidateCustom.email, configSite.id_sitio).then(function(data) {
            if (data.msg === "ok" && data.purchase_order) {
                $scope.isCustomValidate = true;
                $scope.dataLoadingValidateCustom = true;
            } else if (data.msg === "ok" && data.response === "Created") {
                $scope.isCustomValidate = true;
                $scope.isCustomSendMail = true;
            } else {
                $scope.errorValidateLogin = 'E-mail no creado en el sitio';
                $scope.isCustomValidate = false;
                $scope.isCustomSendMail = false;
                $scope.dataLoadingValidateCustom = false;
            }
        }).catch(function(e) {
            console.log('Error: ', e);
            $scope.dataLoadingValidateCustom = false;
            throw e;
        });
    };

    function _login() {
        AuthenticationService.ClearCredentials();
        $scope.dataLoadingLogin = true;
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
            if (response.msg === "ok") {
                AuthenticationService.SetCredentials($scope.username, $scope.password);
                $location.path('/');
            } else {
                $scope.errorLogin = response.msg;
                $scope.dataLoadingLogin = false;
            }
        });
    };
}])