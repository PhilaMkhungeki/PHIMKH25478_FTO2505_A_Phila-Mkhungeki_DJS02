/**
 * Display a podcast preview card.
 * @class
 * @extends HTMLElement
 */
class PodcastPreview extends HTMLElement {
     constructor() {
        super();
        this.attachShadow({mode: "open"});
        this._podcast = null;
     }

     /**
      * Assign podcast data via property
      * @param {object} value
      */
     set podcast(value) {
        this._podcast = value;
        this.render();
     }

     /**
      * Retrieve current podcast data
      */
     get podcast() {
        return this._podcast;
     }

     connectedCallback() {
        this.render();
     }

     handleClick() {
        this.dispatchEvent(
            new CustomEvent("podcastSelected", {
                detail: this._podcast,
                bubbles: true,
                composed: true,
            })
        );
     }

     /**
      * Render the podcast card inside Shadow DOM
      */
     render(){

        <div class="card">
            <img src="${this._podcast.image" alt="${this._podcast.title" cover/>
            <h3>${this._podcast.title}</h3>
            <p>${this._podcast.seasons} season${
                this._podcast.seasons > 1 ? "s" : ""
            }</p>
            <div class="tags">
                ${genreNames.map((g) => `<span class="tag">${g}</span>`).join("")}
            </div>
            <p class="updated-text">${DateUtils.format(this._podcast.updated)}</p>
        </div>

        this.shadowRoot.querySelector(".card").onclick = () => this.handleClick();
        
     }

    //Register the component
    customElements.define("podcast-preview", PodcastPreview);
}