async function fetchJSON(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function projectCard(p) {
  const article = el("article", "card project-card");

  const img = document.createElement("img");
  img.className = "project-img";
  img.src = p.image;
  img.alt = p.alt || p.title;

  const body = el("div", "project-body");
  body.appendChild(el("h3", "", p.title));
  body.appendChild(el("p", "", p.desc || ""));

  const a = el("a", "link", "Read more →");
  a.href = p.href || "#";
  body.appendChild(a);

  article.appendChild(img);
  article.appendChild(body);
  return article;
}

function wideProjectCard(p) {
  const article = el("article", "card project-card wide");

  const img = document.createElement("img");
  img.className = "project-img wide-img";
  img.src = p.image;
  img.alt = p.alt || p.title;

  const body = el("div", "project-body");
  body.appendChild(el("h3", "", p.title));
  body.appendChild(el("p", "", p.desc || ""));

  const a = el("a", "link", "Read more →");
  a.href = p.href || "#";
  body.appendChild(a);

  article.appendChild(img);
  article.appendChild(body);
  return article;
}

function interestsCard(item) {
  const card = el("div", "card");
  card.appendChild(el("h3", "", item.title));

  if (Array.isArray(item.bullets)) {
    const ul = el("ul", "bullets");
    item.bullets.forEach(b => {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    });
    card.appendChild(ul);
  }

  if (item.desc) {
    card.appendChild(el("p", "muted", item.desc));
  }

  if (item.href) {
    const a = el("a", "link", item.linkText || "See more →");
    a.href = item.href;
    card.appendChild(a);
  }

  return card;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Projects
    const projectsGrid = document.getElementById("projects-grid");
    if (projectsGrid) {
      const data = await fetchJSON("/data/projects.json");

      projectsGrid.innerHTML = "";
      (data.projects || []).forEach(p => projectsGrid.appendChild(projectCard(p)));

      // Optional “wide” featured card
      const wideHost = document.getElementById("projects-wide");
      if (wideHost && data.featuredWide) {
        wideHost.innerHTML = "";
        wideHost.appendChild(wideProjectCard(data.featuredWide));
      }
    }

    // Interests
    const interestsGrid = document.getElementById("interests-grid");
    if (interestsGrid) {
      const data = await fetchJSON("/data/interests.json");
      interestsGrid.innerHTML = "";
      (data.interests || []).forEach(item => interestsGrid.appendChild(interestsCard(item)));
    }
  } catch (err) {
    console.error(err);
  }
});