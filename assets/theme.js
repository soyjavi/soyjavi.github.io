(function () {
  var root = document.documentElement;
  var colours = { dark: "#0c0c0b", light: "#f3f1ec" };

  var read = function () {
    try {
      var value = localStorage.getItem("theme");
      return value === "light" || value === "dark" ? value : null;
    } catch (error) {
      return null;
    }
  };
  var write = function (value) {
    try {
      localStorage.setItem("theme", value);
    } catch (error) {}
  };
  var current = function () {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  };
  var paint = function () {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", colours[current()]);
  };
  var announce = function () {
    var buttons = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].hidden = false;
      buttons[i].setAttribute("aria-label", buttons[i].getAttribute(current() === "dark" ? "data-to-light" : "data-to-dark"));
    }
    paint();
    dispatchEvent(new Event("themechange"));
  };

  root.setAttribute("data-theme", read() || "dark");
  paint();

  document.addEventListener("click", function (event) {
    var button = event.target.closest && event.target.closest("[data-theme-toggle]");
    if (!button) return;
    var next = current() === "dark" ? "light" : "dark";
    write(next);
    root.setAttribute("data-theme", next);
    announce();
  });
  document.addEventListener("DOMContentLoaded", announce);
})();
