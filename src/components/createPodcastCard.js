/**
 * Trigger a custom event when a user interacts with the component
 * @param {Object} podcast - Podcast object.
 * @param {Function} onClick - Function to call on card click.
 * @returns {HTMLElement} podcast- preview element.
 */
export const createPodcastCard = (podcast, onClick) => {
  const card = document.createElement("podcast-preview");
  
  //Pass podcast data via attributes
  card.setAttribute("id", podcast.id);
  card.setAttribute("title", podcast.title);
  card.setAttribute("image", podcast.image);
  card.setAttribute("seasons", podcast.seasons);
  card.setAttribute("genres", podcast.genres.join(","));
  card.setAttribute("updated", podcast.updated);

  //Listen for the custom event from the component
  card.addEventListener("podcast-selected", (e) => {
    onClick(e.detail);
  });
  return card;
};
