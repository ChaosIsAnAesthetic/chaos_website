import * as contentful from "contentful";

const client = contentful.createClient({
  space: CONFIG_CONTENTFUL_SPACE_ID,
  accessToken: CONFIG_CONTENTFUL_KEY,
  environment: CONFIG_CONTENTFUL_ENVIRONMENT,
});

async function getBand() {
  const response = await client.getEntry(CONFIG_CMS_BAND_ID).catch((error) => {
    throw error;
  });
  return mapBand(response);
}

function mapBand(band) {
  return {
    name: band.fields.bandName ?? "",
    quote: band.fields.quote ?? "",
    quoteSource: band.fields.quoteSource ?? "",
    bio: band.fields.bio ?? "",
    heroImageLink: getassetFieldUrl(band.fields.heroImage),
    logoLink: getassetFieldUrl(band.fields.logo),
  };
}

function getassetFieldUrl(assetField) {
  return "https:" + assetField.fields.file.url;
}

async function getShows() {
  const response = await client
    .getEntries({
      content_type: "event",
      order: "-fields.startDateTime",
      limit: 20,
    })
    .catch((error) => {
      throw error;
    });
  return mapEventsToShows(response.items);
}

function mapEventsToShows(events) {
  return events.map((entry) => {
    return {
      title: entry.fields.title ?? "",
      startDateTime: entry.fields.startDateTime ?? "".startDateTime,
      locationName: entry.fields.locationName ?? "",
      locationCity: entry.fields.locationCity ?? "",
      locationState: entry.fields.locationState ?? "",
    };
  });
}
export { getShows, getBand };
