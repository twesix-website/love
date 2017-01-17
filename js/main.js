var $garden=$("#garden");
document.getElementById('garden').width=document.body.clientWidth;
document.getElementById('garden').height=document.body.clientHeight;
var offset_x = $garden.width() / 2;
var offset_y = $garden.height() / 2-60;
var heart_zoom_ratio=parseInt(offset_y/17);

$("words").css('font-size',offset_y/20);
var together = new Date();
together.setFullYear(2017, 0, 0);
together.setHours(0);
together.setMinutes(0);
together.setSeconds(0);
together.setMilliseconds(0);

setTimeout(function()
{
    start_heart_animation();
}, 20000);

time_elapse(together);
setInterval(function()
{
    time_elapse(together);
}, 500);

$("#code").typewriter();
