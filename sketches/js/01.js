FastClick.attach(document.body)


var width = 1000
var height = 1000


var margin = 2
var svg = $('svg')
var process
var delay
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
    svg.append( r )
}


function toggle(){

    var vis = (running) ? 'visible' : 'hidden'
    svg.find('rect').remove()
    $('#overlay').css('visibility', vis)
    clearInterval(process)
    clearTimeout(delay)
    running = !running
    
    if(running){
        init()
    }
}

function init(){
    svg.find('rect').remove()
    
    var w = width+margin/2
    
    addRect(margin/2, margin/2, width-margin, height-margin)
    if(!window.isMobile){
        addRect(margin/2+w, margin/2, width-margin, height-margin)
        addRect(margin/2+w*2, margin/2, width-margin, height-margin)
    }
    
    process = setInterval(divide, 20)
}


function divide(){
    var list = svg.find('rect')
    var index = parseInt(Math.random()*list.length)
    var o = $(list[index])
    
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
    
    if(list.length>30 && Math.random()>.9){
        var index = parseInt(Math.random()*list.length)
        $(list[index]).remove()
    }
    
    if(list.length>350){
        clearInterval(process)
        delay = setTimeout(init, 2000)
    }
}

$('body').on('click', toggle)
