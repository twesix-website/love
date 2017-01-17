function Garden(ctx, element)
{
    this.blooms = [];
    this.element = element;
    this.ctx = ctx;
}
Garden.prototype =
    {
        render: function ()
        {
            for (var i = 0; i < this.blooms.length; i++)
            {
                this.blooms[i].draw();
            }
        },
        add_bloom: function (b)
        {
            this.blooms.push(b);
        },
        remove_bloom: function (b)
        {
            var bloom;
            for (var i = 0; i < this.blooms.length; i++)
            {
                bloom = this.blooms[i];
                if (bloom === b) {
                    this.blooms.splice(i, 1);
                    return this;
                }
            }
        },
        create_random_bloom: function (x, y)
        {
            this.create_bloom
            (
                x,
                y,
                Garden.random_int
                (
                    Garden.options.bloom_radius.min,
                    Garden.options.bloom_radius.max
                ),
                Garden.random_rgba
                (
                    Garden.options.color.rmin,
                    Garden.options.color.rmax,
                    Garden.options.color.gmin,
                    Garden.options.color.gmax,
                    Garden.options.color.bmin,
                    Garden.options.color.bmax,
                    Garden.options.color.opacity
                ),
                Garden.random_int
                (
                    Garden.options.petal_count.min,
                    Garden.options.petal_count.max
                )
            );
        },
        create_bloom: function (x, y, r, c, pc)
        {
            new Bloom(new Vector(x, y), r, c, pc, this);
        },
        clear: function ()
        {
            this.blooms = [];
            this.ctx.clearRect(0, 0, this.element.width, this.element.height);
        }
    };

Garden.options=
    {
        petal_count:
            {
                min: 8,
                max: 15
            },
        petal_stretch:
            {
                min: 0.1,
                max: 3
            },
        grow_factor:
            {
                min: 0.1,
                max: 1
            },
        bloom_radius:
            {
                min: 8,
                max: 10
            },
        density: 10,
        grow_speed: 1000 / 60,
        color:
            {
                rmin: 128,
                rmax: 255,
                gmin: 0,
                gmax: 128,
                bmin: 0,
                bmax: 128,
                opacity: 0.1
            },
        tan_angle: 60
    };
Garden.random=function(min, max)
{
    return Math.random() * (max - min) + min;
};
Garden.random_int=function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
Garden.circle = 2 * Math.PI;
Garden.deg_to_rad = function (angle) // 角度转弧度
{
    return Garden.circle / 360 * angle;
};
Garden.rad_to_deg = function (angle) // 弧度转角度
{
    return angle / Garden.circle * 360;
};
Garden.rgba = function (r, g, b, a)
{
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
};
Garden.random_rgba = function (rmin, rmax, gmin, gmax, bmin, bmax, a)
{
    var r = Math.round(Garden.random(rmin, rmax));
    var g = Math.round(Garden.random(gmin, gmax));
    var b = Math.round(Garden.random(bmin, bmax));
    var limit = 5;
    if (Math.abs(r - g) <= limit && Math.abs(g - b) <= limit && Math.abs(b - r) <= limit)
    {
        return Garden.rgba(rmin, rmax, gmin, gmax, bmin, bmax, a);
    }
    else
    {
        return Garden.rgba(r, g, b, a);
    }
};