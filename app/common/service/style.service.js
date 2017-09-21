angular.module("gallery.app")


.service("styleService", function(){
    this.getStyles = function() {
        var strDefaultStyles = '#bc_headerWrapper{background-image: url("' + configSite.assetspath + '/images/gallery/default/default_background.jpg"); background-color: rgb(75, 71, 71);}#bc_clientLogo{width: 150px; height: 150px; background-image: url("' + configSite.assetspath + '/images/gallery/default/logo_default.svg");}#bc_clientTitle{color: rgb(205, 205, 205);}#bc_mainFooter{color: rgb(255, 255, 255); background-image: none; background-color: rgb(125, 125, 125);}';
        if (null != dataSite.css && '' != dataSite.css) {
            css = (dataSite.css).replace(/&#34;/g, "\"");
            injectStyles(css);
        } else {
            injectStyles(strDefaultStyles);
        }

    };
})