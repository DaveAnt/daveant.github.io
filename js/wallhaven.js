var wallhaven = document.getElementById("cover");
if (wallhaven != null) {
	var wIdx = localStorage.getItem("wallpaperIdx");
	if(wIdx == null) wIdx = 0;wIdx = parseInt(wIdx);
	wallhaven.src = WallpaperDefine[wIdx];
}

$('.forward-btn').click(function (){
	-- wIdx;if (wIdx < 0) wIdx = 34;
	wallhaven.src = WallpaperDefine[wIdx];
	localStorage.setItem("wallpaperIdx",wIdx+"");
});

$('.next-btn').click(function (){
	++ wIdx;if (wIdx > 34) wIdx = 0;
	wallhaven.src = WallpaperDefine[wIdx];
	localStorage.setItem("wallpaperIdx",wIdx+"");
});

$('#search-input-wrap').click(function() {
	$('.ins-search').addClass('show')
})

if(!isMobile)
{
	var oHead = document.getElementsByTagName('Body').item(0); 
	var sakuraScript= document.createElement("script"); 
	sakuraScript.type = "text/javascript"; 
	sakuraScript.src="/js/sakura.js";
	oHead.appendChild(sakuraScript);

	var fontAnimateScript= document.createElement("script"); 
	fontAnimateScript.type = "text/javascript"; 
	fontAnimateScript.src="/js/fontAnimate.js"; 
	oHead.appendChild(fontAnimateScript); 
	$('.waifu').show();
	liveAwake();
}