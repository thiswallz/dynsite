
angular.module("custom.controller", [])

/**
 * @ngdoc type
 * @module custom.controller
 * @name customGeneralCtrl
 *
 * @description
 *
 * ## Controlador para la generacion de ediciones sobre las plantillas
 * 
 */

.controller('customGeneralCtrl', ['commonService','$rootScope','$scope', 'managerVideoControlService', 'CollectionDataGeneralService', '$http', '$timeout', 'jwplayerService', '$filter', '$route', '$routeParams',
function(commonService, $rootScope, $scope, managerVideoControlService, CollectionDataGeneralService, $http, $timeout, jwplayerService, $filter, $route, $routeParams) {
    /*********************
    *	Public Vars
    **********************/
    $scope.videoSources = {};
    $scope.selectCollectionToEdit = {};
    $scope.confirmMsgDelete = "¿Está seguro de eliminar el elemento seleccionado?";
    $scope.customizable = configSite.bcCustomize;
    $scope.customContentHasChanged = false;
    $scope.typeElement = [
        {
            name: "Tag",
            value: "Tag"
        }, {
            name: "Título",
            value: "Titulo"
        }, {
            name: "Descripción",
            value: "Descripcion"
        }
    ];

    $scope.ruleElement = [
        {
            name: "Igual a",
            value: "igual"
        }, {
            name: "Distinto a",
            value: "distinto"
        }, {
            name: "Que contenga",
            value: "contenga"
        }, {
            name: "Que no contenga",
            value: "nocontenga"
        }, {
            name: "Relacionado",
            value: "relacion"
        }
    ];

    $scope.orderElement = [
        {
            name: "Ascendente",
            value: "ASC"
        }, {
            name: "Descendente",
            value: "DESC"
        }, {
            name: "Aleatorio",
            value: "RANDOM"
        }
    ];

    $scope.fieldElement = [
        {
            name: "Título",
            value: "titulo"
        }, {
            name: "Descripción",
            value: "descripcion"
        }, {
            name: "Fecha de publicación",
            value: "fecha_publicacion"
        }, {
            name: "Votos",
            value: "likes"
        }, {
            name: "Vistas",
            value: "views"
        }
    ];
    $scope.alert = {
        show: false
    };
    $scope.sourceVideoCollection = [];

    /*********************
    *	Private Vars
    **********************/
    var _config = commonService.http.header;
    var _videoAlias = $routeParams.videoAlias;
    var _defaultOrderCollection = {
        field: {
            name: "Título",
            value: "titulo"
        },
        order: {
            name: "Ascendente",
            value: "ASC"
        }
    };
    var _emptyCollection = {
        id_coleccion: 0,
        save_id: "0",
        source: [],
        name: "",
        filters: [],
        params: [],
        order: _defaultOrderCollection
    };
    var events = ['trixInitialize', 'trixChange', 'trixSelectionChange', 'trixFocus', 'trixBlur', 'trixAttachmentAdd', 'trixAttachmentRemove', 'trixFileAccept'];
    var createStorageKey, host, uploadAttachment;
    

    /*********************
    *	Public Functions
    **********************/
    $scope.refreshCollection             = _refreshCollection;
    $scope.updateCurrentSocialNetwork    = _updateCurrentSocialNetwork;
    $scope.getIdCollection               = _getIdCollection;
    $scope.updateCurrentPlayer           = _updateCurrentPlayer;
    $scope.updateSettingInCollection     = _updateSettingInCollection;
    $scope.updateCurrentCategory         = _updateCurrentCategory;
    $scope.getPanelName                  = _getPanelName;
    $scope.createCollection              = _createCollection;
    $scope.cancelEditCollection          = _cancelEditCollection;
    $scope.addFilter                     = _addFilter;
    $scope.deleteFilter                  = _deleteFilter;
    $scope.enabledRule                   = _enabledRule;
    $scope.cloneObject                   = _cloneObject;
    $scope.moveRowUp                     = _moveRowUp;
    $scope.moveRowDown                   = _moveRowDown;
    $scope.editCollection                = _editCollection;
    $scope.deleteCollection              = _deleteCollection;
    $scope.saveCollection                = _saveCollection;
    $scope.disableSource                 = _disableSource;
    $scope.isChecked                     = _isChecked;
    $scope.setPanelVisibility            = _setPanelVisibility;
    $scope.addCustomContent              = _addCustomContent;
    $scope.getSiteDataFromService        = _getSiteDataFromService;
    $scope.setSite                       = _setSite;
    $scope.deleteCustomContent           = _deleteCustomContent;
    $scope.trixAttachmentAdd             = _trixAttachmentAdd;

    /****************************************************
     * initialization
     ***************************************************/
    _init();

    /****************************************************
     *  Private functions
     ***************************************************/
    /*
    * initialization
    */
    function _init() {
        if ($scope.customizable) {
            _getGeneralParams('socialNetworks', 'redes_sociales');
            _getPlayers();
            _getPlayLists();
            _getChannel();
        }
    }; 
    /*
     *find and remove an element from json array
     */
    function _seekAndDestroy(obj, key, value) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i][key] == value) {
                obj.splice(i, 1);
                break;
            }
        }
    }

    function _refreshCollection() {
        $rootScope.siteData.collections = angular.copy($rootScope.siteData.collections);
        $rootScope.siteData.site_setting = angular.copy($rootScope.siteData.site_setting);
    };
    
    function _getGeneralParams(targetVar, idParam) {
        var params = {
            name: idParam
        };
        var externalReq = $http.get(endPoint['getGeneralParam'] + '/' + params.name, {}, _config);
        externalReq.success(function(data, status, headers, config) {
            eval('$scope.' + targetVar + '=' + data.valor);
        });
        externalReq.error(function(data, status, headers, config) {
            console.log('Error en invocacion servicio getGeneralParam(' + idParam + ')');
        });
    };

    //Actualiza id_playlist de listas de categorías
    function _updateCurrentSocialNetwork(link, currentSocialNetwork) {
        link.id = currentSocialNetwork.id;
    };

    function _addAlert(message, type) {
        $scope.alert = {
            show: true,
            message: message,
            type: type
        };
        $timeout(function() {
            $scope.alert.show = false;
            $scope.alert.message = '';
        }, 5000);
    }

    //Recupera listado de players
    function _getPlayers() {
        var externalReq = $http.get(endPoint['getPlayers'], null, _config);
        externalReq.success(function(data, status, headers, config) {
            $scope.currentPlayer = {
                id_player: $rootScope.siteData.player_id
            };
            $scope.players = (JSON.parse(data.Payload))[0];
        });
        externalReq.error(function(data, status, headers, config) {
            console.log('Error en invocacion servicio getPlayers');
        });
    };

    //Recupera listado de playlist
    function _getPlayLists() {
        var params = {
            id_usuario: configSite.id_usuario
        };
        var externalReq = $http.get(endPoint['getPlayLists'] + '/' + params.id_usuario, {}, _config);
        externalReq.success(function(data, status, headers, config) {
            $scope.playlists = data;
        });
        externalReq.error(function(data, status, headers, config) {
            console.log('Error en invocacion servicio getPlayLists');
        });
    };

    /**
     * [function getChannel: trae el listado de Channel]
     * @method function
     * @return
     */
    function _getChannel() {
        apigClient.channelGet({
                "status": 1
            }, {}, {})
            .then(function(result) {
                $scope.$apply(function() {
                    $scope.lsChannels = result.data;
                });
            }).catch(function(result) {
                //This is where you would put an error callback
            });
    };

    if ($scope.customizable) {
        CollectionDataGeneralService.getSourceVideoCollection(configSite.id_sitio).then(function successCallback(response) {
            $scope.sourceVideoCollection = JSON.parse(response.data.Payload);
        }, function errorCallback(response) { // |
            console.log('Error en invocacion servicio getSourceVideoCollection');
        });
    }


    function _getIdCollection(panel_id) {
        var setting = ($filter('filter')($rootScope.siteData.site_setting, {
            id_panel: panel_id
        }));
        return (setting.length > 0) ? setting[0].id_coleccion : -1;
    };


    function _updateCurrentPlayer(currentPlayer) {
        $rootScope.siteData.player_id = currentPlayer.id_player;
        //Solo es necesario setear el id del player.
        //Resto de los atributos se setan a objeto
        //para reflejar los cambios cuando aun no se guardado los cambios
        $scope.playerOptions.player_skin = currentPlayer.skin;
        $scope.playerOptions.player_name = currentPlayer.nombre;
        $scope.playerOptions.player_description = currentPlayer.descripcion;
        $scope.playerOptions.player_autoplay = currentPlayer.autoplay;
        $scope.playerOptions.player_controls = currentPlayer.controles;
        $scope.playerOptions.player_fullscreen_button = currentPlayer.fullscreen
        $scope.playerOptions.player_play_button = currentPlayer.boton_play;
        $scope.playerOptions.player_icons_color = currentPlayer.color_iconos;
        $scope.playerOptions.player_bar_color = currentPlayer.color_barra;
        $scope.playerOptions.player_background_color = currentPlayer.color_fondo;
        $scope.playerOptions.player_logo_path = currentPlayer.logopath;
        $scope.playerOptions.player_logo_url = currentPlayer.logourl;
        $scope.playerOptions.player_poster = currentPlayer.imgposter;
        $scope.playerOptions.playlist = "https://" + $scope.s3UrlPrefix + "/DEV123420900/playlist.json";
        //"playlist": "http://example.com/myPlaylist.json"
        //Re inicializa el player (home) con nuevo skin
        var skin = {
                name: $scope.playerOptions.player_skin,
                active: $scope.playerOptions.player_bar_color,
                inactive: $scope.playerOptions.player_icons_color,
                background: $scope.playerOptions.player_background_color
            }
            //$scope.optionsPlayerHome.skin = skin;
        var player = jwplayerService.myPlayer['playerHome'];
        player.remove();
        player.setup($scope.optionsPlayerHome);
    };


    //Actualiza el setting del sitio, crea la relacion panel coleccion
    function _updateSettingInCollection(panel, currentCollection, panelName) {

        if (null != currentCollection) {
            var swIsInList = false;
            var index = -1;
            for (var j = 0; j < $rootScope.siteData.site_setting.length; j++) {
                if ($rootScope.siteData.site_setting[j].id_panel == panel.panel_id) {
                    swIsInList = true;
                    index = j;
                    break;
                }
            }

            if (swIsInList) {
                $rootScope.siteData.site_setting[index].id_coleccion = currentCollection.id_coleccion;
                $rootScope.siteData.site_setting[index].name = panelName;
            } else {
                $rootScope.siteData.site_setting.unshift({
                    id_panel: panel.panel_id,
                    name: panelName,
                    id_coleccion: currentCollection.id_coleccion,
                    visible: false
                });
            }
        } else {

            for (var i = 0; i < $rootScope.siteData.site_setting.length; i++) {
                if ($rootScope.siteData.site_setting[i].id_panel == panel.panel_id) {
                    $rootScope.siteData.site_setting[i].id_coleccion = "none";
                    break;
                }
            }
        }

    };

      //Actualiza id_coleccion de listas de categorías
    function _updateCurrentCategory(category, currentCollection) {
        if (null == currentCollection)
            return;
        /*var swIsInList = false;
        for (var j = 0; j < $rootScope.siteData.menus.length; j++) {
            //console.log("currentCollection", currentCollection);
            if ($rootScope.siteData.menus[j].id_coleccion == currentCollection.id_coleccion) {
                swIsInList = true;
                break;
            }
        }
        if (!swIsInList) {*/
        category.id_coleccion = currentCollection.id_coleccion;
        /*} else {
            category.id_coleccion = '';
            currentCollection.id_coleccion = 'fake' + _getRandomId(); //hack to force change of select
            _addAlert('Es necesario seleccionar una COLECCION que no haya sido asignado a otra categoría.', 'warning');
        }*/
    };

    //Actualiza el setting del sitio, crea la relacion panel coleccion
    function _getPanelName(panel) {

        var setting = ($filter('filter')($rootScope.siteData.site_setting, {
            id_panel: panel.panel_id
        }))[0];

        if (undefined != setting) {
            if (undefined == setting.name) {
                setting.name = panel.panel_name;
                return panel.panel_name;
            } else {
                setting.name = setting.name;
                return setting.name;
            }
        } else {
            setting.name = panel.panel_name;
            return panel.panel_name;
        }
    };

    //interfaz para crear una coleccion
    function _createCollection() {
        var uniq_id = _getRandomId();
        $scope.videoSources = angular.copy($scope.sourceVideoCollection);
        $scope.selectCollectionToEdit = angular.copy(_emptyCollection);
        $scope.selectCollectionToEdit.id_coleccion = uniq_id;
        $scope.popup_active = true;
        $scope.namePopup = "Crear";
    };

    //Actualiza id_block en la lista de colecciones
    function _cancelEditCollection() {
        $scope.indexToEdit = null;
        $scope.popup_active = false;
    };

    //Agrega un filtro a la coleccion
    function _addFilter(filters) {
        filters.unshift({
            type: {},
            rule: {},
            param: "",
            priority: 0
        });
    };

    //Elimina un filtro a la coleccion
    function _deleteFilter(filters, index) {
        filters.splice(index, 1);
    };

    function _enabledRule(filter, rulesList) {
        var index = false;
        if (filter.type.value == "Tag") {
            for (var j = 0; j < rulesList.length; j++) {
                if (rulesList[j].value == "relacion") {
                    rulesList[j].disabled = false;
                }
            }
        } else {
            for (var j = 0; j < rulesList.length; j++) {
                if (rulesList[j].value == "relacion") {
                    rulesList[j].disabled = true;
                }
            }
        }
    }

    function _cloneObject(object) {
        return angular.copy(object);
    }


    function _moveRowUp(link, index, idContent) {
        if (index > 0) {
            switch (idContent) {
                case 'links':
                    var list = $rootScope.siteData.links;
                    var key = 'priority';
                    break;
                case 'redes_sociales':
                    var list = $rootScope.siteData.redes_sociales;
                    var key = 'priority';
                    break;
                case 'categorias':
                    var list = $rootScope.siteData.menus;
                    var key = 'priority';
                    break;
                case 'menu':
                    var list = $rootScope.siteData.menus;
                    var key = 'priority';
                    break;
                case 'filter':
                    var list = $scope.selectCollectionToEdit.filters;
                    var key = 'priority';
                    break;
            }
            var anterior = list[index - 1][key];
            link.priority = anterior - 1;
            _refreshListOnSort(list, key);
            $scope.selectedIndex = index - 1;
        }
    }

    function _moveRowDown(link, index, idContent) {
        switch (idContent) {
            case 'links':
                var list = $rootScope.siteData.links;
                var key = 'priority';
                break;
            case 'redes_sociales':
                var list = $rootScope.siteData.redes_sociales;
                var key = 'priority';
                break;
            case 'categorias':
                var list = $rootScope.siteData.menus;
                var key = 'priority';
                break;
            case 'menu':
                var list = $rootScope.siteData.menus;
                var key = 'priority';
                break;
            case 'filter':
                var list = $scope.selectCollectionToEdit.filters;
                var key = 'priority';
                break;
        }

        if (index < (list.length) - 1) {
            var siguiente = list[index + 1][key];
            link.priority = Number(siguiente) + 1;
            _refreshListOnSort(list, key);
            $scope.selectedIndex = index + 1;
        }
    }

       //HACK refresca json array para reflejar orderBy dinamicamente
    //(refresca=re setea el valor a cada campo que es llave para el order)
    function _refreshListOnSort(obj, key) {
        for (var i = 0; i < obj.length; i++) {
            obj[i][key]--;
            obj[i][key]++;
        }

        //Ordena json Array by key
        obj.sort(function(a, b) {
            return parseFloat(a[key]) - parseFloat(b[key]);
        });

        //asugna multiplos de 10 evitando prioridades iguales
        for (var i = 0; i < obj.length; i++) {
            obj[i][key] = (i + 1) * 10;
        }

    }

    //interfaz para editar una coleccion
    function _editCollection(idCollection, index) {
        $scope.videoSources = angular.copy($scope.sourceVideoCollection);
        $scope.selectCollectionToEdit = angular.copy($rootScope.siteData.collections[index]);
        $scope.indexToEdit = index;
        $scope.popup_active = true;
        $scope.namePopup = "Editar";
        _disableSource($scope.videoSources, $scope.selectCollectionToEdit.source);
    };

    //interfaz para crear una coleccion
    function _deleteCollection(index) {
        $rootScope.siteData.collections.splice(index, 1);
    };

    //Cierra el popup
    function _saveCollection() {
        if (jQuery.trim($scope.selectCollectionToEdit.name) == '') {
            _addAlert('Ha ingresado una COLECCIÓN sin especificar un nombre, verifique e intente nuevamente.', 'danger');
            return false;
        }

        if ($scope.selectCollectionToEdit.source.length == 0) {
            _addAlert('Ha ingresado una COLECCIÓN sin especificar un fuente de videos, verifique e intente nuevamente.', 'danger');
            return false;
        }

        //"filters":[{"type_name":"DescripciÃ³n","type":{"name":"Tag","value":"Tag"},"rule_name":"Distinto a","rule":{"name":"Distinto a","value":"distinto"},"param":"sss"}]
        if ($scope.selectCollectionToEdit.filters.length > 0) {
            var error = false;
            jQuery.each($scope.selectCollectionToEdit.filters, function(key, value) {
                if (jQuery.isEmptyObject(value.type) || jQuery.isEmptyObject(value.rule) || (value.param == "" && value.rule.value != "relacion")) {
                    _addAlert('Ha ingresado una FILTRO y no a especificado sus parametros, verifique e intente nuevamente.', 'danger');
                    error = true;
                }
            });

            if (error) return false;
        }

        var saveId = _getRandomId();
        $scope.selectCollectionToEdit.save_id = saveId;

        if ($scope.namePopup == "Crear") {
            $rootScope.siteData.collections.unshift($scope.selectCollectionToEdit);
        } else {
            $rootScope.siteData.collections[$scope.indexToEdit] = angular.copy($scope.selectCollectionToEdit);
        }

        $scope.indexToEdit = null;
        $scope.popup_active = false;

        $scope.refreshCollection();
    };


    //desabilita una opcion en fuentes de video
    function _disableSource(sources, currentSource) {
        var allFolders = ($filter('filter')(currentSource, {
            id: "allfolders"
        }));
        var allPlaylists = ($filter('filter')(currentSource, {
            id: "allplaylists"
        }));

        if (allFolders.length > 0) {
            jQuery.each(sources, function(key, value) {
                if (value.type == "Carpetas") {
                    value.disabled = true;
                }
            });
        } else {
            jQuery.each(sources, function(key, value) {
                if (value.type == "Carpetas") {
                    value.disabled = false;
                }
            });
        }

        if (allPlaylists.length > 0) {
            jQuery.each(sources, function(key, value) {
                if (value.type == "Playlist") {
                    value.disabled = true;
                }
            });
        } else {
            jQuery.each(sources, function(key, value) {
                if (value.type == "Playlist") {
                    value.disabled = false;
                }
            });
        }
    };


    function _isChecked(id_panel) {
        for (var j = 0; j < $rootScope.siteData.site_setting.length; j++) {
            if ($rootScope.siteData.site_setting[j].id_panel == id_panel) {
                if ($rootScope.siteData.site_setting[j].visible == true) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        return false;
    }


    //Actualiza el setting del sitio, crea la relacion panel coleccion
    function _setPanelVisibility(panel) {
        var change = false;
        var visibility = true;
        var index = null;
        for (var j = 0; j < $rootScope.siteData.site_setting.length; j++) {
            if ($rootScope.siteData.site_setting[j].id_panel == panel.panel_id) {
                visibility = ($rootScope.siteData.site_setting[j].visible == true) ? false : true;
                change = true;
                index = j;
                break;
            }
        }

        if (change) {
            $rootScope.siteData.site_setting[index].visible = visibility;
        } else {
            $rootScope.siteData.site_setting.unshift({
                id_panel: panel.panel_id,
                id_coleccion: -1,
                visible: true
            });
        }
    };

    //Agrega contenido personalizado
    function _addCustomContent(idContent) {
        switch (idContent) {
            case 'links':
                $rootScope.siteData.links.unshift({
                    descripcion: "",
                    link: "",
                    priority: 0
                });
                break;
            case 'redes_sociales':
                $rootScope.siteData.redes_sociales.unshift({
                    name: "",
                    id: "",
                    url: "",
                    priority: 0
                });
                break;
            case 'categorias':
                $rootScope.siteData.menus.unshift({
                    nombre: "",
                    id_playlist: "",
                    priority: 0
                });
                break;
            case 'menu':
                $rootScope.siteData.menus.unshift({
                    nombre: "",
                    id_coleccion: "",
                    priority: 0
                });
                break;
        }
    };
    

    function _getSiteDataFromService() {
        //Indicates whether we are in edit mode
        var cache = true;
        if (_token != '') {
            cache = Date.now();
        }

        var externalReq = $http.get(endPoint['getCompanyData'] + '?cache=' + cache, null, _config);
        externalReq.success(function(data, status, headers, config) {
            $scope.customContentHasChanged = false;
            //$rootScope.siteData = (JSON.parse(data.Payload))[0];
            var data_siteData = (JSON.parse(data.Payload))[0];

            //Transforma a objetos JSON string con JSON
            $rootScope.siteData.links = (IsJsonString(data_siteData.links)) ? JSON.parse(data_siteData.links) : [];
            $rootScope.siteData.redes_sociales = (IsJsonString(data_siteData.redes_sociales)) ? JSON.parse(data_siteData.redes_sociales) : [];
            $rootScope.siteData.menus = (IsJsonString(data_siteData.menus)) ? JSON.parse(data_siteData.menus) : [];
            $rootScope.siteData.collections = (IsJsonString(data_siteData.collections)) ? JSON.parse(data_siteData.collections) : [];
            $rootScope.siteData.template_setting = (IsJsonString(data_siteData.template_setting)) ? JSON.parse(data_siteData.template_setting) : [];
            $rootScope.siteData.site_setting = (IsJsonString(data_siteData.site_setting)) ? JSON.parse(data_siteData.site_setting) : [];
            $rootScope.siteData.custom_data = (IsJsonString(data_siteData.custom_data)) ? JSON.parse(data_siteData.custom_data) : {};

            $rootScope.siteData.collections.isVideo = false;
            $rootScope.siteData.titulo = data_siteData.titulo;
            $rootScope.siteData.collections.selectedVideo = null;

            $rootScope.siteData.id_cuenta = data_siteData.id_cuenta;
            $rootScope.siteData.id_usuario = data_siteData.id_usuario;
            $rootScope.siteData.unit_id = data_siteData.unit_id;
            $rootScope.siteData.id_sitio = data_siteData.id_sitio;
            $rootScope.siteData.id_channel = data_siteData.id_channel;
            $rootScope.siteData.live = data_siteData.live;
            $rootScope.siteData.urlPlayer = data_siteData.urlPlayer;
            $rootScope.siteData.playerType = data_siteData.playerType;
            $rootScope.siteData.channelUid = data_siteData.channelUid;


            //Decodifica html base64
            $rootScope.siteData.acerca_de = (null == data_siteData.acerca_de) ? '' : data_siteData.acerca_de;
            $rootScope.siteData.acerca_de = decodeURIComponent(escape(window.atob(data_siteData.acerca_de)));

            //openGraph values
            managerVideoControlService.openGraph.site_name = data_siteData.descripcion;
            managerVideoControlService.openGraph.url = $scope.urlSite;

            //Si estamos navegando categorias recuperamos su nombre
            if (null != data_siteData.menus) {
                var fromMenus = $filter('filter')(data_siteData.menus, {
                    id_coleccion: $scope.idSelectedCollection
                });
                $scope.menuName = (fromMenus.length > 0) ? fromMenus[0].nombre : '';
            }
            //recupera video seleccionado una vez que ha recuperado settings generales
            if (undefined != _videoAlias) {
                $scope.selectVideo();
            }
        });
        externalReq.error(function(data, status, headers, config) {
            console.log('Error en invocacion servicio getSitio');
        });
    };

    function _setSite() {
        if (_changesAreValidated()) {
            $scope.savingCustomization = true;
            var params = {
                id: configSite.id_sitio
            };

            apigClient.sitioIdGalleryPut(params, paramsCustomContent, {})
                .then(function(result) {
                    //This is where you would put a success callback
                    $scope.savingCustomization = false;
                    var paramsCustomContent = {
                        id_sitio: configSite.id_sitio,
                    };
                    $scope.customContentHasChanged = false;
                    $scope.getSiteDataFromService();
                }).catch(function(result) {
                    //This is where you would put an error callback
                    console.log('Error en invocacion servicio setSitio', result);
                });

        }
    };

    function _deleteCustomContent(idContent, key) {
        switch (idContent) {
            case 'links':
                _seekAndDestroy($rootScope.siteData.links, 'descripcion', key);
                break;
            case 'redes_sociales':
                _seekAndDestroy($rootScope.siteData.redes_sociales, 'id', key);
                break;
            case 'categorias':
                _seekAndDestroy($rootScope.siteData.menus, 'nombre', key);
                break;
            case 'menu':
                _seekAndDestroy($rootScope.siteData.menus, 'nombre', key);
                break;
        }
    };

    function _getRandomId() {
        return Math.random().toString(36).substring(7);
    }

    function _changesAreValidated() {

        //Chequea que categorias tengan asignado un playlist valido (y sin utilizar)
        for (var i = 0; i < $rootScope.siteData.menus.length; i++) {
            if (jQuery.trim($rootScope.siteData.menus[i].nombre) == '') {
                _addAlert('Ha ingresado un MENÚ sin especificar un nombre; verifique e intente nuevamente.', 'danger');
                return false;
            }
            var found = false;
            for (var j = 0; j < $rootScope.siteData.collections.length; j++) {
                if ($rootScope.siteData.menus[i].id_coleccion == $rootScope.siteData.collections[j].id_coleccion) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                _addAlert('Se ha agregado un nuevo MENÚ sin asignar su Colección correspondiente; verifique e intente nuevamente.', 'danger');
                return false;
            }
        }

        //chequeo links
        var urlPattern = /(https?:\/\/)(www)?[A-Za-z0-9.\-@_~]+\.[A-Za-z]{2,}(:[0-9]{2,5})?(\/[A-Za-z0-9\/_\-.~?&=]*)*/;
        for (var i = 0; i < $rootScope.siteData.links.length; i++) {
            var errorFound = false;
            if (jQuery.trim($rootScope.siteData.links[i].descripcion) == '' || jQuery.trim($rootScope.siteData.links[i].link) == '') {
                errorFound = true;
                break;
            }
            if (!errorFound && !($rootScope.siteData.links[i].link).match(urlPattern)) {
                errorFound = true;
                break;
            }
        }
        if (errorFound) {
            _addAlert('Se han agregado LINKS sin descripción o con urls inválidas; verifique e intente nuevamente. ', 'danger');
            return false;
        }

        //Cuequeo redes sociales
        for (var i = 0; i < $rootScope.siteData.redes_sociales.length; i++) {
            var errorFound = false;
            if (jQuery.trim($rootScope.siteData.redes_sociales[i].url) == '') {
                errorFound = true;
                break;
            }

            if (!errorFound && !($rootScope.siteData.redes_sociales[i].url).match(urlPattern)) {
                errorFound = true;
                break;
            }
        }
        if (errorFound) {
            _addAlert('Se ha agregado alguna RED SOCIAL con una url inválida; verifique e intente nuevamente. ', 'danger');
            return false;
        }
        _addAlert('Se guardaron los cambios correctamente.', 'success');
        return true;
    }



    function _trixAttachmentAdd(e) {
        var attachment;
        attachment = e.attachment;
        if (attachment.file) {

            //console.log("attachment:", attachment);

            return uploadAttachment(attachment);
        }
    }
    //host = "http://s3.amazonaws.com/brooadcast.com/"; //$scope.s3UrlPrefix;
    host = $scope.s3UrlPrefix;

    createStorageKey = function(file) {
        var date, day, time;
        date = new Date();
        day = date.toISOString().slice(0, 10);
        time = date.getTime();
        return "tmp/" + day + "/" + time + "-" + file.name;
    };

    uploadAttachment = function(attachment) {
        var file, form, key, xhr;
        file = attachment.file;
        key = createStorageKey(file);
        form = new FormData;
        form.append("key", key);
        form.append("Content-Type", file.type);
        form.append("file", file);
        xhr = new XMLHttpRequest;
        xhr.open("POST", host, true);
        xhr.upload.onprogress = function(event) {
            var progress;
            progress = event.loaded / event.total * 100;
            return attachment.setUploadProgress(progress);
        };
        xhr.onload = function() {

            var href, url;
            if (xhr.status === 204) {
                url = href = host + key;

                return attachment.setAttributes({
                    url: url,
                    href: href
                });
            }
        };
        return xhr.send(form);
    };


    /****************************************************
     *  Events
     ***************************************************/

    //Controlar cierre/recarga pagina sin guardar cambios en personalizador
    window.addEventListener("beforeunload", function(event) {
        if ($scope.customContentHasChanged) {
            event.returnValue = "Atención: Aún no ha guardado la edición de elementos/estilos personalizables";
        }
    });

    /**
     * Definicion watchers objetos para personalizar sitio
     *
     */
    var paramsCustomContent = {};
    //watcher edición contenido
    $scope.$watch('siteData.titulo', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.titulo = $rootScope.siteData.titulo;
        }
    }, true);
    $scope.$watch('siteData.analytics_id', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.codigo_analytics = $rootScope.siteData.analytics_id;
        }
    }, true);
    $scope.$watch('siteData.alias', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.alias = $rootScope.siteData.alias;
        }
    }, true);
    $scope.$watch('siteData.player_id', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.id_player = $rootScope.siteData.player_id;
        }
    }, true);
    $scope.$watch('siteData.links', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.links = JSON.stringify($rootScope.siteData.links);
        }
    }, true);
    $scope.$watch('siteData.menus', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.menus = JSON.stringify($rootScope.siteData.menus);
        }
    }, true);

    $scope.$watch('siteData.collections', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.collections = angular.toJson($rootScope.siteData.collections); //JSON.stringify($rootScope.siteData.collections);
        }
    }, true);

    $scope.$watch('siteData.site_setting', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.site_setting = JSON.stringify($rootScope.siteData.site_setting);
        }
    }, true);

    $scope.$watch('siteData.acerca_de', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            var originalSource = $rootScope.siteData.acerca_de;
            if (originalSource.indexOf("<figcaption") != -1) {
                var initialHTML = originalSource.substring(0, originalSource.lastIndexOf("<figcaption"));
                var finalHTML = originalSource.substring(originalSource.lastIndexOf("</figcaption>") + 13, originalSource.length);
                var newSource = initialHTML + finalHTML;
                $rootScope.siteData.acerca_de = newSource;
            }
            $scope.customContentHasChanged = true;
            paramsCustomContent.about_us = $scope.encode = btoa(unescape(encodeURIComponent($rootScope.siteData.acerca_de)));
        }
    }, true);
    $scope.$watch('siteData.redes_sociales', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.redes_sociales = JSON.stringify($rootScope.siteData.redes_sociales);
        }
    }, true);
    $scope.$watch('siteData.live', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.live = $rootScope.siteData.live;
        }
    }, true);
    $scope.$watch('siteData.id_channel', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.id_channel = $rootScope.siteData.id_channel;
        }
    }, true);
    $scope.$watch('siteData.url_live', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.url_live = $rootScope.siteData.url_live;
        }
    }, true);
    $scope.$watch('siteData.autostart', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.autostart = JSON.stringify($rootScope.siteData.autostart);
        }
    }, true);
    $scope.$watch('siteData.custom_data', function(newValue, oldValue) {
        if (undefined != oldValue && newValue != oldValue) {
            $scope.customContentHasChanged = true;
            paramsCustomContent.custom_data = JSON.stringify($rootScope.siteData.custom_data);
        }
    }, true);

    $scope.$on('replicateFavs', function(event, data) {
        var favIsInList = false;
        for (video in $scope.favsInCollections) {
            if ($scope.favsInCollections[video].videoId == data.video_id_video) {
                favIsInList = true;
                $scope.favsInCollections[video].favs = data.likes;
            }
        }
        if (!favIsInList) {
            var video = {};
            video.videoId = data.video_id_video;
            video.favs = data.likes;
            $scope.favsInCollections.push(video);
        }
    });

}])