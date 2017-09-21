function injectStyles(strStyles) {
    jQuery("head").append("<style type='text/css'>" + strStyles + "</style>");
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }

    //casos null son validamente parseados
    //para nuestro caso retornamos false
    if (str == null || str == 'null') {
        return false;
    }

    return true;
}
function httpGet(alias, env) {
    var cache = true;
    if (_token != '' && null != _token) {
        cache = Date.now();
    }
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        }
    };
    //SERVICIO VIVO
    //xmlHttp.open("GET", APIHOST + ENVIRONMENT + "/sitio/config/" + alias + '?cache=' + cache, false); // false for synchronous request
    xmlHttp.open("GET", 'http://s3.amazonaws.com/assets-viddeo/gallery/'+env+'/sites/'+alias+'/data.json', false);
    //xmlHttp.open("GET", 'http://assets2.akamaized.net/gallery/dev/sites/mauricio.dev.viddeo.com/data.json', false);
    
    xmlHttp.send();
    return JSON.parse(xmlHttp.responseText);
}

function base64_decode(encodedData) {
    if (typeof window !== 'undefined') {
        if (typeof window.atob !== 'undefined') {
            return decodeURIComponent(unescape(window.atob(encodedData)))
        }
    } else {
        return new Buffer(encodedData, 'base64').toString('utf-8')
    }

    var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    var o1, o2, o3, h1, h2, h3, h4
    var bits
    var i = 0
    var ac = 0
    var dec = ''
    var tmpArr = []

    if (!encodedData) {
        return encodedData
    }

    encodedData += ''

    do {
        // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(encodedData.charAt(i++))
        h2 = b64.indexOf(encodedData.charAt(i++))
        h3 = b64.indexOf(encodedData.charAt(i++))
        h4 = b64.indexOf(encodedData.charAt(i++))

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4

        o1 = bits >> 16 & 0xff
        o2 = bits >> 8 & 0xff
        o3 = bits & 0xff

        if (h3 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1)
        } else if (h4 === 64) {
            tmpArr[ac++] = String.fromCharCode(o1, o2)
        } else {
            tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
        }
    } while (i < encodedData.length)

    dec = tmpArr.join('')

    return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var getQueryString = function(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    var string = reg.exec(href);
    return string ? string[1] : null;
};

function httpGetroperties() {
    var xmlHttp = new XMLHttpRequest();
    if(bcCustomize==true){
        xmlHttp.open("GET", "./template/" + dataSite.template_folder + '/properties.edit.json', false); // false for synchronous request

    }else{
        xmlHttp.open("GET", "./template/" + dataSite.template_folder + '/properties.json', false); // false for synchronous request
    }
    xmlHttp.send();
    return JSON.parse(xmlHttp.responseText);
}

$(document).ready(function() {

    //Live events (<TODO: aplicar esto mismo al resto de los eventos JQUERY para eliminar SETTIMEOUT> )
    $(document).on('click', '#menuTrigger', function(){
        $('.menu').toggle();
    });

	//Share without openGraph meta tags
	 $(document).on('click', '.facebook.share', function(){
        share();
    });


});