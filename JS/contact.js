//  🔴 contacto 🔴 

const abrir = document.getElementById("burguer_button");

const desplegable = document.getElementById("contMenuResp");
const invertlogo = document.getElementById("invertResp");

const line_one = document.getElementById("line_one");
const line_two = document.getElementById("line_two");

const scroll_one = document.getElementById("bodyAnimate_resto");
const scroll_two = document.getElementById("bodyAnimate");

const header_one = document.getElementById("menu_scroll");

// console.log(abrir);
abrir.addEventListener("click", () => {

	desplegable.classList.toggle("activeMenu")
	invertlogo.classList.toggle("activeInvert")
	abrir.classList.toggle("activeInvert")

	line_one.classList.toggle("activeCerrar_one")
	line_two.classList.toggle("activeCerrar_two")

	scroll_one.classList.toggle("desactiveScroll")
	scroll_two.classList.toggle("desactiveScroll")

	header_one.classList.toggle("desactiveMenuScroll")
});

