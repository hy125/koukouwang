require.config({
	baseUrl : "/",
	paths : { // 短名称
		jquery : "lib/jquery/jquery-1.12.4.min",
		load : "js/loadHeaderAndFooter",
		template : "lib/artTemplate/template-web",
		cookie : "lib/jquery-plugins/jquery.cookie",
		xm_carousel: "lib/jquery-plugins/xm_carousel/jquery.xm_carousel",
		fly : "lib/jquery-plugins/jquery.fly.min",
		zoom : "lib/jquery-plugins/jquery.elevateZoom-3.0.8.min"
	},
	shim : {
		xm_carousel : {
			deps : ["jquery"]
		},
		fly : {
			deps : ["jquery"]
		},
		zoom : {
			deps : ["jquery"]
		}
	}
});
