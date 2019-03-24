var con=(function(){ return function(msg){ console.log(msg); } })();
function TouchBt(){
	this.canvas=null;
	this.ctx=null;
	this.bg_r=40;
	this.bg_c="#42c6ff";
	this.position_bg=null;
	this.th_r=null;
	this.th_c="#ffffff";
	this.position_th=null;

	this.__init=function (x,y,canvas){
		this.canvas=canvas;
		this.ctx =this.canvas.getContext("2d");
		this.canvas.style.position="fixed";
		this.canvas.height=this.canvas.width=this.bg_r*2;
		this.canvas.style.top=x+"px";
		this.canvas.style.left=y+"px";
		this.canvas.style.background="#ffffff";
	}
	this.init=function (x,y,canvas){
			this.__init(x,y,canvas);
			this.th_r=this.bg_r/2;
			this.position_bg={x:40,y:40};
			this.position_th={x:40,y:40};
			this.show();
			this.bindevent();
	}
	this.show=function (){
		this.ctx.beginPath();
		this.ctx.arc(this.position_bg.x,this.position_bg.y,this.bg_r,0,2*Math.PI);
		this.ctx.fillStyle=this.bg_c;
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.arc(this.position_th.x,this.position_th.y,this.th_r,0,2*Math.PI);
		this.ctx.fillStyle=this.th_c;
		this.ctx.fill();
	}
	this.touch=function (x2,y2){
		if(x2==this.position_bg.x && y2==this.position_bg.y){
			this.position_th={x:this.position_bg.x,y:this.position_bg.y};

		}else{
			m=Math.pow;
			X=x2-this.position_bg.x;
			Y=y2-this.position_bg.y;
			R=this.th_r;
			J=m(m(X,2)+m(Y,2),0.5);
			x=X*R/J+this.position_bg.x;
			y=Y*R/J+this.position_bg.y;
			this.position_th={x:x,y:y};
		}
		this.show();
	}
	this.bindevent=function(){
		touchbt=this;
		(function(touchbt){
			touchbt.canvas.onmousedown=function(e){
				var m=Math.pow;
				if(m(e.layerX-touchbt.position_bg.x,2)+m(e.layerY-touchbt.position_bg.y,2)<m(touchbt.bg_r,2)){
					touchbt.touch(e.layerX,e.layerY);
					touchbt.canvas.onmousemove=function(e){
						touchbt.touch(e.layerX,e.layerY);
					}
				}
			}
			touchbt.canvas.onmouseup=function(e){
				touchbt.canvas.onmousemove=null;
				touchbt.touch(touchbt.position_bg.x,touchbt.position_bg.y);
			}
		})(touchbt)

	}

}
var canvas1 = document.getElementById("cas1");
t1=new TouchBt();
t1.init(40,40,canvas1);
var canvas2 = document.getElementById("cas2");
t2=new TouchBt();
t2.init(500,500,canvas2);
