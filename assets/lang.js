(function () {
  var read = function () {
    try {
      return localStorage.getItem("lang");
    } catch (error) {
      return null;
    }
  };
  var write = function (code) {
    try {
      localStorage.setItem("lang", code);
    } catch (error) {}
  };

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[data-lang]");
    if (link) write(link.getAttribute("data-lang"));
  });

  if (location.pathname !== "/") return;
  var entry = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  if (entry && entry.type === "back_forward") return;
  var stored = read();
  var primary = ((navigator.languages && navigator.languages[0]) || navigator.language || "en").slice(0, 2).toLowerCase();
  if ((stored || primary) === "es") location.replace("/es/" + location.search + location.hash);
})();
