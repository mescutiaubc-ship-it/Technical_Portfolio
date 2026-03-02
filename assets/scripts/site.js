// /scripts/site.js
document.addEventListener("DOMContentLoaded", () => {
  // Click-to-play video tiles (YouTube embeds)
  document.querySelectorAll(".video-tile").forEach((tile) => {
    const overlay = tile.querySelector(".play-overlay");
    if (!overlay) return;

    overlay.addEventListener("click", () => {
      const src = tile.getAttribute("data-embed");
      if (!src) return;

      // prevent double inject
      if (tile.querySelector("iframe")) return;

      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.title = "Embedded video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      tile.appendChild(iframe);
      tile.classList.add("is-playing");
    });
  });

  // Footer year (only if element exists on that page)
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});