function Bloom(p, r, c, pc, garden)
{
    this.p = p;
    this.r = r;
    this.c = c;
    this.pc = pc;
    this.petals = [];
    this.garden = garden;
    this.init();
    this.garden.add_bloom(this);
}
Bloom.prototype=
    {
        draw: function ()
        {
            var p, is_finished = true;
            this.garden.ctx.save();
            this.garden.ctx.translate(this.p.x, this.p.y);
            for (var i = 0; i < this.petals.length; i++)
            {
                p = this.petals[i];
                p.render();
                is_finished *= p.is_finished;
            }
            this.garden.ctx.restore();
            if (is_finished == true)
            {
                this.garden.remove_bloom(this);
            }
        },
        init: function ()
        {
            var angle = 360 / this.pc;
            var start_angle = Garden.random_int(0, 90);
            for (var i = 0; i < this.pc; i++)
            {
                this.petals.push
                (
                    new Petal
                    (
                        Garden.random
                        (
                            Garden.options.petal_stretch.min,
                            Garden.options.petal_stretch.max
                        ),
                        Garden.random
                        (
                            Garden.options.petal_stretch.min,
                            Garden.options.petal_stretch.max
                        ),
                        start_angle + i * angle,
                        angle,
                        Garden.random
                        (
                            Garden.options.grow_factor.min,
                            Garden.options.grow_factor.max
                        ),
                        this
                    )
                );
            }
        }
    };