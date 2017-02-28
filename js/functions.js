var $love_heart = $("#love_heart");
var $garden=$("#garden");

var garden_canvas = $garden[0];
garden_canvas.width = $love_heart.width();
garden_canvas.height = $love_heart.height();

var garden_ctx = garden_canvas.getContext("2d");
garden_ctx.globalCompositeOperation = "lighter";

var garden = new Garden(garden_ctx, garden_canvas);

$(function ()
{
    // renderLoop
    setInterval(function()
    {
        garden.render();
    }, Garden.options.grow_speed);
});

function get_heart_point(angle)
{
    var t = angle / Math.PI; // t=angel/π
    var x = heart_zoom_ratio * (16 * Math.pow(Math.sin(t), 3)); // x=19.5*(16*sin(t)^3)
    // y= - 20( 13cos(t)-5cos(2t)-2cos(3t)-cos(4t) )
    var y = - heart_zoom_ratio * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return [offset_x + x, offset_y + y];
}

function start_heart_animation()
{
    var interval = 25;
    var angle = 10;
    var heart = [];
    var animation_timer = setInterval(function ()
    {
        var bloom = get_heart_point(angle); // [315.97770950766466, 771.466404829018]
        var draw = true;
        for (var i = 0; i < heart.length; i++)
        {
            var p = heart[i];
            var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloom_radius.max * 1.3)
            {
                draw = false;
                break;
            }
        }
        if(draw)
        {
            heart.push(bloom);
            garden.create_random_bloom(bloom[0], bloom[1]);
        }

        if (angle >= 30)
        {
            clearInterval(animation_timer);
            show_words();
        }
        else
        {
            angle += 0.1;
        }

    }, interval);
}

function time_elapse(date)
{
    var current = new Date();
    var seconds = (Date.parse(current) - Date.parse(date))/1000;
    var days = Math.floor(seconds / (3600 * 24));
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    if (hours < 10)
    {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    if (minutes < 10)
    {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }
    var result = "<span class=\"digit\">" + days + "</span> days <span class=\"digit\">" + hours + "</span> hours <span class=\"digit\">" + minutes + "</span> minutes <span class=\"digit\">" + seconds + "</span> seconds";
    $("#elapse_clock").html(result);
}

function show_words()
{

    $('#messages').css('opacity',1);
    setTimeout(function()
    {
        $('#elapse_clock').css('opacity',1);
        setTimeout(function()
        {
            $('#love_you').css('opacity',1);
            // document.getElementById('background_music_1').play();
        },3000);
    },3000);
}
