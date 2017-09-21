angular.module("aws.service", [])

/**
 * @ngdoc type
 * @module aws.service
 * @name AWSConfigService
 *
 * @description
 *
 * ## Servicio de captura de estadisticas de videos
 * 
 */
.factory('AWSConfigService', ['$http', '$window', '$rootScope', 'uuid', 'jwplayerService', function($http, $window, $rootScope, uuid, jwplayerService) {
    var markers = [1, 2, 3, 4, 5, 10, 25, 50, 70, 75, 90, 100];
    var playersMarkers = [];
    var _startTime = -1;
    var _lastTime = -1;
    var _interval = 10;
    var _referrer = '';
    var isLive = false;
    var is_playFirst = false;
    var idPlayingVideo;
    var _uuid;
    var siteData;

    function _init(){
        AWS.config.region = 'us-east-1';
        AWS.config.timeout = 5200000;
        AWS.config.correctClockSkew = true;
        AWS.config.isClockSkew = true;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:b4af9167-d6cc-41b4-993d-2ca690e1ee50'
        });
    }

    function _startTracking(paramsKines){
        AWS.config.credentials.get(function(err) {  
            if (err) {
                console.error("('Error retrieving credentials.'", err);
                return;
            }
            var firehose = new AWS.Firehose({
                apiVersion: '2015-08-04'
            });
            var paramsfirehose = {
                DeliveryStreamName: configSite.firehoseName,
                Record: {
                    Data: JSON.stringify(paramsKines)
                }
            };
            firehose.putRecord(paramsfirehose, function(err, data) {
                if (err) {
                    console.log(" err firehose putRecord", err, err.stack);
                } // an error occurred
                else {

                } // successful response
            });
        });
    }

    function _configStats(site, selectedVideo){
        siteData = site;
        $rootScope.$on('ng-jwplayer-ready', function(event, args) {
            //Registra eventos del player
            var player = jwplayerService.myPlayer[args.playerId];

            if ('playerHome' == args['playerId']) {
                idPlayingVideo = $rootScope.idFeaturedVideo;
                isLive = false;
            } else if ('playerSelected' == args['playerId']) {
                idPlayingVideo = selectedVideo.video_id_video;
                isLive = false;
            } else if ('playerLive' == args['playerId']) {
                isLive = true;
                idPlayingVideo = siteData.id_channel;
            }
            _uuid = uuid.v1();
            if (window.top !== window) {
                _referrer = document.referrer;
            } else {
                _referrer = window.location.href;
            }
            if (siteData.is_tracker == '1') {
                player.on('idle', _idleHandler);
                player.on('time', _timeHandler);
                player.on('levelsChanged firstFrame visualQuality complete error pause buffer setupError fullscreen', _stateCount);
                player.on('play buffer', _stateHandler);
                player.on('setupError', _setupErrorHandler);
                _saveTrackingVideo('ready', player, player.qoe(), idPlayingVideo);
            }
        });
    }

    function _saveTrackingVideo(eventoPlayer, _player, event, idPlayingVideo){
        var current, _dataVisualQuality, _Current_Bitrate, _quality_label, _quality_mode, _resolutions,
            _width, _height, _duration, _tipo, _playerid,
            start, _id_sitio, _uuid, _id_usuario, _id_cuenta, _apache_unique_id, _container, _vrmode, _ip_request;
        var duration_pgr = 0;
        var item = _player.getPlaylistItem();
        var mediaid = idPlayingVideo; //item.mediaid;
        var file = item.file;
        if (!file) {
            file = item.sources[0].file;
        }
        _duration = (_player.getDuration() == 'Infinity') ? 0 : _player.getDuration();
        _width = (_player.getWidth() === undefined) ? '000' : _player.getWidth();
        _height = (_player.getHeight() === undefined) ? '000' : _player.getHeight();
        _playerid = _player.id;
        _tipoflag = (_player.id == 'playerLive') ? 'liveVOD' : 'gallery';
        _unit_id = (_player.id == 'playerLive') ? siteData.channelUid : siteData.unit_id;
        _uuid = _uuid;
        _id_sitio = siteData.id_sitio;
        _id_usuario = siteData.id_usuario;
        _id_cuenta = siteData.id_cuenta;
        _apache_unique_id = configSite.apache_unique_id;
        _ip_request = configSite.ip_request;
        _container = 'ts';
        _vrmode = 'n/a';

        if (_player.getVisualQuality() === undefined || _player.getVisualQuality() === null) {
            current = 0;
            _dataVisualQuality = ["sin data", 0];
            _Current_Bitrate = 0;
            _quality_label = 'label_ready';
            _quality_mode = '0';
            _resolutions = ["sin data", 0];
        } else {
            current = (_player.getCurrentQuality() == -1) ? 0 : _player.getCurrentQuality();
            _dataVisualQuality = _player.getVisualQuality();
            _Current_Bitrate = _dataVisualQuality.level.bitrate;
            _quality_label = _dataVisualQuality.level.label;
            _quality_mode = _dataVisualQuality.mode;
            _resolutions = [].map.call(_player.getQualityLevels(), function(obj) {
                return obj.label;
            });
        }

        switch (eventoPlayer) {
            case 'item':
                break;
            case 'ready':
                break;
            case 'progress':
            case 'seek':
            case 'stop':
                start = Math.round(_startTime * 10) / 10;
                duration_pgr = Math.round((_lastTime - _startTime) * 10) / 10;
                break;
        }

        var paramsKines = {
            unit_id: _unit_id,
            tipo: _tipoflag,
            id_tipo: _id_sitio,
            id_recurso: mediaid,
            id_cuenta: _id_cuenta,
            id_usuario: _id_usuario,
            segundos: _player.getPosition(),
            user_agent: $window.navigator.userAgent,
            ip_request: _ip_request,
            headers: '', // _headers,
            server: '', //_server,
            server_referer: _referrer,
            server_query: window.location.search,
            server_request_uri: _referrer,
            eventoplayer: eventoPlayer,
            metadataplayer: 'sin data',
            eventoplayerdata: JSON.stringify(event),
            apache_unique_id: _apache_unique_id,
            fecha_registro: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
            player_type: _player.getProvider().name,
            current_bitrate: _Current_Bitrate,
            visual_quality: JSON.stringify(_dataVisualQuality),
            video_url: file,
            duracion: _duration,
            s_duration: duration_pgr,
            player_id: _playerid,
            quality_label: _quality_label,
            quality_mode: _quality_mode,
            resolutions: JSON.stringify(_resolutions),
            uuid_tracking: _uuid,
            volume: _player.getVolume(),
            height: _height,
            width: _width,
            container: _container,
            vrmode: '',
            geoip_data: '',
            geoip_region_code: '',
            geoip_country_code: '',
            geoip_country_name: '',
        }; 
        _startTracking(paramsKines);
    }


    function _setupErrorHandler(event) {
        console.log('ERROR PLAYER:', event);
    }

    function _stateHandler(event) {
        if (event.oldstate === window.jwplayer.events.state.IDLE) {
            _saveTrackingVideo('item', this, event, idPlayingVideo);
            _startTime = -1;
            _lastTime = -1;
        } else {
            _saveTrackingVideo(event.type, this, event, idPlayingVideo);
        }
    }

    function _stateCount(event) {
        _saveTrackingVideo(event.type, this, event, idPlayingVideo );
        if (event.type == 'error') {
            jwplayer().load({
                file: "//assets.viddeo.com/videos/error.mp4",
                //image: "//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
            });
            jwplayer().play();
        }
    }

    function _idleHandler(event) {
        if (_startTime > -1) {
            _saveTrackingVideo('stop', this, event, idPlayingVideo );
            _saveTrackingVideo(event.type, this, event, idPlayingVideo);
        }
    }

    function _timeHandler(event) {
        /***/
        var epos = event.position;
        var epos2 = epos.toPrecision(1);
        if (isLive) {
            if (is_playFirst == false) {
                _saveTrackingVideo('playFirst', this, event, idPlayingVideo);
                is_playFirst = true;
            }
        } else {
            if (epos2 >= 0.1 && epos2 < 0.9 && is_playFirst == false) {
                _saveTrackingVideo('playFirst', this, event, idPlayingVideo );
                is_playFirst = true;
            }
        }
        //
        if (!isLive) {
            var percentPlayed = Math.floor(event.position * 100 / event.duration);
            if (markers.indexOf(percentPlayed) > -1 && playersMarkers.indexOf(percentPlayed) == -1) {
                playersMarkers.push(percentPlayed);
                _saveTrackingVideo("Progress " + percentPlayed + "%", this, event, idPlayingVideo );
            }
        }
        /***/
        if (_startTime === -1) {
            _startTime = _lastTime = event.position;
        } else if (Math.abs(event.position - _lastTime) > 1) {
            if (_lastTime - _startTime > 2) {
                _saveTrackingVideo('seek', this, event, idPlayingVideo);
            }
            _startTime = -1;
            _lastTime = -1;
        } else if (_lastTime - _startTime > _interval) {
            _saveTrackingVideo('trackProgress', this, event, idPlayingVideo );
            _startTime = _lastTime = event.position;
        } else {
            _lastTime = event.position;
        }
    }

    return {
        init: _init,
        configStats: _configStats
    }
}])