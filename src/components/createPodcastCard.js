import { GenreService } from "../utils/GenreService.js";
import { DateUtils } from "../utils/DateUtils.js";

/**
 * @param {Object} podcast - Podcast object.
 * @param {Function} onClick - Function to call on card click.
 * @returns {HTMLElement} podcast- preview element.
 */
export const createPodcastCard = (podcast, onClick) => {
  const card = document.createElement("div");
  card.podcast = podcast;

  //Listen for the custom event from the component
  card.addEventListener("podcastSelected", (e) => {
    onClick(e.detail);
  });
  return card;
};
