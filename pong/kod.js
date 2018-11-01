
var canvas;
var graphics;
var boll;

var spade;



var TO_RADIANS = Math.PI/180;

	function init()
	{
		
		canvas = document.getElementById("rityta");
		spade = new Rack(10,50);
		document.onkeydown=tangent;
		document.onkeyup=stopp;
		canvas.onmousedown=musen;
		graphics = canvas.getContext("2d");
		var bild = new Image();
		bild.src="boll.png";
		boll = new Boll(bild,100,100);
		
		drawAnimation();
	}
	
	function drawAnimation()
	{
		graphics.fillStyle = "#000000";
		graphics.strokeStyle="#FFFFFF";
		graphics.fillRect(0,0,canvas.width, canvas.height);
		graphics.beginPath();
		graphics.moveTo(canvas.width/2,0);
		graphics.lineTo(canvas.width/2,canvas.height);
		graphics.stroke();
		spade.draw(graphics);
		boll.draw(graphics);
		requestAnimationFrame(drawAnimation);
	}
	
	window.requestAnimationFrame(init);
	
	
	function stopp(e)
	{
		spade.stop();
	}
	
	function tangent(e)
	{
		spade.start(e.keyCode);
		
	}
	
	
	
	function musen(e)
	{
		
	}

// Klassen Rack
class Rack{
		
			constructor(x,y)
			{
				this.x = x;
				this.y = y;
				this.width = 10;
				this.height = 120;
				this.speedo = 2.5;
				this.moving = false;
				this.direction = 1;
			}
			
			
			moveMe()
			{
				if(this.direction == 1)
				{
					this.y+=this.speedo;
				}
				else
				{
					this.y-=this.speedo;
				}
			}
			
			
			draw(ctx)
			{
				if(this.moving)
					this.moveMe();
				ctx.fillStyle = "#0000FF";
				ctx.fillRect(this.x,this.y,this.width,this.height);
			}
			
			start(dir)
			{
				
				if(dir==38)
						this.direction=0;
				if(dir==40)
						this.direction=1;
				this.moving = true;
				
			}
			
			stop()
			{
				this.moving=false;
			}
}
	
	
// Klassen Boll		

class Boll
{
	
	constructor(bild,x,y)
	{
		this.bild = bild;
		
		this.x = x;
		
		this.y = y;
		this.x_velocity=3.2;
		this.y_velocity=3.2;
		this.angle = 10;
		this.vrid = 0;
	}
	
	hitByBoll(b)
	{
		let dx = this.x - b.x;
		let dy = this.y - b.y;
		let radie = this.bild.width/2;
		let distance = Math.sqrt((dx*dx)+(dy*dy));
		
		if(distance < radie*2)
		{
			this.angle-=45;
			b.angle -=45;
		}
		
	}
	
	
	
	
	
	
	moveMe()
	{
		
		this.x += this.x_velocity * Math.cos(this.angle * TO_RADIANS);
		this.y += this.y_velocity * Math.sin(this.angle * TO_RADIANS);
		
		let lx = this.x - this.bild.width/2;
		let rx = this.x + this.bild.width/2;
		let ly = this.y - this.bild.height/2;
		let ry = this.y + this.bild.height/2;
		
			if(lx < 0 || rx > canvas.width)
			{
						this.x_velocity*=-1;
								return this.moveMe();
			}
			if(ly<0 || ry > canvas.height)
			{
						this.y_velocity*=-1;
								return this.moveMe();
			}
			
				return true;
	}
	
	draw(ctx)
	{
		
		while(true!=this.moveMe());
		ctx.save();
		ctx.translate(this.x, this.y);
	
		ctx.rotate(this.vrid);
		this.vrid ++;
		//= Math.PI/30;
		ctx.translate(-this.bild.width/2, - this.bild.height/2);
		ctx.drawImage(this.bild,0,0);
		ctx.restore();
		
	}
	
}


Math.degrees = function(radians)
{
	return radians * 180/ Math.PI;
}		
				
	
	
	
	
	
	
	
	
	
	