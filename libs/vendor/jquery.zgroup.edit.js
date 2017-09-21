function injectStylesEdit() {
    setTimeout(function() {
        setInlineStyles();
    }, 4000);
}

function setInlineStyles() {
    jQuery('[data-bccustom-attrs]').each(function(index) {
        var customAttributes = jQuery(this).data('bccustom-attrs');
        var arrProperties = customAttributes.split(" ");

        if (jQuery.inArray("bgurl", arrProperties) != -1) {
            jQuery(this).css('background-image', jQuery(this).css('background-image'));
            jQuery(this).css('background-repeat', jQuery(this).css('background-repeat'));
            jQuery(this).css('background-position', jQuery(this).css('background-position'));
            jQuery(this).css('background-size', jQuery(this).css('background-size'));
        }

        if (jQuery.inArray("logoLayout", arrProperties) != -1) {
            jQuery(this).css('width', jQuery(this).css('width'));
            jQuery(this).css('height', jQuery(this).css('height'));
        }

        if (jQuery.inArray("bgcolor", arrProperties) != -1) {
            jQuery(this).css('background-color', jQuery(this).css('background-color'));
        }

        if (jQuery.inArray("color", arrProperties) != -1) {
            jQuery(this).css('color', jQuery(this).css('color'));
        }

        if (jQuery.inArray("extras", arrProperties) != -1) {

            var subject = jQuery(this);


            var cmps = configSite.GBL_PROPERTIES.edit_sections;
            for(var i=0; i<cmps.length; i++){
                var obj = cmps[i];
                var id;
                if(obj.cmp=='class'){
                    id = subject.attr('class');
                }else{
                    id = subject.attr('id');
                }
                if(id==obj.val){

                    for(var j=0; j<obj.extras.length; j++){
                        var extobj = obj.extras[j];
                        subject.css(extobj.klass, subject.css(extobj.klass));
                    }
                }     
            }
        }
    });
}

$(document).ready(function() {

    FastClick.attach(document.body);

    //Live events (<TODO: aplicar esto mismo al resto de los eventos JQUERY para eliminar SETTIMEOUT> )
    $(document).on('click', '#menuTrigger', function(){
        $('.menu').toggle();
    });

    var doc = document.documentElement;
	doc.setAttribute('data-useragent', navigator.userAgent);

	//Share without openGraph meta tags
	 $(document).on('click', '.facebook.share', function(){
        share();
    });


    $(document).on('click', '#resetBCCustomContent', function(){
        setTimeout(function() {
          inLineSvg();
        }, 1000);
    });


    $(document).on('click', '#bcCustomContentSidebar .handler', function(){
      inLineSvg();
      var handler=$(this);
      if($(this).data('expanded') == true) {
        $(this).data('expanded', false);
        $(this).attr('title','Mostrar personalizador de página');
        $('body').animate({left: '0px'}, function() {$('body').removeClass('pullToShow').addClass('pullToHide');});
        handler.html('<img src="assets/img/customize_icon_show.svg">');
        $('.editHandler.managedContent').html('<img src="assets/img/managed_plus.svg">');
      } else {
        $(this).data('expanded', true);
        $(this).attr('title','Ocultar personalizador de página');
        $('body').removeClass('pullToHide').addClass('pullToShow').animate({left: '500px'});
        handler.html('<img src="assets/img/customize_icon_hide.svg">');
      }
    });

});


function inLineSvg(){
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
}
