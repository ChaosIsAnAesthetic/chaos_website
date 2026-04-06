import * as css from "./css/style.css";
// import * as cssmap from "./css/style.css.map";
import * as mainFunctions from "./js/mainFunctions.js";
import "./js/submitContactForm";
import "./js/submitNewsletterForm";
import displayShows from "./js/displayShows";
import displayBandInfo from "./js/displayBandInfo.js";
// import pic from "./img"

document.addEventListener("DOMContentLoaded", () => {
  displayShows();
  displayBandInfo();
});
