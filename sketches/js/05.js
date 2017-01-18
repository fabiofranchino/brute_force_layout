FastClick.attach(document.body)

var width = 1000
var height = 1000

var svg = $('svg')
var process
var running = false
var prevPos

if(window.isMobile){
    svg.attr('viewBox', '0 0 1000 1000')
}

var canvas = document.getElementById('buffer');
var ctx = canvas.getContext('2d');

var img = new Image();
img.addEventListener('load', function(){
    ctx.drawImage(img, 0,0, 1000,333)
}, false);
img.src = 'images/sparrow.jpg';




var circle = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'))

function addCircle(x, y, r){
    var col = ctx.getImageData(x/3, y/3, 1, 1).data
    var fill = 'rgb('+col[0]+','+col[1]+','+col[2]+')'
    
    var c = circle.clone()
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', 0)
                .attr('fill', fill)
                .css('pointer-events', 'none')
    svg.append( c )
    
    TweenMax.to(c, .75, {attr:{r:r}, ease:Expo.easeInOut, onComplete:function(){
        c.css('pointer-events', 'auto')
    }})
}



function toggle(){
    var vis = (running) ? 'visible' : 'hidden'
    svg.find('circle').remove()
    $('#overlay, #overlay2, #buffer').css('visibility', vis)
    running = !running
    
    if(running){
        init()
        $('body').on('mousemove', divide)
        document.addEventListener('touchmove', divide)
    }else{
        $('body').off('mousemove', divide)
        document.removeEventListener('touchmove', divide)
    }
}

function init(){
    var r = width/2
    
    addCircle(r, r, r)
    if(!window.isMobile){
        addCircle(r*3, r, r)
        addCircle(r*5, r, r)
    }
}


function divide(e){
    e.preventDefault();
    
    var t = $(e.target)
    var o = (t.get(0).tagName === 'circle') ? t : null
        
    if(!o) return;
    
    var r = +o.attr('r')/2
    
    if(r <= 2) return
    
    for(var i=0; i<4; i++){
        
        var x = +o.attr('cx')
        var y = +o.attr('cy')
        
        if(i==0){
            x -= r
            y -= r
        }
        if(i==1){
            x += r
            y -= r
        }
        if(i==2){
            x -= r
            y += r
        }
        if(i==3){
            x += r
            y += r
        }
        addCircle(x, y, r)
    }
    
    o.remove()
    
}

$('body').on('click', toggle)


    

