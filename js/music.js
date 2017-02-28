var bgm_1=document.getElementById('background_music_1');
var bgm_2=document.getElementById('background_music_2');
var bgm_3=document.getElementById('background_music_3');

bgm_1.addEventListener('ended',function()
{
    bgm_2.play();
});

bgm_2.addEventListener('ended',function()
{
    bgm_3.play();
});

bgm_3.addEventListener('ended',function()
{
    bgm_1.play();
});