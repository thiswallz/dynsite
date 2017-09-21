angular.module("collection.directive", ["ui.bootstrap", "collection.service"])
/**
 * @ngdoc directive
 * @name CollectionDataGeneralService.directive:bcrVideosCollection
 * @scope
 * @restrict E
 *
 * @description
 * bcrVideosCollection sirve para armar las colecciones solicita la informacion a los servicios y entrega los videos ya formateados en columnas y filas
 *
 */
.directive('bcrVideosCollection', ['CollectionDataGeneralService',  '$http', '$templateCache', '$compile', '$parse', function(CollectionDataGeneralService, $http, $templateCache, $compile, $parse) {
    return {
        restrict: 'EA',
        scope: {
            idCollection: '=',
            idBlock: '@',
            brcItems: '@',
            brcClass: '@',
            brcClassInfo: '@',
            brcSize: '@',
            brcPagination: '=',
            brcCollections: '=',
            brcPanel: '=',
            brcShowTitle: '=',
            brcPlayerAutoStart: '@',
            brcPlayerSkin: '=',
            brcIdVideo: '=',
            onFinishLoading: '&onFinishLoading',
            favs: '=',
            hideLikes: '='
        },
        replace: true,
        templateUrl: configSite.GBL_PROPERTIES.custom_collection==false? configSite.root + "app/components/collection/collection.directive.videos.tpl.html" : configSite.template_base + configSite.template+'/components/collection/collection.directive.videos.tpl.html',
        link: function(scope , iElement, iAttrs) {                                    
        },
        controller: ['$rootScope', '$scope', '$filter', '$cookies', 'managerVideoControlService', '$sce', '$location', '$routeParams', function($rootScope, $scope, $filter, $cookies, managerVideoControlService, $sce, $location, $routeParams) {
            /*********************
            *	Public Vars
            **********************/
            $scope.brcPagination = (angular.isUndefined($scope.brcPagination)) ? false : $scope.brcPagination;
            $scope.visible = false;
            $scope.player360 = null;
            $scope.videosCollectionList = [];
            $scope.totalVideoCollection = 0;
            $scope.rootPath = configSite.root_path;
            $scope.cdnUrl = configSite.s3UrlPrefix;
            $scope.panelName = "";
            $scope.urlSite = $location.absUrl();
            $scope.loadingContent = false;
            $scope.extraData = undefined;
            $scope.url_scheme = (dataSite.secure_site == 1) ? 'https:' : 'http:';
            $scope.xlvideo = '';

            /*********************
            *	Private Vars
            **********************/
            var _pagesVideoCollection = 0;
            var _cdnUrlImage = configSite.s3urlprefiximages;
            var _bcrCurrentPage = 1;
            var _isTagsView = false;
            var _isSearchView = false;

            /*********************
            *	Public Functions
            **********************/
            $scope.getPathImg               = _getPathImg;
            $scope.isPlayerLoaded           = _isPlayerLoaded;
            $scope.searchMedia              = _searchMedia;
            $scope.accumulatingLengthOfTags = _accumulatingLengthOfTags;
            $scope.likeVideoCollection      = _likeVideoCollection;
            $scope.isLiked                  = _isLiked;
            $scope.getCollectionByPage      = _getCollectionByPage;
            

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
            };



            function _getPathImg(video, size, scheme) {
                var sizeImg = (!size || 0 === size) ? '' : '_' + params.size;
                var scheme_url = (!scheme || 0 === scheme) ? '' : scheme;
                if (video.container === 'youtube') {
                    var n = video.preview.includes("//");
                    if (n) {
                        return video.preview_xl; // + sizeImg;
                    } else {
                        return scheme_url + _cdnUrlImage + video.ruta + '/' + video.preview + sizeImg;
                    }
                } else {
                    return scheme_url + _cdnUrlImage + video.ruta + '/' + video.preview + sizeImg;
                }
            };

            function _isPlayerLoaded() {
                $scope.playerLoaded = true;
            };
            /**
             * buscador
             */
            function _searchMedia() {
                // $scope.urlSite
                //$scope.root_path
                // var url = $scope.urlSite + 'search/' + this.searchKeywords;
                $location.path('/search').search({ query: this.searchKeywords });
                // console.log("searchMedia", url);
                //$location.path(url).replace();
                //$window.location.href = url;

            };

            
            function _loadPlayer() {
                if ($scope.brcSize == "xl") {
                    if ($scope.videosCollectionList.length > 0) {
                        $scope.player360 = false;
                        $scope.xlvideo = ($scope.videosCollectionList)[0];
                        $scope.idFeaturedVideo = $scope.xlvideo.video_id_video;
                        $rootScope.idFeaturedVideo = $scope.idFeaturedVideo;
                        var strPathPreview = configSite.s3urlprefiximages + $scope.xlvideo.ruta + '/' + $scope.xlvideo.preview_xl;
                        var strPathVtt = configSite.s3urlprefiximages + '/' + configSite.ambientPrefix + $scope.xlvideo.video_id_video + '/preview/preview.vtt';
                        var skin = {
                            name: $scope.brcPlayerSkin.player_skin,
                            active: $scope.brcPlayerSkin.player_bar_color,
                            inactive: $scope.brcPlayerSkin.player_icons_color,
                            background: $scope.brcPlayerSkin.player_background_color
                        };
                        $scope.optionsPlayerHome = {
                            image: strPathPreview,
                            abouttext: "viddeo.com",
                            aboutlink: "http://www.viddeo.com/",
                            preload: 'auto', //'metadata',
                            primary: "html5",
                            hlshtml: true,
                            width: "100%",
                            aspectratio: "16:9",
                            skin: skin,
                            autostart: $scope.brcPlayerAutoStart,
                            // tracks: [{ file: strPathVtt, kind: 'thumbnails' }]
                        };
                        if ($scope.brcPlayerSkin.advertising == '1') {
                            $scope.optionsPlayerHome.advertising = {
                                client: 'vast',
                                skipoffset: 3,
                                tag: $scope.brcPlayerSkin.url_preroll
                            };
                        }
                        var strPathVideo;
                        if ($scope.xlvideo.container == "ts") {
                            strPathVideo = configSite.s3UrlPrefix + '/' + configSite.ambientPrefix + $scope.xlvideo.video_id_video + "/" + $scope.xlvideo.hls_name;
                            $scope.fileToPlayHome = $sce.trustAsResourceUrl(strPathVideo);

                        } else if ($scope.xlvideo.container == "jwp360") {
                            /*
                             $scope.player360 = true;
                              $scope.iframeFixSrc = $sce.trustAsResourceUrl("//vodviddeo.akamaized.net/media/embed.html?player=&uuid=" + $scope.xlvideo.video_id_video);
                             */
                            $scope.fileToPlayHome = "";
                            var isIphone = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                            strPathVideo = configSite.s3UrlPrefix + '/' + configSite.ambientPrefix + $scope.xlvideo.video_id_video + "/" + 'playlist.m3u8';

                            if (isIphone) {
                                //host origin window.location.origin + 
                                strPathVideo = "/video/" + configSite.ambientPrefix + $scope.xlvideo.video_id_video + "/" + 'playlist.m3u8'; //aqui esta la url
                            }
                            $scope.optionsPlayerHome.playlist = [{
                                // title: 'Caminandes VR',
                                mediaid: $scope.xlvideo.video_id_video,
                                stereomode: 'monoscopic',
                                image: strPathPreview,
                                file: strPathVideo
                            }];
                            delete $scope.optionsPlayerHome.image;
                            delete $scope.optionsPlayerHome.file;


                        } else if ($scope.xlvideo.container == "youtube") {
                            delete $scope.optionsPlayerHome.image;
                            delete $scope.optionsPlayerHome.file;
                            $scope.fileToPlayHome = $sce.trustAsResourceUrl($scope.xlvideo.externalUrl);
                            var n = $scope.xlvideo.preview.includes("//");
                            if (n) {
                                $scope.optionsPlayerHome.image = $scope.xlvideo.preview_xl;
                            } else {
                                $scope.optionsPlayerHome.image = strPathPreview;
                            }
                        } else {
                            $scope.player360 = false;
                            $scope.fileToPlayHome = "";
                            var strSources = (IsJsonString($scope.xlvideo.sources)) ? JSON.parse($scope.xlvideo.sources) : [];
                            $scope.optionsPlayerHome.playlist = [{
                                image: strPathPreview,
                                sources: strSources
                            }];
                            // $scope.optionsPlayerHome.tracks = [{file: strPathVtt,kind: 'thumbnails'}];
                        }
                    }
                }
            };

            function _loadCollectionsInPanel() {
                var id_collection_select = -1;
                if ($scope.idCollection) {
                    id_collection_select = $scope.idCollection;
                    $scope.visible = true;
                    $scope.loadingContent = true;
                    $scope.getCollections(id_collection_select);
                } else {
                    var panel = ($filter('filter')($scope.brcPanel, { id_panel: $scope.idBlock }))[0];
                    if (undefined !== panel) {
                        id_collection_select = panel.id_coleccion;
                        $scope.visible = panel.visible;
                        if (undefined !== panel.name) {
                            $scope.panelName = panel.name;
                        } else {
                            $scope.panelName = "Escriba un nombre para este PANEL";
                        }
                        $scope.getCollections(id_collection_select);
                    } else {
                        $scope.videosCollectionList = [];
                        $scope.totalVideoCollection = 0;
                        _pagesVideoCollection = 0;
                    }
                }
            };


            function _accumulatingLengthOfTags(tagsArray, toIndex, sizeThumb) {
                var charactersCount = 0;
                for (i = 0; i < toIndex; i++) {
                    charactersCount += tagsArray[i].length;
                }

                var maxLength = 1000;
                switch (sizeThumb) {
                    case 'xl':
                        maxLength = 40;
                        break;
                    case 'l':
                        maxLength = 35;
                        break;
                    case 'm':
                        maxLength = 20;
                        break;
                }
                return charactersCount <= maxLength;
            };


            function _isLiked(idVideo) {
                var idVideo = String(idVideo);
                var favoriteCookie = $cookies.get('myFavorite');
                if (undefined !== favoriteCookie) {
                    var likedVideos = favoriteCookie.split(',');
                    if ($.inArray(idVideo, likedVideos) == -1) {
                        return false;
                    } else {
                        return true;
                    }
                }
                return false;
            };


            $scope.setLike = function(idVideo, operacion) {
                var params = {
                    //id_usuario: configSite.id_usuario,
                    id_sitio: configSite.id_sitio,
                    id_video: idVideo,
                    operacion: operacion
                };
                CollectionDataGeneralService.setLikeOnVideoCollection(params)
                    .then(function successCallback(response) {}, function errorCallback(response) {
                        console.log('Error en invocacion servicio setLike');
                    });
            };


            function _likeVideoCollection(id_Video) {
                //agregar arreglo con view y likes
                var filterVideo = $filter('filter')($scope.videosCollectionList, {
                    video_id_video: id_Video
                });

                var idVideo = String(id_Video);
                var favoriteCookie = $cookies.get('myFavorite');
                if (undefined !== favoriteCookie) {
                    var likedVideos = favoriteCookie.split(',');
                    if ($.inArray(idVideo, likedVideos) == -1) {
                        $cookies.put('myFavorite', favoriteCookie + ',' + idVideo, { path: '/' });
                        $scope.videosCollectionList.likes++;
                        $scope.setLike(idVideo, 1);
                    } else {
                        //Remueve elemento y actualiza cookie
                        likedVideos.splice(likedVideos.indexOf(idVideo), 1);
                        $cookies.put('myFavorite', likedVideos.toString(), { path: '/' });
                        $scope.videosCollectionList.likes--;
                        $scope.setLike(idVideo, 0);
                    }
                } else {
                    $cookies.put('myFavorite', idVideo, { path: '/' });
                    $scope.videosCollectionList.likes++;
                    $scope.setLike(idVideo, 1);
                }

                $scope.$emit('replicateFavs', $scope.videosCollectionList);
            };


            $scope.getCollections = function(id_selected_collection) {
                $scope.thisCollection = ($filter('filter')($scope.brcCollections, { id_coleccion: id_selected_collection }))[0];
                if (undefined !== $scope.thisCollection) {
                    $scope.getCollectionByPage(1);
                } else {
                    $scope.videosCollectionList = [];
                    $scope.panelName = "Selecciona una Colección";
                }
            };

   
            function _getCollectionByPage(pPage) {
                _bcrCurrentPage = pPage;
                var video_tags = "";
                var search = '';
                if (null !== $scope.brcCollections.selectedVideo) {
                    video_tags = $scope.brcCollections.selectedVideo.tags;
                } else if (_isTagsView === true) {
                    video_tags = $routeParams.tag;
                } else if (_isSearchView === true) {
                    search = $routeParams.query;
                    $scope.thisCollection.filters[0].type = { "name": "Search", "value": "Search" };
                    $scope.thisCollection.id_coleccion = 'dfsf4';
                    //$scope.thisCollection.filters[0].rule = { "name": "Search", "value": "Search" };
                }
                //Indicates whether we are in edit mode
                var cache = true;
                if (_token != '') {
                    cache = Date.now();
                }
                var params = {
                    id_collection: $scope.thisCollection.id_coleccion,
                    items: $scope.brcItems,
                    page: _bcrCurrentPage,
                    tags: video_tags,
                    keywords: search,
                    videoId: $scope.brcIdVideo,
                    order: $scope.thisCollection.order,
                    filters: $scope.thisCollection.filters,
                    source: $scope.thisCollection.source,
                    cache: cache
                };

                CollectionDataGeneralService.getVideoCollection(params).then(function(response) {
                    $scope.videosCollectionList = JSON.parse(response.data.Payload);
                    $scope.totalVideoCollection = response.data.total;
                    _pagesVideoCollection = response.data.pages;
                    $scope.loadingContent = false;

                    $scope.onFinishLoading();

                }).catch(function(err) {
                    console.log('Error en invocacion servicio getVideoCollection');
                    $scope.loadingContent = false;
                });

            };


            /****************************************************
             *  Events
             ***************************************************/
            $scope.$watch('favs', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    for (fav in $scope.favs) {
                        for (video in $scope.videosCollectionList) {
                            if ($scope.favs[fav].videoId == $scope.videosCollectionList[video].video_id_video) {
                                $scope.videosCollectionList[video].likes = $scope.favs[fav].favs;
                            }
                        }
                    }
                }
            }, true);

            $rootScope.$watch('extraData', function(newValue, oldValue) {
                if ((newValue != oldValue)) {
                    $scope.extraData = $rootScope.extraData;
                }
            });

            $scope.$watchGroup(["extraData", "videosCollectionList"], function(newValues, oldValues, $scope) {
                if ((undefined !== $scope.extraData && ([] != $scope.videosCollectionList && undefined !== $scope.videosCollectionList))) {
                    angular.forEach($scope.videosCollectionList, function(value, key) {
                        angular.forEach($scope.extraData, function(value2, key2) {
                            if ($scope.videosCollectionList[key].video_id_video == $scope.extraData[key2].id_video) {
                                $scope.videosCollectionList[key].views = value2.views;
                                $scope.videosCollectionList[key].likes = value2.likes;
                            }
                        });
                    });
                }
            });

            if (($location.path()).indexOf("/video/") != -1) {
                $scope.$watchGroup(['brcCollections', 'brcPanel', 'brcCollections.selectedVideo'], function(newValues, oldValues, scope) {
                    if (undefined !== newValues && newValues != oldValues && undefined !== scope.brcCollections && undefined !== scope.brcPanel && (undefined !== scope.brcCollections.selectedVideo && null != scope.brcCollections.selectedVideo)) {
                        _loadCollectionsInPanel();
                    }
                });
            } else if (($location.path()).indexOf("/collection/") != -1) {
                $scope.$watch('brcCollections', function(newValue, oldValue) {
                    if ((undefined !== $scope.brcCollections)) {
                        _loadCollectionsInPanel();
                    }
                });
            } else if (($location.path()).indexOf("/tags/") != -1) {
                $scope.$watch('brcCollections', function(newValue, oldValue) {
                    if ((undefined !== $scope.brcCollections)) {
                        _isTagsView = true;
                        _loadCollectionsInPanel();
                    }
                });
            } else if (($location.path()).indexOf("/search") != -1) {
                $scope.$watch('brcCollections', function(newValue, oldValue) {
                    if ((undefined !== $scope.brcCollections)) {
                        _isSearchView = true;
                        _loadCollectionsInPanel();
                    }
                });
            } else {
                $scope.$watchGroup(['brcCollections', 'brcPanel'], function(newValues, oldValues, scope) {
                    if ((undefined !== $scope.brcCollections && undefined !== $scope.brcPanel)) {
                        _loadCollectionsInPanel();
                    }
                });
                $scope.$watchGroup(['videosCollectionList', 'playerLoaded'], function(newValues, oldValues, scope) {
                    if (undefined !== scope.videosCollectionList && $scope.playerLoaded == true) {
                        _loadPlayer();
                    }
                });
            }

            $scope.$watch('brcPanel', function(newValues, oldValues) {
                if (newValues != oldValues && undefined !== oldValues) {
                    _loadCollectionsInPanel();
                }
            }, true);

        }]
    };
}]);