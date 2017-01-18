FastClick.attach(document.body)

var width = 1000
var height = 1000

var margin = 2
var svg = $('svg')
var process
var running = false

if(window.isMobile){
    svg.attr('viewBox', '0 0 1000 1000')
}

var rect = $(document.createElementNS('http://www.w3.org/2000/svg', 'rect'))

// helpful function to create a new rect out of the above reference
function addRect(x, y, w, h){
    var r = rect.clone()
                .attr('x', x)
                .attr('y', y)
                .attr('width', w)
                .attr('height', h)
                .attr('opacity', Math.random())
    svg.append( r )
}


function toggle(){
    var vis = (running) ? 'visible' : 'hidden'
    svg.find('rect').remove()
    $('#overlay').css('visibility', vis)
    clearInterval(process)
    running = !running
    
    if(running){
        init()
        $('body').on('mousemove touchmove', divide)
        document.addEventListener('touchmove', divide, false)
    }else{
        $('body').off('mousemove touchmove', divide)
        document.removeEventListener('touchmove', divide)
    }
}

function init(){
    var w = width+margin/2
    
    addRect(margin/2, margin/2, width-margin, height-margin)
    if(!window.isMobile){
        addRect(margin/2+w, margin/2, width-margin, height-margin)
        addRect(margin/2+w*2, margin/2, width-margin, height-margin)
    }
}


function divide(e){
    e.preventDefault();
    var t = e.target
    var o = (t.tagName === 'rect') ? $(t) : null
    
    if(!o) return;
    
    var w = +o.attr('width')/2 - margin/2
    var h = +o.attr('height')/2 - margin/2
    
    if(w <= margin) return
    
    for(var i=0; i<4; i++){
        
        var x = +o.attr('x')
        var y = +o.attr('y')
        
        if(i==1){
            x += (w+margin)
        }
        if(i==2){
            y += (h+margin)
        }
        if(i==3){
            x += (w+margin)
            y += (h+margin)
        }
        addRect(x, y, w, h)
    }
    o.remove()
    
    var list = svg.find('rect')
    if(list.length>30 && Math.random()>.9){
        var index = parseInt(Math.random()*list.length)
        $(list[index]).remove()
    }
    
}

$('body').on('click', toggle)
