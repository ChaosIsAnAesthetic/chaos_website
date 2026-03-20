document.addEventListener("DOMContentLoaded", () => {
  displayShows();
});

async function getShows() {
  const strapiBaseUrl = isDevelopment()
    ? "http://localhost:1337/api"
    : "https://honest-positivity-52f756190d.strapiapp.com/api";

  const eventsEndpoint = "/events?";
  const url =
    strapiBaseUrl +
    eventsEndpoint +
    new URLSearchParams({
      populate: ["Address"],
      sort: ["StartDateAndTime:desc"],
      "pagination[pageSize]": 20,
    }).toString();
  const response = await fetch(url);
  return response;
}

async function displayShows() {
  try {
    const response = await getShows();
    if (!response.ok) {
      throw response.error;
    }
    const result = await response.json();
    const shows = result.data;
    displayNextShow(shows);
    displayShowRows(shows);
  } catch (error) {
    displayShowsError();
  } finally {
    removeElById("nextShowLoading");
    removeElById("upcomingLoading");
  }
}

function displayShowRows(shows) {
  const upcomingShowsTable = getElementById("upcomingShowsTable");
  const recentShowsTable = getElementById("recentShowsTable");
  shows.every((show) => {
    if (isUpcoming(show)) {
      if (upcomingShowsTable.childElementCount < 21) {
        displayShowRow(show, upcomingShowsTable, true);
      }
      return true;
    } else if (recentShowsTable.childElementCount < 3) {
      displayShowRow(show, recentShowsTable);
      return true;
    }
    return false;
  });
}

function isUpcoming(show) {
  const now = new Date().getTime();
  return new Date(show.StartDateAndTime).getTime() >= now;
}

function displayShowsError() {
  const upcomingShowsTable = getElementById("upcomingShowsTable");
  const tdEl = createEl("td");
  const errorEl = createShowErrorMessage();

  addChild(tdEl, errorEl);
  addChild(upcomingShowsTable, tdEl);

  const subscribeMsg = createInviteToSubscribeMsg();

  const nextShowEl = getElementById("nextShowPara");
  setTextContent(nextShowEl, "");
  addChild(nextShowEl, subscribeMsg);
}

function createShowErrorMessage() {
  const container = createEl("p");
  const errorMsgEl = createEl("span");
  const msg = "There was an error fetching show information. ";
  setTextContent(errorMsgEl, msg);
  errorMsgEl.className = "gray";
  const subscribeMsgEl = createInviteToSubscribeMsg();
  subscribeMsgEl.className = "gray";
  addChild(container, errorMsgEl);
  addChild(container, subscribeMsgEl);
  return container;
}

function findNextShow(sortedShows = []) {
  return sortedShows.find((show) => {
    if (isUpcoming(show)) {
      return true;
    }
  });
}

function displayNextShow(shows) {
  const nextShow = findNextShow(shows);
  if (!nextShow) {
    displayNoNextShowMessage();
    return;
  }

  const nextShowPara = getElementById("nextShowPara");
  const datetime = new Date(nextShow.StartDateAndTime);
  const date =
    datetime.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    }) + " ";
  const time = datetime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  const locationName =
    `${nextShow.Address ? " @" : ""} ` + nextShow.Address?.Name ?? "";
  const cityState = ` ${nextShow.Address?.City ?? ""}, ${nextShow.Address?.State ?? ""}`;

  addChild(nextShowPara, createEl("span", date));
  addChild(nextShowPara, createEl("span", time));
  addChild(nextShowPara, createEl("span", " | " + nextShow.Title));
  addChild(nextShowPara, createEl("span", locationName));
  addChild(nextShowPara, createEl("span", cityState));
}

function displayShowRow(show, tableEl, prepend = false) {
  if (!tableEl) {
    return;
  }
  const tableRow = createEl("tr");
  const dateEl = createEl("td");
  const showDate = new Date(show.StartDateAndTime);
  setTextContent(
    dateEl,
    showDate.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    }),
  );
  const showDetailsEl = createEl("td");
  const eventTitleEl = createEl("a");
  setTextContent(
    eventTitleEl,
    `${show.Title}${nextShow.Address ?? " @"} ${show.Address?.Name ?? ""}`,
  );
  eventTitleEl.href = show.Link;
  eventTitleEl.className = "event-title ";

  const breakEl = createEl("br");

  const locationEL = createEl("span");
  const location = show.Address
    ? `${show.Address?.City ?? ""}, ${show.Address?.State ?? ""}`
    : "";
  setTextContent(locationEL, location);

  const showTimeEl = createEl("td");
  const showTime = showDate.toLocaleTimeString("en-US", {
    hour: "numeric",
  });
  setTextContent(showTimeEl, showTime);

  addChild(showDetailsEl, eventTitleEl);
  addChild(showDetailsEl, breakEl);
  addChild(showDetailsEl, locationEL);

  addChild(tableRow, dateEl);
  addChild(tableRow, showDetailsEl);
  addChild(tableRow, showTimeEl);

  addChild(tableEl, tableRow, prepend);
}

function displayNoNextShowMessage() {
  const nextShowPara = getElementById("nextShowPara");
  const spanEl = createEl("span");

  setTextContent(nextShowPara, "");
  const noNextEventMsg = "There are currently no upcoming shows.";
  setTextContent(spanEl, noNextEventMsg);
  const subscribeMsgEl = createInviteToSubscribeMsg();
  addChild(nextShowPara, spanEl);
  addChild(nextShowPara, subscribeMsgEl);
}

function createInviteToSubscribeMsg() {
  const inviteMsg = "To stay up to date on our latest shows/releases, ";
  const spanEl = createEl("span");

  setTextContent(spanEl, inviteMsg);
  const anchorEl = createEl("a");
  setTextContent(anchorEl, "subscribe to our newsletter.");
  anchorEl.href = "#newsletter";
  anchorEl.className = "link";
  addChild(spanEl, anchorEl);
  return spanEl;
}
