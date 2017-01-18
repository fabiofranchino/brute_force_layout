/*
Simple jQuery extension to allow an easy creation of SVG elements ready to be used with jQuery methods.
i.e.: 
var rect = svg.svgElement('rect')
                .attr('width', 100)
                
$('svg').append(rect)
*/
;(function($){
    $.fn.extend({
      svgElement: function(param) {
          var el = document.createElementNS('http://www.w3.org/2000/svg', param)
          return $(el)
      }
    });
})(jQuery)
