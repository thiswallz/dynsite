angular.module("home.controller", [])
/**
 * @ngdoc type
 * @module home.controller
 * @name homeInitCtrl
 *
 * @description
 *
 * ## Controlador principal
 * Funcion de controlador principal para manejo de las N plantillas isntaladas en el proyecto
 */
.controller('homeInitCtrl', ['$controller', '$rootScope','commonService', 'AWSConfigService', '$scope', '$http', 'managerVideoControlService', '$sce', '$location', '$cookies', '$filter', '$route', '$routeParams', '$window', 'AuthenticationService', 'ChannelService', 
    function($controller, $rootScope,commonService, AWSConfigService, $scope, $http, managerVideoControlService, $sce, $location, $cookies, $filter, $route, $routeParams, $window, AuthenticationService, ChannelService) {
    try{
        angular.extend(this, $controller('homeInitCtrl.custom', {$scope: $scope}));
    }catch(e){
        console.log("Sin extensión de controller")
    }
    /*********************
    *	Public Vars
    **********************/
    $rootScope.siteData = {};
    $scope.favsInCollections = [];
    $scope.startEvent = false;
    $scope.showPage = false;
    $scope.validateMail = commonService.formatValidateService.validateMail;
    $scope.letterNumber = commonService.formatValidateService.letterNumber;
    $scope.validatePwd = commonService.formatValidateService.validatePwd;
    $scope.validatePwd2 = commonService.formatValidateService.validatePwd2;
    $scope.viewingLive = (configSite.template_base + configSite.template + "/live.html" == $route.current.loadedTemplateUrl) ? true : false;
    $scope.s3UrlPrefix = configSite.s3UrlPrefix;
    $scope.idSelectedCollection = $routeParams.collection;
    $scope.selectedTag = $routeParams.tag;
    $scope.keywordsSearch = $routeParams.query;
    $scope.urlSite = $location.absUrl();
    $scope.root_path = configSite.root_path;
    $scope.maxVisibleOptionsmenu = configSite.GBL_PROPERTIES.max_visible_optionsmenu || 5;
    $scope.workingData = managerVideoControlService;
    $scope.playerOptions = {};
    $scope.channelActivo = 1;

    /*********************
    *	Private Vars
    **********************/
    var _loadedCollections = 0;
    var _videoAlias = $routeParams.videoAlias;
    var _config = commonService.http.header;

    /*********************
    *	Public Functions
    **********************/
    $scope.finished             = _finished;
    $scope.signOut              = _signOut;
    $scope.getUrl               = _getUrl;
    $scope.searchMedia          = _searchMedia;
    $scope.selectVideo          = _selectVideo;
    $scope.likeVideo            = _likeVideo;
    $scope.isLikedVideo         = _isLikedVideo;
    $scope.trustAsHtml          = _trustAsHtml;

    /****************************************************
     * initialization
     ***************************************************/
    _init();



    /****************************************************
     *  Private functions
     ***************************************************/
    /**
     * @ngdoc method
     * @name homeInitCtrl#_init
     *
     * Inicializa elementos, se maneja como un constructor del controlador
     */
    function _init() {
        AWSConfigService.init();
        commonService.styleService.getStyles();
        if($scope.selectedVideo)
            AWSConfigService.configStats($rootScope.siteData, $scope.selectedVideo);
        _getSiteData();
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_finished
     *
     * Se relaciona con el termino del evento
     */
    function _finished() {
        try {
            $scope.$apply(function() {
                $scope.startEvent = true;
            });
        } finally {
            $scope.startEvent = true;
        }
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_signOut
     *
     * Limpieza de sesión y salida de la aplicación
     */
    function _signOut() {
        AuthenticationService.signOut();
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_getUrl
     *
     * Obtiene URL sobre la plantilla seleccionada por la administración
     * 
     * @param {string} ruta desde la plantilla hacia abajo
     * @return {string} ruta completa plantilla + ruta final
     */
    function _getUrl(file) {
        return configSite.template_base + configSite.template + "/" + file;
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_getLiveVideo
     *
     * Hace el tratamiento del video para mostrarlo en el iframe
     * 
     * @param {object} Datos del video
     */
    function _getLiveVideo(obdata) {
        //se le agregan los campos al objecto optPlayer(player seteado desde backend) para que el player se arme correctamente
        var confChannel = obdata.video;
        obdata.optPlayer.aspectratio = "16:9";
        obdata.optPlayer.sharing = {
            heading: "Compartir",
            code: encodeURI('<iframe src="' + $scope.urlSite + '" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe>'),
            link: $scope.urlSite
        };
        obdata.optPlayer.height = '';
        $scope.optionsPlayerLive = obdata.optPlayer;
        if (confChannel.playerType == 'file') {
            managerVideoControlService.fileToPlayLive = $sce.trustAsResourceUrl(confChannel.urlPlayer);
            $scope.fileToPlayLive = $scope.workingData.fileToPlayLive;
        } else {
            managerVideoControlService.fileToPlayLive = '';
            $scope.fileToPlayLive = $scope.workingData.fileToPlayLive;
        }
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_searchMedia
     *
     * Nos lleva a la ventana buscar
     * 
     */
    function _searchMedia() {
        $location.path('/search').search({ query: this.searchKeywords });
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_selectVideo
     *
     * Recupera video selecionado
     * 
     */
    function _selectVideo() {
        //
        var id_selectVideo = _videoAlias.substring(0, _videoAlias.search("_"));
        var params = {
            id_usuario: configSite.id_usuario,
            id_sitio: configSite.id_sitio,
            id_video: id_selectVideo
        };

        //Indicates whether we are in edit mode
        var cache = true;
        if (_token != '') {
            cache = Date.now();
        }

        ///sitio/22/video/19068
        var externalReq = $http.get(endPoint['getSelectedVideo'] + "/" + configSite.id_sitio + "/video/" + id_selectVideo + '?cache=' + cache, {}, _config);
        externalReq.success(function(data, status, headers, _config) {
            $scope.player360 = false;
            $scope.selectedVideo = data;
            $rootScope.siteData.collections.isVideo = true;
            $rootScope.siteData.collections.selectedVideo = $scope.selectedVideo;
            //Setea player para video Seleccionado
            var strPathPreview = configSite.s3urlprefiximages + $scope.selectedVideo.ruta + '/' + $scope.selectedVideo.preview_xl;
            var strPathVtt = configSite.s3urlprefiximages + '/' + configSite.ambientPrefix + $scope.selectedVideo.video_id_video + '/preview/preview.vtt';
            var skin = {
                name: $scope.playerOptions.player_skin,
                // active: $scope.playerOptions.player_bar_color,
                //  inactive: $scope.playerOptions.player_icons_color,
                //  background: $scope.playerOptions.player_background_color
            };
            $scope.optionsPlayerSelected = {
                image: strPathPreview,
                "autostart": $scope.playerOptions.player_autoplay,
                'mute': $scope.playerOptions.player_mute,
                'repeat': $scope.playerOptions.player_loop,
                'abouttext': "viddeo.com",
                'aboutlink': "http://www.viddeo.com/",
                'preload': 'auto', //metadata, auto,none
                "primary": "html5",
                'hlshtml': true,
                width: "100%",
                aspectratio: "16:9",
                skin: skin,
                // tracks: [{ file: strPathVtt, kind: 'thumbnails' }]
            };

            if ($scope.playerOptions.advertising == '1') {
                $scope.optionsPlayerSelected.advertising = {
                    client: 'vast',
                    skipoffset: 3,
                    tag: $scope.playerOptions.url_preroll
                };
            }
            var strPathVideo;
            if ($scope.selectedVideo.container == "ts") {
                strPathVideo = configSite.s3UrlPrefix + '/' + configSite.ambientPrefix + $scope.selectedVideo.video_id_video + "/" + $scope.selectedVideo.hls_name;
                $scope.fileToPlaySelected = $sce.trustAsResourceUrl(strPathVideo);
                $scope.selectedVideo.preview = $rootScope.siteData.url_scheme + strPathPreview;
            } else if ($scope.selectedVideo.container == "jwp360") {
                var isIphone = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                $scope.fileToPlaySelected = "";

                strPathVideo = configSite.s3UrlPrefix + '/' + configSite.ambientPrefix + $scope.selectedVideo.video_id_video + "/" + 'playlist.m3u8';
                if (isIphone) {
                    //host origin window.location.origin +
                    strPathVideo = "/video/" + configSite.ambientPrefix + $scope.selectedVideo.video_id_video + "/" + "playlist.m3u8";
                }
                $scope.optionsPlayerSelected.playlist = [{
                    // title: 'Caminandes VR',
                    mediaid: $scope.selectedVideo.video_id_video,
                    stereomode: 'monoscopic',
                    image: strPathPreview,
                    file: strPathVideo
                }];
                delete $scope.optionsPlayerSelected.image;
                delete $scope.optionsPlayerSelected.file;

            } else if ($scope.selectedVideo.container == "youtube") {
                delete $scope.optionsPlayerSelected.image;
                delete $scope.optionsPlayerSelected.file;

                strPathVideo = $scope.selectedVideo.externalUrl;
                $scope.fileToPlaySelected = $sce.trustAsResourceUrl($scope.selectedVideo.externalUrl);
                var n = $scope.selectedVideo.preview.includes("//");
                if (n) {
                    $scope.selectedVideo.preview = $scope.selectedVideo.preview_xl; // + sizeImg;
                    $scope.optionsPlayerSelected.image = $scope.selectedVideo.preview_xl;
                } else {
                    $scope.selectedVideo.preview = $rootScope.siteData.url_scheme + strPathPreview;
                    $scope.optionsPlayerSelected.image = strPathPreview;
                }
            } else {
                $scope.fileToPlaySelected = "";
                var strSources = (IsJsonString($scope.selectedVideo.sources)) ? JSON.parse($scope.selectedVideo.sources) : [];
                $scope.optionsPlayerSelected.playlist = [{
                    image: strPathPreview,
                    sources: strSources
                }];
            }
            //openGraph dynamic values
            managerVideoControlService.openGraph.name = $scope.selectedVideo.nombre;
            managerVideoControlService.openGraph.title = $scope.selectedVideo.nombre;
            managerVideoControlService.openGraph.description = $scope.selectedVideo.descripcion;
            managerVideoControlService.openGraph.image = strPathPreview;
            //Si video seleccionado TIENE TAGS Recupera sus videos relacionados
            if ("" != $.trim($scope.selectedVideo.tags)) {

            }
            if($scope.selectedVideo)
                AWSConfigService.configStats($rootScope.siteData, $scope.selectedVideo);

        });
        externalReq.error(function(data, status, headers, _config) {
            console.log('Error en invocacion servicio getVideo');
        });
    };


    
    function _getChannelData(){
        //Cuando ya tenemos los datos del sitio aprovechamos de setear Player para live
        //channel
        ChannelService.getChannel(dataSite.channeluid).success(function(response) {
            //console.log("response", response);
            var channelSeting = response.video;
            $rootScope.siteData.channel = {
                "unit_id": dataSite.channeluid,
                "id_channel": dataSite.id_channel,
                "cronometro": channelSeting.crono,
                "fecha_fin": channelSeting.dates.end,
                "fecha_ini": channelSeting.dates.start,
                "publicado": channelSeting.publicado,
                "borrado": channelSeting.estado,
                "imgPathPoster": configSite.assetspath + "/" + channelSeting.imgPathPoster
            };
            /**
             * datos para channel
             */
            if ($rootScope.siteData.channel.publicado == '0' || $rootScope.siteData.channel.borrado == '0') {
                $scope.channelActivo = 0;
            }
            /**cronometro */
            if ($rootScope.siteData.channel.cronometro == '1') {
                $scope.cronometro = true;
                $scope.endTime = (new Date($rootScope.siteData.channel.fecha_ini)).getTime();
            }
            _getLiveVideo(response);
        });
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_getSiteData
     *
     * Obtiene la ifnormación del sitio desde el servicio aws
     * 
     */
    function _getSiteData() {
        if (($location.url().includes('live') || dataSite.type === 'event') && undefined === _videoAlias) {
            if (dataSite.channeluid.length > 1) {
                $scope.showHomeLive = true;
                _getChannelData();
            }
        }
        $rootScope.siteData.links = (IsJsonString(dataSite.links)) ? JSON.parse(dataSite.links) : [];
        $rootScope.siteData.redes_sociales = (IsJsonString(dataSite.redes_sociales)) ? JSON.parse(dataSite.redes_sociales) : [];
        $rootScope.siteData.menus = (IsJsonString(dataSite.menus)) ? JSON.parse(dataSite.menus) : [];
        $rootScope.siteData.collections = (IsJsonString(dataSite.collections)) ? JSON.parse(dataSite.collections) : [];
        $rootScope.siteData.template_setting = (IsJsonString(dataSite.template_setting)) ? JSON.parse(dataSite.template_setting) : [];
        $rootScope.siteData.site_setting = (IsJsonString(dataSite.site_setting)) ? JSON.parse(dataSite.site_setting) : [];

        $rootScope.siteData.url = (dataSite.secure_site == 1) ? 'https://' + dataSite.alias : 'http://' + dataSite.alias;
        $rootScope.siteData.url_scheme = (dataSite.secure_site == 1) ? 'https:' : 'http:';
        $rootScope.siteData.collections.isVideo = false;
        $rootScope.siteData.collections.selectedVideo = null;

        //Decodifica html base64
        $rootScope.siteData.acerca_de = (null == dataSite.acerca_de) ? '' : dataSite.acerca_de;
        $rootScope.siteData.acerca_de = decodeURIComponent(escape(window.atob(dataSite.acerca_de)));

        //other values
        $rootScope.siteData.custom_data = (IsJsonString(dataSite.custom_data)) ? JSON.parse(dataSite.custom_data) : [];
        $rootScope.siteData.custom_data_fieldNames = Object.keys($rootScope.siteData.custom_data);

        $rootScope.siteData.titulo = dataSite.titulo;
        $rootScope.siteData.analytics_id = dataSite.analytics_id;

        $rootScope.siteData.id_cuenta = dataSite.id_cuenta;
        $rootScope.siteData.id_usuario = dataSite.id_usuario;
        $rootScope.siteData.unit_id = dataSite.unit_id;
        $rootScope.siteData.id_sitio = dataSite.id_sitio;
        //player
        $rootScope.siteData.id_channel = dataSite.id_channel;
        $rootScope.siteData.channelUid = dataSite.channeluid;
        $rootScope.siteData.live = dataSite.live;
        $rootScope.siteData.urlPlayer = dataSite.urlPlayer;
        $rootScope.siteData.playerType = dataSite.playerType;
        $rootScope.siteData.pano = dataSite.pano;
        $rootScope.siteData.is_tracker = dataSite.is_tracker;
       
        //openGraph values
        managerVideoControlService.openGraph.site_name = dataSite.descripcion;
        managerVideoControlService.openGraph.url = $scope.urlSite;

        //Si estamos navegando categorias recuperamos su nombre
        if (null != $rootScope.siteData.menus) {
            var fromMenus = $filter('filter')($rootScope.siteData.menus, {
                id_coleccion: $scope.idSelectedCollection
            });
            $scope.menuName = (fromMenus.length > 0) ? fromMenus[0].nombre : '';
        }

        //Estilos player por defecto
        $scope.playerOptions.player_skin = dataSite.player_skin;
        $scope.playerOptions.player_autoplay = (dataSite.player_autoplay == '1') ? true : false;
        $scope.playerOptions.player_loop = (dataSite.player_loop == '1') ? true : false;
        $scope.playerOptions.player_mute = (dataSite.player_mute == '1') ? true : false;
        $scope.playerOptions.player_controls = dataSite.player_controls;
        $scope.playerOptions.player_fullscreen_button = dataSite.player_fullscreen_button;
        $scope.playerOptions.player_play_button = dataSite.player_play_button;
        $scope.playerOptions.player_icons_color = dataSite.player_icons_color;
        $scope.playerOptions.player_bar_color = dataSite.player_bar_color;
        $scope.playerOptions.player_background_color = dataSite.player_background_color;
        $scope.playerOptions.player_logo_path = dataSite.player_logo_path;
        $scope.playerOptions.player_logo_url = dataSite.player_logo_url;
        $scope.playerOptions.player_poster = dataSite.player_poster;
        $scope.playerOptions.advertising = dataSite.advertising;
        $scope.playerOptions.url_preroll = dataSite.url_preroll;

        //Autostart players
        $rootScope.siteData.autostart = (IsJsonString(dataSite.autostart)) ? JSON.parse(dataSite.autostart) : {
            'home': false,
            'video': true,
            'live': true
        };

        //recupera video seleccionado una vez que ha recuperado settings generales
        if (undefined !== _videoAlias) {
            $scope.selectVideo();
        }
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_likeVideo
     *
     * Obtiene la información del video <<LIKE>> y verifica su estado 
     * 
     * @param {object} Datos del video
     */
    function _likeVideo(nVideo) {
        var idVideo = String(nVideo.video_id_video);
        var filterVideo = [];
        filterVideo.push(nVideo); //$filter('filter')($scope.videosExtraData, {id_video: idVideo});
        var favoriteCookie = $cookies.get('myFavorite');
        if (undefined != favoriteCookie) {
            var likedVideos = favoriteCookie.split(',');
            if ($.inArray(idVideo, likedVideos) == -1) {
                $cookies.put('myFavorite', favoriteCookie + ',' + idVideo, {
                    path: '/'
                });
                filterVideo[0].likes++;
                _setLikeOnServer(idVideo, 1);
            } else {
                //Remueve elemento y actualiza cookie
                likedVideos.splice(likedVideos.indexOf(idVideo), 1);
                $cookies.put('myFavorite', likedVideos.toString(), {
                    path: '/'
                });
                filterVideo[0].likes--;
                _setLikeOnServer(idVideo, 0);
            }
        } else {
            $cookies.put('myFavorite', idVideo, {
                path: '/'
            });
            filterVideo[0].likes++;
            _setLikeOnServer(idVideo, 1);
        }
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_setLikeOnServer
     *
     * Define el <<LIKE>> sobre el video
     * 
     * @param {number} Ide relacionado al video
     * @param {string} Operación a realizar en el servicio
     */
    function _setLikeOnServer(idVideo, operacion) {
        var params = {
            id_sitio: configSite.id_sitio,
            id_video: idVideo,
            operacion: operacion
        };
        var _config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        };
        var externalReq = $http.put(endPoint['setAsLikedVideo'], params, _config);
        externalReq.success(function(data, status, headers, _config) {});
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_isLikedVideo
     *
     * Revisa el <<LIKE>> en las cookies
     * 
     * @param {number} Ide relacionado al video
     */
    function _isLikedVideo(idVideo) {
        var idVideo = String(idVideo);
        var favoriteCookie = $cookies.get('myFavorite');
        if (undefined != favoriteCookie) {
            var likedVideos = favoriteCookie.split(',');
            if ($.inArray(idVideo, likedVideos) == -1) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    /**
     * @ngdoc method
     * @name homeInitCtrl#_isLikedVideo
     *
     * Convierte el HTML string en Real
     * 
     * @param {string} Html a convertir
     */
    function _trustAsHtml(string) {
        return $sce.trustAsHtml(string);
    };



    /****************************************************
     *  Events
     ***************************************************/

    $scope.$watch("fileToPlaySelected", function() {
        $('#sidebarRelatedVideos').height($('#mainVideo').height());
        setTimeout(function() {
            $('#sidebarRelatedVideos').height($('#mainVideo').height());
        }, 1500);
    });

    $scope.$on("$routeChangeStart", function(event) {
        $('body').scrollTop(0);
    });

}]);