import { monthsUntil, untilText } from "./life.js";

export const SCALE_MONTHS = 24;

document.querySelectorAll(".countdown[data-until]").forEach((node) => {
  const months = monthsUntil(node.dataset.until);
  if (!(months >= 0)) {
    node.hidden = true;
    return;
  }
  node.querySelector(".remaining").textContent = ` · ${untilText(months, document.documentElement.lang)}`;
  node.querySelector(".scale").style.setProperty("--months", Math.min(months, SCALE_MONTHS));
});
