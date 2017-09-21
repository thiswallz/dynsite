angular.module("payment.controller", [])

/**
 * @ngdoc type
 * @module payment.controller
 * @name paymentGeneralCtrl
 *
 * @description
 *
 * ## Controlador para los pagos de plantillas
 * 
 */
.controller('paymentGeneralCtrl', ['$rootScope' , '$scope', '$http', '$location', 'uuid', 'AuthenticationService', 
    function($rootScope, $scope, $http, $location, uuid, AuthenticationService) {
    
    /*********************
    *	Public Vars
    **********************/
    $scope.defaultPaymentMethod = 1;
    $scope.paymentCurrentScreen = 'login';
    $rootScope.siteData.paymentData = (IsJsonString(dataSite.payment_data)) ? JSON.parse(dataSite.payment_data) : [];
    $scope.isPayment = false;

    /*********************
    *	Private Vars
    **********************/

    /*********************
    *	Public Functions
    **********************/
    $scope.paymentLogin             = _paymentLogin;
    $scope.payment                  = _payment;
    $scope.setPaymentCurrentScreen  = _setPaymentCurrentScreen;

    /****************************************************
    *  initialization
    ***************************************************/
    _init();

    /****************************************************
     *  Private functions
     ***************************************************/
    /*
    * initialization
    */
    function _init() {

    };


    /**
     * payment
     * metodo para validar si tiene pagado el evento
     */
    function _paymentLogin(obdata) {
        AuthenticationService.ClearCredentialsPayment();
        $scope.dataLoading = true;
        AuthenticationService.PaymentLogin(obdata.password_pay, obdata.email_pay, configSite.id_sitio).then(function(data) {
            if (data.msg === "ok") {
                if (data.response === "ok") {
                    AuthenticationService.SetCredentialsPayment(obdata.password_pay, obdata.email_pay, data.extraData.PURCHASE_ORDER);
                    $location.path('/');
                } else {
                    $scope.errorPaymentLogin = data.response;
                    $scope.dataLoading = false;
                }
            } else {
                $scope.errorPaymentLogin = "Usuario no registrado"; // data.msg;
                $scope.dataLoading = false;
            }
        }).catch(function(e) {
            console.log('Error: ', e);
            throw e;
        });
    };

    function _payment(obdata) {
        AuthenticationService.ClearCredentialsPayment();
        $scope.dataLoading = true;
        AuthenticationService.PaymentValidate(obdata.password_pay, obdata.email_pay, configSite.id_sitio).then(function(data) {
            if (data.msg === "ok") {
                if (data.response === "ok") {
                    AuthenticationService.SetCredentialsPayment(obdata.password_pay, obdata.email_pay, data.extraData.PURCHASE_ORDER);
                    $location.path('/');
                } else {
                    $scope.errorPaymentPay = data.response;
                    $scope.dataLoading = false;
                }
            } else if (data.msg === "nok") {
                data.response.password_pay = obdata.password_pay;
                data.response.email_pay = obdata.email_pay;
                data.response.id_sitio = configSite.id_sitio;
                _paymentTrans(data.response);
            } else {
                $scope.errorPaymentPay = data.msg;
                $scope.dataLoading = false;
            }
        }).catch(function(e) {
            console.log('Error: ', e);
            throw e;
        });
    };

    function _setPaymentCurrentScreen(screen) {
        $scope.paymentCurrentScreen = screen;
    };

    function _paymentTrans(data) {
        AuthenticationService.PaymentInit(data);
        $scope.dataLoading = false;
        $rootScope.siteData.paymentData.oc = data.oc;
        $scope.isPayment = true;
    };

}])

/**
 * @ngdoc type
 * @module payment.controller
 * @name paymentSendCtrl
 *
 * @description
 *
 * ## Controlador para el envío del pago
 * 
 */
.controller('paymentSendCtrl', ['$scope', "uuid", 'AuthenticationService', '$location', 
function($scope, uuid, AuthenticationService, $location) {

    var dt = new Date();
    $scope.optsPaypal = {
        business: "YGVMT9BVBSDXE", //prod:7Q9BNVWB93DS6 : sandbox = "YGVMT9BVBSDXE", qqaa2 = BY3D5FZ2WDBXQ 
        item_name: "Venta Ticket PPV",
        item_number: dt.getTime(),
        invoice: uuid.v4(),
        amount: "1.00",
        currency_code: "USD",
        return_url: '/#/paymentsuccess',
        cancel_return: '/#/payment',
        item_site: 0,
        notify_url: APIHOST + ENVIRONMENT + "/payments/paypal"
    };
    $scope.isPaymentError = true;

    $scope.setData = function(params) {
        $scope.optsPaypal.amount = (params.amount) ? params.amount : $scope.optsPaypal.amount;
        $scope.optsPaypal.item_name = (params.item_name) ? params.item_name : $scope.optsPaypal.item_name;
        $scope.optsPaypal.item_number = (params.item_number) ? params.item_number : $scope.optsPaypal.item_number;
        $scope.optsPaypal.return_url = (params.return_url) ? params.return_url : $scope.optsPaypal.return_url;
        $scope.optsPaypal.cancel_return = (params.cancel_return) ? params.cancel_return : $scope.optsPaypal.cancel_return;
        $scope.optsPaypal.invoice = (params.invoice) ? params.invoice : $scope.optsPaypal.invoice;
        $scope.optsPaypal.item_site = (params.item_site) ? params.item_site : $scope.optsPaypal.item_site;
    };


    $scope.goSite = function() {
        $location.path('/');
    };

}]);