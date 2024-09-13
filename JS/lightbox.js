//          🔴 CARRULES VERTICAL 🔴

function readyCarrusel(){

	let thumbnailsCarrusel = document.getElementsByClassName("thumbnailsCaqui");

	for (let i = 0; i < thumbnailsCarrusel.length; i++) {
		thumbnailsCarrusel[i].addEventListener("click", setBigImage);
	}
}

function setBigImage(){
	// console.log(event.currentTarget.src);
	document.getElementById("bigImage").src = event.currentTarget.src;
}

//          🔴 ASIGNACIÓN DE MODELO 🔴

function firstSetModel(modelActiu){
	let thumbnailsCaqui = document.getElementsByClassName("thumbnailsCaqui");
	
	thumbnailsCaqui[0].style.border = "2.5px solid #000";

}

function setModel(modelActiu){
	let thumbnailsCaqui = document.getElementsByClassName("thumbnailsCaqui");

	for (let i = 0; i < thumbnailsCaqui.length; i++) {

		thumbnailsCaqui[i].style.borderStyle = "none";

	}
	event.currentTarget.style.border = "2.5px solid #000";

}
