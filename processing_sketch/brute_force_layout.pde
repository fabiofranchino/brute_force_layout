
ArrayList list = new ArrayList();
float margin = 2;

void setup()
{
    size(1000,1000);
    noStroke();
    
    list.add(new Obj(0,0, width, height));
}


void draw()
{
    background(230);
    
    fill(20);
    noStroke();
    for(int i=0; i<list.size(); ++i)
    {
        Obj o = (Obj)list.get(i);
        o.draw();    
    }
    
    divide();
}



void divide()
{
    int rnd = int(random(list.size()));
    Obj o = (Obj)list.get(rnd);
    if(o.w<=margin*2) return;
    
    for(int i=0; i<4; i++)
    {
        Obj no = new Obj(o.x,o.y,o.w/2, o.h/2);
        
        if(i==1)
        {
            no.x += no.w;
        }
        if(i==2)
        {
            no.y += no.h;
        }
        if(i==3)
        {
            no.x += no.w;
            no.y += no.h;
        }
        
        list.add(no);
    }
    
    list.remove(o);
    
    if(random(1)>.9)
    {
        int ind = int(random(list.size()));
        list.remove(ind);
    }
}


class Obj
{
    float x;
    float y;
    float w;
    float h;
    
    Obj(float _x, float _y, float _w, float _h)
    {
        x=_x;
        y=_y;
        w=_w;
        h=_h;
    }
    
    void draw()
    {
        rect(x+margin/2,y+margin/2,w-margin,h-margin);
    }
    
}
