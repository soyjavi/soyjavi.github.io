(function () {
  var root = document.documentElement;
  if (location.hash.length > 1 || navigator.webdriver || !window.matchMedia || typeof WebGL2RenderingContext !== "function") return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(min-height: 520px) and (min-width: 320px)").matches) return;
  root.setAttribute("data-entering", "1");
  window.addEventListener("load", function () {
    setTimeout(function () {
      if (!root.classList.contains("immersive")) root.removeAttribute("data-entering");
    }, 3000);
  });
})();
