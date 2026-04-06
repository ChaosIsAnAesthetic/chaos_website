import { getBand } from "./contentful.js";
import { getElementById, setHref, setSrc, setTextContent } from "./domUtils.js";

async function displayBandInfo() {
  try {
    const band = await getBand();
    setTextContent("bandBio", band.bio);
    setTextContent("quoteCredit", "- " + band.quoteSource);
    setTextContent("bandQuote", `"${band.quote}"`);
    setHref("flatIcon", band.logoLink);
    setSrc("bandLogo", band.logoLink);
    const mainViewEl = getElementById("mainView");
    if (mainViewEl) {
      mainViewEl.style.backgroundImage = `url("${band.heroImageLink}")`;
    }
  } catch (error) {
    console.log(error);
    console.log("Band info display error");
  }
}

export default displayBandInfo;
