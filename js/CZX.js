
!function e(t,o,n){function a(r,l){if(!o[r]){if(!t[r]){var m="function"==typeof require&&require;if(!l&&m)return m(r,!0);if(i)return i(r,!0);var s=new Error("Cannot find module '"+r+"'");throw s.code="MODULE_NOT_FOUND",s}var u=o[r]={exports:{}};t[r][0].call(u.exports,function(e){var o=t[r][1][e];return a(o?o:e)},u,u.exports,e,t,o,n)}return o[r].exports}for(var i="function"==typeof require&&require,r=0;r<n.length;r++)a(n[r]);return a}({1:[function(e,t,o){},{}],2:[function(e,t,o){function n(e,t){return void 0===e||"string"==typeof e&&e.indexOf(t)!==-1}function a(e,t){if(e.scaleAxes&&e.rangeMax&&e.rangeMax[e.scaleAxes]){var o=e.rangeMax[e.scaleAxes];t>o&&(t=o)}return t}function i(e,t){if(e.scaleAxes&&e.rangeMin&&e.rangeMin[e.scaleAxes]){var o=e.rangeMin[e.scaleAxes];t<o&&(t=o)}return t}function r(e,t,o,n){var r=e.chart.data.labels,l=e.minIndex,m=r.length-1,s=e.maxIndex,u=n.sensitivity,c=e.isHorizontal()?e.left+e.width/2:e.top+e.height/2,d=e.isHorizontal()?o.x:o.y;D.zoomCumulativeDelta=t>1?D.zoomCumulativeDelta+1:D.zoomCumulativeDelta-1,Math.abs(D.zoomCumulativeDelta)>u&&(D.zoomCumulativeDelta<0?(d<=c?l<=0?s=Math.min(m,s+1):l=Math.max(0,l-1):d>c&&(s>=m?l=Math.max(0,l-1):s=Math.min(m,s+1)),D.zoomCumulativeDelta=0):D.zoomCumulativeDelta>0&&(d<=c?l=l<s?l=Math.min(s,l+1):l:d>c&&(s=s>l?s=Math.max(l,s-1):s),D.zoomCumulativeDelta=0),e.options.ticks.min=i(n,r[l]),e.options.ticks.max=a(n,r[s]))}function l(e,t,o,n){var r,l,m=e.options;e.isHorizontal()?(r=e.right-e.left,l=(o.x-e.left)/r):(r=e.bottom-e.top,l=(o.y-e.top)/r);var s=1-l,u=r*(t-1),c=u*l,d=u*s;m.time.min=i(n,e.getValueForPixel(e.getPixelForValue(e.firstTick)+c)),m.time.max=a(n,e.getValueForPixel(e.getPixelForValue(e.lastTick)-d))}function m(e,t,o,n){var r=e.max-e.min,l=r*(t-1),m=e.isHorizontal()?o.x:o.y,s=(e.getValueForPixel(m)-e.min)/r,u=1-s,c=l*s,d=l*u;e.options.ticks.min=i(n,e.min+c),e.options.ticks.max=a(n,e.max-d)}function s(e,t,o,n){var a=F[e.options.type];a&&a(e,t,o,n)}function u(e,t,o){var a=e.chartArea;o||(o={x:(a.left+a.right)/2,y:(a.top+a.bottom)/2});var i=e.options.zoom;if(i&&z.getValueOrDefault(i.enabled,y.zoom.enabled)){var r=z.getValueOrDefault(e.options.zoom.mode,y.zoom.mode);i.sensitivity=z.getValueOrDefault(e.options.zoom.sensitivity,y.zoom.sensitivity),z.each(e.scales,function(e,a){e.isHorizontal()&&n(r,"x")?(i.scaleAxes="x",s(e,t,o,i)):!e.isHorizontal()&&n(r,"y")&&(i.scaleAxes="y",s(e,t,o,i))}),e.update(0)}}function c(e,t,o){var n,r=e.chart.data.labels,l=r.length-1,m=Math.max(e.ticks.length-(e.options.gridLines.offsetGridLines?0:1),1),s=o.speed,u=e.minIndex,c=Math.round(e.width/(m*s));D.panCumulativeDelta+=t,u=D.panCumulativeDelta>c?Math.max(0,u-1):D.panCumulativeDelta<-c?Math.min(l-m+1,u+1):u,D.panCumulativeDelta=u!==e.minIndex?0:D.panCumulativeDelta,n=Math.min(l,u+m-1),e.options.ticks.min=i(o,r[u]),e.options.ticks.max=a(o,r[n])}function d(e,t,o){var n=e.options;n.time.min=i(o,e.getValueForPixel(e.getPixelForValue(e.firstTick)-t)),n.time.max=a(o,e.getValueForPixel(e.getPixelForValue(e.lastTick)-t))}function p(e,t,o){var n=e.options.ticks,r=e.start,l=e.end;n.reverse?(n.max=e.getValueForPixel(e.getPixelForValue(r)-t),n.min=e.getValueForPixel(e.getPixelForValue(l)-t)):(n.min=e.getValueForPixel(e.getPixelForValue(r)-t),n.max=e.getValueForPixel(e.getPixelForValue(l)-t)),n.min=i(o,n.min),n.max=a(o,n.max)}function f(e,t,o){var n=_[e.options.type];n&&n(e,t,o)}function v(e,t,o){var a=e.options.pan;if(a&&z.getValueOrDefault(a.enabled,y.pan.enabled)){var i=z.getValueOrDefault(e.options.pan.mode,y.pan.mode);a.speed=z.getValueOrDefault(e.options.pan.speed,y.pan.speed),z.each(e.scales,function(e,r){e.isHorizontal()&&n(i,"x")&&0!==t?(a.scaleAxes="x",f(e,t,a)):!e.isHorizontal()&&n(i,"y")&&0!==o&&(a.scaleAxes="y",f(e,o,a))}),e.update(0)}}function g(e){var t=e.scales;for(var o in t){var n=t[o];if(!n.isHorizontal())return n}}var x=e("hammerjs");x="function"==typeof x?x:window.Hammer;var h=e("chart.js");h="function"==typeof h?h:window.Chart;var z=h.helpers,D=h.Zoom=h.Zoom||{},F=D.zoomFunctions=D.zoomFunctions||{},_=D.panFunctions=D.panFunctions||{},y=D.defaults={pan:{enabled:!0,mode:"xy",speed:20,threshold:10},zoom:{enabled:!0,mode:"xy",sensitivity:3}};D.zoomFunctions.category=r,D.zoomFunctions.time=l,D.zoomFunctions.linear=m,D.zoomFunctions.logarithmic=m,D.panFunctions.category=c,D.panFunctions.time=d,D.panFunctions.linear=p,D.panFunctions.logarithmic=p,D.panCumulativeDelta=0,D.zoomCumulativeDelta=0;var M={afterInit:function(e){z.each(e.scales,function(e){e.originalOptions=JSON.parse(JSON.stringify(e.options))}),e.resetZoom=function(){z.each(e.scales,function(e,t){var o=e.options.time,n=e.options.ticks;o&&(delete o.min,delete o.max),n&&(delete n.min,delete n.max),e.options=z.configMerge(e.options,e.originalOptions)}),z.each(e.data.datasets,function(e,t){e._meta=null}),e.update()}},beforeInit:function(e){e.zoom={};var t=e.zoom.node=e.chart.ctx.canvas,o=e.options,n=z.getValueOrDefault(o.pan?o.pan.threshold:void 0,D.defaults.pan.threshold);if(o.zoom&&o.zoom.drag?(o.zoom.mode="x",e.zoom._mouseDownHandler=function(t){e.zoom._dragZoomStart=t},t.addEventListener("mousedown",e.zoom._mouseDownHandler),e.zoom._mouseMoveHandler=function(t){e.zoom._dragZoomStart&&(e.zoom._dragZoomEnd=t,e.update(0)),e.update(0)},t.addEventListener("mousemove",e.zoom._mouseMoveHandler),e.zoom._mouseUpHandler=function(t){if(e.zoom._dragZoomStart){var o=e.chartArea,n=g(e),a=e.zoom._dragZoomStart,i=a.target.getBoundingClientRect().left,r=Math.min(a.clientX,t.clientX)-i,l=Math.max(a.clientX,t.clientX)-i,m=l-r,s=o.right-o.left,c=1+(s-m)/s;m>0&&u(e,c,{x:m/2+r,y:(n.bottom-n.top)/2}),e.zoom._dragZoomStart=null,e.zoom._dragZoomEnd=null}},t.addEventListener("mouseup",e.zoom._mouseUpHandler)):(e.zoom._wheelHandler=function(t){var o=t.target.getBoundingClientRect(),n=t.clientX-o.left,a=t.clientY-o.top,i={x:n,y:a};t.deltaY<0?u(e,1.1,i):u(e,.909,i),t.preventDefault()},t.addEventListener("wheel",e.zoom._wheelHandler)),x){var a=new x.Manager(t);a.add(new x.Pinch),a.add(new x.Pan({threshold:n}));var i,r=function(t){var o=1/i*t.scale;u(e,o,t.center),i=t.scale};a.on("pinchstart",function(e){i=1}),a.on("pinch",r),a.on("pinchend",function(e){r(e),i=null,D.zoomCumulativeDelta=0});var l=null,m=null,s=!1,c=function(t){if(null!==l&&null!==m){s=!0;var o=t.deltaX-l,n=t.deltaY-m;l=t.deltaX,m=t.deltaY,v(e,o,n)}};a.on("panstart",function(e){l=0,m=0,c(e)}),a.on("panmove",c),a.on("panend",function(e){l=null,m=null,D.panCumulativeDelta=0,setTimeout(function(){s=!1},500)}),e.zoom._ghostClickHandler=function(e){s&&(e.stopImmediatePropagation(),e.preventDefault())},t.addEventListener("click",e.zoom._ghostClickHandler),e._mc=a}},beforeDatasetsDraw:function(e){var t=e.chart.ctx,o=e.chartArea;if(t.save(),t.beginPath(),e.zoom._dragZoomEnd){var n=g(e),a=e.zoom._dragZoomStart,i=e.zoom._dragZoomEnd,r=a.target.getBoundingClientRect().left,l=Math.min(a.clientX,i.clientX)-r,m=Math.max(a.clientX,i.clientX)-r,s=m-l;t.fillStyle="rgba(225,225,225,0.3)",t.lineWidth=5,t.fillRect(l,n.top,s,n.bottom-n.top)}t.rect(o.left,o.top,o.right-o.left,o.bottom-o.top),t.clip()},afterDatasetsDraw:function(e){e.chart.ctx.restore()},destroy:function(e){if(e.zoom){var t=e.options,o=e.zoom.node;t.zoom&&t.zoom.drag?(o.removeEventListener("mousedown",e.zoom._mouseDownHandler),o.removeEventListener("mousemove",e.zoom._mouseMoveHandler),o.removeEventListener("mouseup",e.zoom._mouseUpHandler)):o.removeEventListener("wheel",e.zoom._wheelHandler),x&&o.removeEventListener("click",e.zoom._ghostClickHandler),delete e.zoom;var n=e._mc;n&&(n.remove("pinchstart"),n.remove("pinch"),n.remove("pinchend"),n.remove("panstart"),n.remove("pan"),n.remove("panend"))}}};t.exports=M,h.pluginService.register(M)},{"chart.js":1,hammerjs:1}]},{},[2]);