﻿/*
Google Analytics Plugin v1.3 BETA 1 for KRPanoJS and iOS4.2+
by Jaydee || http://jaydee.ru/
*/
var krpanoplugin=function(){function J(){}function K(a){m=a}function L(){return m}function M(a){j=a;u&&m&&h("Account: "+j);u&&v("_setAccount",j)}function N(){return j}function O(a){s=a}function P(){return s}function Q(){return w}function R(){var a=g.get("xml.url")||g.get("xml.scene"),a=a?a.toLowerCase():null,b=q[a];if(b){var c=t("pano",b);z(c.pageurl)}if(p[a])for(b in p[a])A(b);for(b in r)A(b)}function S(a,b,c,e){a=f(a);b=f(b);c=n(c);e=f(e);B(a,b,c,e)}function T(a){a=f(a);C(a)}function U(){D()}function V(a,
b,c,e,k,d){a=f(a);b=f(b);c=n(c);e=f(e);k=f(k);d=n(d);E(a,b,c,e,k,d)}function W(a){a=f(a);x(a)}function X(){F()}function Y(a,b){var c=f(a),e=null!=b?n(b):!0;z(c,e)}function Z(a,b,c,e,d){a=f(a);b=f(b);c=c&&"undefined"!=c?f(c):void 0;e=e&&"undefined"!=e?parseInt(e):void 0;var g=d?n(d):!1;d=c;c=g;a&&b?(d=d||void 0,e=e||void 0,c=c||!1,a=[a,b],(void 0!=d||void 0!=e||c)&&a.push(d),(void 0!=e||c)&&a.push(e),c&&a.push(c),m&&h("Track Event: "+a.join(", ")),a.unshift("_trackEvent"),v.apply(null,a)):h("Track Event Error - Event category and action must be specified",
3)}function B(a,b,c,e,k){if(a&&b&&e){var f=g.parsePath(b).toLowerCase();k=k||!0;e=G(e);q[f]=a;k&&(a=d.createarray("pano").createItem(a),c?a.scene=b:a.xmlurl=b,a.pageurl=e)}else h("Add Pano Error - Unable to add pano with name ["+a+"]: name, XML URL or Scene name and Page URL must be specified.",3)}function C(a){if(a){var b=t("pano",a);b&&(b=g.parsePath(b.xmlurl||b.scene).toLowerCase(),delete q[b],d.createarray("pano").removeItem(a))}else h("Remove Pano Error - Name must be specified.",3)}function D(){for(var a in q)C(a)}
function E(a,b,c,e,k,f,j){if(a&&e&&k&&(b||f)){j=j||!0;if(f)r[a]=a;else{var m=g.parsePath(b).toLowerCase(),l=p[m];l||(l=p[m]={});l[a]=a}j&&(a=d.createarray("event").createItem(a),c?a.scene=b:a.xmlurl=b,a.target=e,a.data=k,f&&(a.global=f))}else h("Add Event Error - Unable to add event with name ["+a+"]: name, XML URL or Scene name or Global flag, Target element and Tracking data must be specified.",3)}function x(a){if(a){var b=t("event",a);b&&(b.global?delete r[a]:(b=g.parsePath(b.xmlurl||b.scene).toLowerCase(),
delete p[b]),d.createarray("event").removeItem(a))}else h("Remove Event Error - Name must be specified.",3)}function F(){for(var a in r)x(a);for(a in p)x(a)}function z(a,b){a?(a=s?s+a:a,a=G(a),v("_trackPageview",a),m&&h("Track Pageview: "+a)):h("Track Page View Error - The URL must be specified.",3)}function v(){if(0<arguments.length){for(var a=[],b=0;b<arguments.length;b++)a.push(arguments[b]);y=y||window._gaq;y.push(a)}}function A(a){var b=t("event",a);a=b.target;var c=b.data;a&&c&&(b=g.get(a),
b=!b?"":b,c=l+".trackevent("+c+")",-1==b.indexOf(c)&&(b.length&&";"!=b.charAt(b.length-1)&&(b=b.concat(";")),b=b.concat(c,";"),g.set(a,b)))}function G(a){a="/"!=a.charAt(0)?"/"+a:a;"/"!=a.charAt(a.length-1)&&(a+="/");return a}function H(a){return(a=d.createarray(a))?a.count:0}function t(a,b){var c=d.createarray(a);return b?c.getItem(b):null}function n(a){return"string"==typeof a||a instanceof String?a&&"true"==a.toLowerCase()?!0:!1:a}function f(a){return a&&a.length&&"null"!=a.toLowerCase()?a:null}
function h(a,b,c){b=b||1;(c||3==b)&&g.call("showlog();");g.trace(b,I+": "+a)}var I="Google Analytics Plugin",w="1.3 (BETA 1)",u=!1,q=null,r=null,p=null,y=null,j=null,m=null,s=null,g=null,d=null,l=null;this.registerplugin=function(a,b,c){g=a;l=b;d=c;if("1.0.8.14">g.version||"2011-05-20">g.build)g.trace(3,I+" - too old krpano version (min. 1.0.8.14 required)");else{h("v"+w);g.set(l+".keep",!0);g.set(l+".visible",!1);d.registerattribute("debug",!1,K,L);d.registerattribute("account",null,M,N);d.registerattribute("prefix",
null,O,P);d.registerattribute("version",w,J,Q);q={};a=H("pano");for(var e,f=0;f<a;f++)b=d.createarray("pano").getItem(f),c=b.xmlurl||b.scene,e=b.scene?!0:!1,B(b.name,c,e,b.pageurl,!1);p={};r={};a=H("event");for(var n,f=0;f<a;f++)b=d.createarray("event").getItem(f),c=b.xmlurl||b.scene,e=b.scene?!0:!1,n=b.global,E(b.name,c,e,b.target,b.data,n,!1);j?(m&&h("Account: "+j),d.update=R,d.addpano=S,d.removepano=T,d.removeallpanos=U,d.addevent=V,d.removeevent=W,d.removeallevents=X,d.trackpageview=Y,d.trackevent=
Z,g.set("events[analytics].keep",!0),g.set("events[analytics].onxmlcomplete",l+".update();"),a=document.createElement("script"),a.type="text/javascript",a.text="var _gaq = _gaq || []; _gaq.push(['_setAccount','"+j+"']);",document.head.appendChild(a),a=document.createElement("script"),a.type="text/javascript",a.async=!0,a.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js",b=document.getElementsByTagName("script")[0],b.parentNode.insertBefore(a,b),u=
!0):h("Google Analytics account must be specified.",3)}};this.unloadplugin=function(){g.set("events[analytics].keep",!1);g.set("events[analytics].onxmlcomplete",null);D();F();d=l=g=urlToPanoIDMapping=globalEventsMapping=eventsMapping=null}};