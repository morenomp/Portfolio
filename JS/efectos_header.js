//  🔴 animación scroll header 🔴

window.onscroll = function(){
	hideShowOnScroll()
};

function hideShowOnScroll(){

	console.log(document.documentElement.scrollTop);

	if (document.documentElement.scrollTop < 80) {

		document.getElementById("menu_scroll").style.backgroundColor  = "transparent";
		document.getElementById("menu_scroll").style.backdropFilter  = "blur(0px)";
		document.getElementById("menu_scroll").style.borderBottom  = "0px solid #cdcdcd1a";
	}

	else{

		document.getElementById("menu_scroll").style.backgroundColor  = "#2c2b30d9";
		document.getElementById("menu_scroll").style.backdropFilter  = "blur(9px)";
		document.getElementById("menu_scroll").style.borderBottom  = "1px solid #cdcdcd1a";
	}

};
