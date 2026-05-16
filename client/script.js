const API_URL = "http://localhost:5000/events";
const eventList = document.querySelector("#event-list");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");

function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  eventList.appendChild(li);
}

function loadEvents() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((events) => {
      eventList.innerHTML = "";
      events.forEach(renderEvent);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();

  if (!title) {
    return;
  }

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })
    .then((response) => response.json())
    .then((newEvent) => {
      renderEvent(newEvent);
      form.reset();
    });
});

loadEvents();
