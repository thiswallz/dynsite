
angular.module("gallery.options.custom")

/**
 * @ngdoc type
 * @module home.controller
 * @name liveCtrl
 *
 * @description
 *
 * ## Controlador plantilla Live
 * Funcionalidades Live extras a las del proyecto CORE, extensión general del proyecto CORE
 */
.controller("liveCtrl", function($scope, $compile, $timeout, NgMap, $rootScope, $sce, utilSectionService) {
    /*********************
    *	Public Vars
    **********************/
    $scope.layout = 1; //1 or 2 layout with long twitter timeline

    /*********************
    *	Private Vars
    **********************/
    var _maps;
    var _customData = $rootScope.siteData.custom_data;


    /*********************
    *	Public Functions
    **********************/
    $scope.initMap = _initMap;

    /****************************************************
     * initialization
     ***************************************************/
    _init();

    /****************************************************
     *  Private functions
     ***************************************************
    /**
     * @ngdoc method
     * @name LiveCtrl#_init
     *
     * Inicializa elementos, se maneja como un constructor del controlador
     */
    function _init() {
        _getAllCustomFieldsFromArray();
        /**
         * Autogeneración de secciones
         */
        $scope.opciones = {
            subtitulo: "Datos del sub.."
        };
        
    };

    /**
     * @ngdoc method
     * @name LiveCtrl#_getAllCustomFieldsFromArray
     *
     * Obtención de estructuras del JSON general de la página
     */
    function _getAllCustomFieldsFromArray() {
        _maps = _filterAndGetJSONAttr(_customData, 'name', 'geocomplete', 'value');
        $scope.mapsAddress = _maps.formatted_address;
        $scope.mapsGeocode = _maps.geocode;
        $scope.aboutEvent = _filterAndGetJSONAttr(_customData, 'name', 'about_event', 'value');
        $scope.twitterVisible = _filterAndGetJSONAttr(_customData, 'name', 'twitter_account', 'visible');
        $scope.aboutEventVisible = _filterAndGetJSONAttr(_customData, 'name', 'about_event', 'visible');
        $scope.mapsVisible = _filterAndGetJSONAttr(_customData, 'name', 'geocomplete', 'visible');
    }


    /**
     * @ngdoc method
     * @name LiveCtrl#_initMap
     *
     * Evento de inicio de mapa
     */
    function _initMap(mapId) {
        NgMap.initMap(mapId);
    };



    /**
     * @ngdoc method
     * @name LiveCtrl#_filterAndGetJSONAttr
     *
     * Busqueda de JSON para filtro
     */
    function _filterAndGetJSONAttr(jsonArray, searchKey, searchKeyValue, returnKey) {
        var isEmpty = function(obj) {
            return Object.keys(obj).length === 0;
        };

        var filter = jsonArray.filter(function(el) {
            return el[searchKey] == searchKeyValue;
        });

        if (!isEmpty(filter)) { filter = filter[0][returnKey]; }
        return filter;
    }

    
})