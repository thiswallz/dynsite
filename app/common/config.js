/**
 * @ngdoc overview
 * @name collections
 * @description
 * modulo de personalización
 */
angular.module("gallery.configuration", [])


.config(['$routeProvider', function($routeProvider) {
    /*********************
     * ENDPOINTS
     *********************/
    var endPointBase = configSite.APIHOST + configSite.ENVIRONMENT + "/"; //configSite.base_url_api;
    var endPoint = [];
    endPoint['setStyles'] = endPointBase + "sitio/" + configSite.id_sitio + "/styles";
    endPoint['private'] = endPointBase + "sitio/" + configSite.id_sitio + "/login";
    endPoint['getStyles'] = endPointBase + "sitio/" + configSite.id_sitio + "/styles";
    endPoint['getCompanyData'] = endPointBase + "sitio/" + configSite.id_sitio + "/gallery";
    //endPoint['getVideosCategory']           = baseUrl + "/control/ctrl_api.php?m=getVideosPlaylist";
    endPoint['getSelectedVideo'] = endPointBase + "sitio"; // sitio/22/video/19068
    //endPoint['getRelatedVideos']            = baseUrl + "/control/ctrl_api.php?m=getRelacionados";
    endPoint['setAsLikedVideo'] = endPointBase + "sitio/" + configSite.id_sitio + "/like";
    endPoint['getPlayLists'] = endPointBase + "sitio/" + configSite.id_sitio + "/playlist";
    endPoint['getPlayers'] = endPointBase + "sitio/" + configSite.id_sitio + "/players";
    endPoint['getVideosData'] = endPointBase + "sitio/" + configSite.id_sitio + "/video";
    endPoint['trackVideo'] = endPointBase + "statistics/tracker";
    endPoint['setSite'] = endPointBase + "sitio/" + configSite.id_sitio + "/gallery";
    endPoint['getGeneralParam'] = endPointBase + "sitio/" + configSite.id_sitio + "/properties";
    endPoint['getVideoSourceCollections'] = endPointBase + "sitio/" + configSite.id_sitio + "/sources";
    endPoint['getCollectionMethod'] = endPointBase + "sitio/" + configSite.id_sitio + "/collections";
    endPoint['getValidatePayment'] = endPointBase + "payments/validate";
    endPoint['PaymentLogin'] = endPointBase + "payments/login";
    endPoint['Channel'] = endPointBase + "channel/embed";
    endPoint['LoginCustom'] = endPointBase + "sitio/" + configSite.id_sitio + "/logincustom";
    endPoint['LoginCustomValidate'] = endPointBase + "sitio/" + configSite.id_sitio + "/logincustomvalidate";
    window.endPoint = endPoint;//TODO ver que lib la ocupa si es externa ver la inclusion en modulos
}])