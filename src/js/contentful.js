import * as contentful from "contentful";

console.log(process.env.APP_CONTENTFUL_KEY);
const client = contentful.createClient({
  space: process.env.APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.APP_CONTENTFUL_KEY,
  environment:
    process.env.NODE_ENV === "development" ? "development" : "master",
});

async function getShows() {
  const response = await client
    .getEntries({
      content_type: "event",
    })
    .catch((error) => {
      console.log(error);
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
