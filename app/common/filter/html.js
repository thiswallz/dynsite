angular.module("gallery.app")


.filter('escapeHTML', function() {
    return window.encodeURIComponent;
})