function Star() {
	this.x = random(width);
	this.y = random(height);
	this.r = random(2, 5);
	this.color = random(10, 255);
	this.blink = random(1, 2);

	this.display = function() {
		this.color += this.blink;
		fill(this.color);
		ellipse(this.x, this.y, this.r, this.r);
		if (this.color < 10 || this.color > 255) this.blink *= -1;
	}
}
