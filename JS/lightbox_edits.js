//          🔴 LIGHTBOX 🔴

let llistaImgGal = document.getElementsByClassName("imgGal");
let LBcounter;

function readyLightbox(){

	for (let i = 0; i < llistaImgGal.length; i++) {
		llistaImgGal[i].addEventListener("click", function(){showLB(i);});
	}
}

function showLB(i){

	document.getElementById("filterOpac").style.display = "flex";
	document.documentElement.style.overflow="hidden";
	document.getElementById("modalLightbox").style.display = "flex";

// al hacer click en una imagen, src lo rellena con esa imagen
//	document.getElementById("LBImage").src = event.currentTarget.src;
	
	document.getElementById("LBImage").src = llistaImgGal[i].src;

	LBcounter = i;

	console.log(i);
	console.log(LBcounter);
}

function hideLB(){

	document.getElementById("filterOpac").style.display = "none";
	document.documentElement.style.overflow="auto";
	document.getElementById("modalLightbox").style.display = "none";
	
}

// flecha hacia delante
function LBNextImg(){
	LBcounter++;

	if (LBcounter>llistaImgGal.length-1) {
		LBcounter=0;
	}

	document.getElementById("LBImage").src = llistaImgGal[LBcounter].src;
}

// flecha hacia atrás
function LBPrevImg(){
	LBcounter--;

	if (LBcounter<0) {
		LBcounter=llistaImgGal.length-1;
	}

	document.getElementById("LBImage").src = llistaImgGal[LBcounter].src;
}