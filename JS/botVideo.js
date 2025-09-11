const vDefault = document.getElementById("videoDefault");
const vHover = document.getElementById("videoHover");
const vAfter = document.getElementById("videoAfter");
const wrapper = document.getElementById("botWrapper");

wrapper.addEventListener("mouseenter", () => {
  vDefault.style.opacity = 0;
  vHover.style.opacity = 1;
  vHover.currentTime = 0;
  vHover.play();
});

vHover.addEventListener("ended", () => {
  vHover.style.opacity = 0;
  vAfter.style.opacity = 1;
  vAfter.loop = true;
  vAfter.currentTime = 0;
  vAfter.play();
});

wrapper.addEventListener("mouseleave", () => {
  vHover.pause();
  vAfter.pause();
  vHover.style.opacity = 0;
  vAfter.style.opacity = 0;
  vDefault.style.opacity = 1;
  vDefault.play();
});
