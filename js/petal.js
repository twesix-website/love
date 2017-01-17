function Petal(stretch_a, stretch_b, start_angle, angle, grow_factor, bloom)
{
    this.stretch_a = stretch_a;
    this.stretch_b = stretch_b;
    this.start_angle = start_angle;
    this.angle = angle;
    this.bloom = bloom;
    this.grow_factor = grow_factor;
    this.r = 1;
    this.is_finished = false;
    //this.tanAngleA = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
    //this.tanAngleB = Garden.random(-Garden.degrad(Garden.options.tanAngle), Garden.degrad(Garden.options.tanAngle));
}
Petal.prototype=
    {
        draw:function()
        {
            var ctx = this.bloom.garden.ctx;
            var v1, v2, v3, v4;
            v1 = new Vector(0, this.r).rotate(Garden.deg_to_rad(this.start_angle));
            v2 = v1.clone().rotate(Garden.deg_to_rad(this.angle));
            v3 = v1.clone().mult(this.stretch_a); //.rotate(this.tanAngleA);
            v4 = v2.clone().mult(this.stretch_b); //.rotate(this.tanAngleB);
            ctx.strokeStyle = this.bloom.c;
            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.bezierCurveTo(v3.x, v3.y, v4.x, v4.y, v2.x, v2.y);
            ctx.stroke();
        },
        render: function ()
        {
            if (this.r <= this.bloom.r)
            {
                this.r += this.grow_factor; // / 10;
                this.draw();
            }
            else
            {
                this.is_finished = true;
            }
        }
    };