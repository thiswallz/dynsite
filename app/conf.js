var zgconfig = new function() {
    this._token='';

    this.init = function (host, env, base, buri) {
        console.time("Inicio Config")
        window.ENVIRONMENT = env;
        window.APIHOST = host;
        window.bcCustomize = false;
        window.siteAlias = buri;

        this._token = getQueryString('edit');
        window._token = this._token;
        if(!window._token){
            console.log("EDIT MODE FALSE")
            window.dataSite = _datajsonglobal;
        }else{
            console.log("EDIT MODE TRUE")
            window.dataSite =httpGet(buri, env)
        }

        
        _verifyToken();

        var base = base+"/";

        window.configSite = {
            "GBL_PROPERTIES": httpGetroperties(),
            'ENVIRONMENT': ENVIRONMENT,
            'APIHOST': APIHOST,
            'private': dataSite.privado,
            'custom_access': dataSite.custom_access,
            'ACTIVO': dataSite.sitio_publicado,
            'payment': dataSite.payment,
            'codigo_analytics': dataSite.analytics_id,
            'bucketS3': dataSite.bucket,
            'bucketS3assets': dataSite.bucketassets,
            'root' : base,
            'root_path':  base + '#/', //TODO ser global
            'id_sitio': dataSite.id_sitio,
            'id_usuario': dataSite.id_usuario,
            'bcCustomize': bcCustomize, //bcCustomize, //true,bcCustomize
            's3UrlPrefix': dataSite.s3urlprefix, //"http://vod.viddeo.com/""http://cdnaws.brooadcast.com/",// dataSite.s3urlprefix,
            's3urlprefiximages': dataSite.s3urlprefiximages,
            'assetspath': dataSite.assetspath,
            'ambientPrefix': dataSite.ambientprefix,
            'apache_unique_id': dataSite.requestid,
            'template': dataSite.template_folder,
            'ip_request': dataSite.ip_request,
            'firehoseName': dataSite.deliveryStreamName,
            'template_base': base + 'template/',
            'template_view': base + 'template/' + dataSite.template_folder + '/views',
            'sections': _getSections()
        };
        _setModules();
        _setStyles();
        _setScripts();
        _setNativeExtension();
    };

    var _getSections = function(){
        //TODO obtener datos del servicio JSON inicial
        /*var arr = [{
            id  : "cmp_section_1",
            html: '<h4 id="head_11"></h4><h5 class="whirl">{{extra.subtitulo}}</h5><div id="tlkio" data-channel="Sodimac_Chat" data-custom-css="'+window.location.origin+window.location.pathname+'template/live/assets/css/customchat.css" style="width:100%;height:400px;"></div><script async src="http://tlk.io/embed.js" type="text/javascript"></script>',
            js  : "console.log('Ejemplo....Extra'); $('#head_11').html('Titulo dinamico')",
            css : "#he ad_11{color:red}",
            curlcss : [
                'https://bootswatch.com/cerulean/bootstrap.min.css',
                'http://www.cssscript.com/demo/simple-cross-browser-pure-css-loading-animations-whirl-css/dist/whirl.css'
            ]
        },{
            id  : "cmp_section_2",
            html: "<a class='twitter-timeline' href='//twitter.com/cnn' data-chrome='nofooter transparent noheader transparent'></a>",
            js  : "",
            script : ["//platform.twitter.com/widgets.js"],
            css : ""
        }]*/

        return  window.dataSite.template_sections;
    }

    var _setNativeExtension = function(){
        String.prototype.replaceAll = function(search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };
    }
    var _setModules = function(){
        window.modlibs = [
            "ngRoute", 
            "ngSanitize",
            "ng-jwplayer", 
            "ngCookies", 
            "angular-uuid", 
            "720kb.socialshare", 
            "updateMeta", 
            "gallery.collection", 
            "gallery.configuration",
            "gallery.authentication",
            "gallery.home",
            "gallery.channel",
            "gallery.payment",
            "gallery.aws",
            "gallery.login",
            "gallery.options.custom",
            "timer"
        ];
        window.tmp_custom="";

        if(configSite.GBL_PROPERTIES.libs && configSite.GBL_PROPERTIES.libs.length>0){
            for(var i=0; i<configSite.GBL_PROPERTIES.libs.length;i++){
                if(configSite.GBL_PROPERTIES.libs[i].module && configSite.GBL_PROPERTIES.libs[i].module!=""){
                    window.modlibs.push(configSite.GBL_PROPERTIES.libs[i].module);
                }
            }
        }
        if (configSite.bcCustomize) {
            window.modlibs.push("gallery.custom");
            window.tmp_custom = "<div id='bcCustomContentSidebar' ng-controller='customGeneralCtrl'><div id='wrapperSidebar' ng-include='getUrlCommonHtml()'></div></div>";
        }
    }

    var _setStyles = function(){
        var _prop = configSite.GBL_PROPERTIES;
        if(_prop.css_files){
            for(var i=0;i<_prop.css_files.length;i++){
                jQuery("head").append('<link rel="stylesheet" href="'+ configSite.root + 'template/'+ configSite.template + "/" + _prop.css_files[i]+'" type="text/css" />');;
            }
        }

        
    }

    var _setScripts = function(){
        var _prop = configSite.GBL_PROPERTIES;

        if(_prop.js_files){
            for(var i=0;i<_prop.js_files.length;i++){
                document.write('<script type="text/javascript" src="'+ configSite.root + 'template/'+ configSite.template + "/" + _prop.js_files[i]+'">');
                document.write('<\/script>');
            }
        }
        
    }

    var _getDataSite = function (inf, env, alias) {
        return httpGet(inf, env, alias);
    };

    var _verifyToken = function(){
        if (this._token) {
            window._paramEdit = JSON.parse(base64_decode(this._token));
            window.apigClient = apigClientFactory.newClient({
                accessKey: _paramEdit.AccessKeyId,
                secretKey: _paramEdit.SecretAccessKey,
                sessionToken: _paramEdit.SessionToken
            });
            window._cookie = getCookie("edit");
            if (_cookie === dataSite.unit_id) {
                window.bcCustomize = true;
            } else {
                window.bcCustomize = false;
            }
        } else {
            this._token = '';
        }
    }
};


/**
 * @ngdoc method
 * @name zgconfig
 *
 * Inicializa las variables globales y el servicio inicial
 * 
 * @param {string} APIHOST ruta del servicio
 * @param {string} ENVIRONMENT variable
 * @param {string} URL Base del sistema, URL RAIZ
 * @param {string} URL De <<siteAlias>> Para hacer match con la configuración y JSON del servicio entregado
 * @return nothing
 */
//v1
zgconfig.init(_propertiesw.host, _propertiesw.env, _propertiesw.base, _propertiesw.buri);
zgconfig = null;



