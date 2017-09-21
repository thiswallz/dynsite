angular.module("home.service", [])

/**
 * @ngdoc type
 * @module home.service
 * @name managerVideoControlService
 *
 * @description
 *
 * ## Servicio para el control de videos
 * 
 */
.service("managerVideoControlService", function(){

    this.selectedCategory = null;
 	this.videosCategory = null;
    this.selectedVideo = null;
    this.reladedVideos = null;

    this.optionsPlayerSelected = null;
    this.fileToPlaySelected = null;
    this.fileToPlayLive = null;
    this.optionsPlayerLive = null;

    //openGraph dynamic values
    this.openGraph={};

    this.pagination={total:null, page:1, items:null, list:null};
})