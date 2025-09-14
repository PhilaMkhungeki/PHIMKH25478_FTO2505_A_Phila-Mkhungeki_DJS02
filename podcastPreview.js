/**
 * Display a podcast preview card.
 * @class
 * @extends HTMLElement
 */
// src/components/PodcastPreview.js
export class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(PodcastPreview.template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ["title", "image", "seasons", "genres", "updated"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector(".card").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("podcast-selected", {
          detail: {
            id: this.getAttribute("id"),
            title: this.getAttribute("title"),
            image: this.getAttribute("image"),
            seasons: Number(this.getAttribute("seasons")),
            genres: this.getAttribute("genres")
              ? this.getAttribute("genres").split(",")
              : [],
            updated: this.getAttribute("updated"),
          },
          bubbles: true, // allow event to bubble up to parent
          composed: true // cross shadow DOM boundary
        })
      );
    });
  }

  render() {
    const card = this.shadowRoot.querySelector(".card");
    if (!card) return;

    const title = this.getAttribute("title") || "Untitled";
    const image = this.getAttribute("image") || "";
    const seasons = this.getAttribute("seasons") || "0";
    const genres = this.getAttribute("genres")
      ? this.getAttribute("genres").split(",")
      : [];
    const updated = this.getAttribute("updated") || "";

    card.querySelector("img").src = image;
    card.querySelector("img").alt = `${title} cover`;
    card.querySelector("h3").textContent = title;
    card.querySelector(".seasons").textContent =
      `${seasons} season${Number(seasons) > 1 ? "s" : ""}`;
    card.querySelector(".tags").innerHTML = genres
      .map((g) => `<span class="tag">${g}</span>`)
      .join("");
    card.querySelector(".updated-text").textContent = updated;
  }
}

// Define template & styles
PodcastPreview.template = document.createElement("template");
PodcastPreview.template.innerHTML = `
  <style>
    .card {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .card:hover {
      transform: scale(1.02);
    }
    .card img {
      width: 100%;
      border-radius: 6px;
    }
    .card h3 {
      margin: 0.5rem 0;
    }
    .card p {
      margin: 0px;
      font-size: 0.8rem;
      color: var(--grey-text);
    }
    .tags {
      margin: 0.5rem 0;
    }
    .tag {
      background: #eee;
      padding: 0.3rem 0.6rem;
      margin-right: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 4px;
      display: inline-block;
      font-size: 0.8rem;
    }
    .updated-text {
      font-size: 0.8rem;
      color: var(--grey-text);
    }
  </style>

  <div class="card">
    <img />
    <h3></h3>
    <p class="seasons"></p>
    <div class="tags"></div>
    <p class="updated-text"></p>
  </div>
`;

customElements.define("podcast-preview", PodcastPreview);
