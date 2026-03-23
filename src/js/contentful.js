import * as contentful from "contentful";

const client = contentful.createClient({
  space: CONFIG_CONTENTFUL_SPACE_ID,
  accessToken: CONFIG_CONTENTFUL_KEY,
  environment: CONFIG_CONTENTFUL_ENVIRONMENT,
});

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
export { getShows };
