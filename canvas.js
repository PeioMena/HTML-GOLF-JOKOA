var canvas = document.querySelector("canvas");

canvas.width = 1450
canvas.height = 700

var c = canvas.getContext("2d");
   
//                  x,   y, vx,vy,masa,radius
ball1 = new object(250, 300, 5, 5, 50, 20)
ball2 = new object(500, 600, -5, -5, 100, 40)

function animate() 
{
	requestAnimationFrame(animate);
	c.clearRect(0, 0, 1450, 700);

	ball1.update();
	ball2.update();

	c.stroke()

	if (getDistance(ball1.x, ball1.y, ball2.x, ball2.y)-(ball1.radius+ball2.radius)<= 0)
	{
		resolveCollision(ball1, ball2)
	}

	//console.log(getDistance(ball1.x, ball1.y, ball2.x, ball2.y))
}

	
//objetu borobil bat sortzeko funtzioa
function object(x, y, vx, vy, masa, radius) 
{
	this.x = x;
	this.y = y;
	this.dx = vx;
	this.dy = vy;
	this.radius = radius;
	this.puntoak = 0;
	this.mass = masa;
	

	this.draw = function() 
	{

		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = "black";
		c.fillStyle = "red";
		c.fill();
		c.stroke();
	}

	this.update = function() 
	{
		//pantailatik ez urtetako
		if (this.x + this.radius> canvas.width || this.x-this.radius < 0) 
		{
			this.dx = -this.dx;		
		}

		//pantailatik ez urtetako
		if (this.y + this.radius> canvas.height || this.y-this.radius < 0) 
		{
			this.dy = -this.dy;				
		}
		////////////////


		
		this.x += this.dx;
		this.y += this.dy;

		this.draw();

	}
}

//bi objeturen distantzia lortzeko funtzioa
function getDistance (x1, y1, x2, y2)
{
	var xDistance = x2 - x1;
	var yDistance = y2 - y1;

	return Math.sqrt(Math.pow(xDistance, 2)+Math.pow(yDistance, 2));
}

function rotateX(velocityX, velocityY, angle)
{
	
	rotateVelocity = velocityX * Math.cos(angle) - velocityY * Math.sin(angle);
	
	return rotateVelocity;
}
function rotateY(velocityX, velocityY, angle)
{
	rotateVelocity = velocityX * Math.sin(angle) + velocityY * Math.cos(angle);
	
	return rotateVelocity;
}
//Kolisioa detektau ostean eginbeharreko lortzeko
function resolveCollision(particle, otherParticle)
{
	const xVelocityDiff = particle.dx - otherParticle.dy;
	const yVelocityDiff = particle.dy - otherParticle.dy;
 
	const xDist = otherParticle.x - particle.x;
	const yDist = otherParticle.y - particle.y;

	if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0)
	{
		const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)
	
		const m1 = particle.mass;
		const m2 = otherParticle.mass;


		const u1x = rotateX(particle.dx, particle.dy, angle);
		const u1y = rotateY(particle.dy, particle.dy, angle);

		const u2x = rotateX(otherParticle.dx, otherParticle.dy, angle);
		const u2y = rotateY(otherParticle.dy, otherParticle.dy, angle);


		const v1x = u1x * (m1 - m2) / (m1 + m2) + u2x * 2 * m2 / (m1 + m2);
		const v1y = u1y;

		const v2x = u2x * (m2 - m1) / (m1 + m2) + u1x * 2 * m2 / (m1 + m2);
		const v2y = u2y


		const vFinal1x = rotateX(v1x, v1y, -angle);
		const vFinal1y = rotateY(v1x, v1y, -angle);

		console.log(vFinal1x)
		console.log(vFinal1y)

		const vFinal2x = rotateX(v2x, v2y, -angle);
		const vFinal2y = rotateY(v2x, v2y, -angle);

		console.log(vFinal2x)
		console.log(vFinal2y)

		particle.dx = vFinal1x * 0.8;
		particle.dy = vFinal1y * 0.8;

		otherParticle.dx = vFinal2x * 0.8;
		otherParticle.dy = vFinal2y * 0.8;
	}
}

animate();

