const randomIdx = Math.floor(Math.random() * 5) + 1;
let timerStarted = false;
document.body.style.backgroundImage =
  "linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), " +
  "url('images/background-image-src" +
  randomIdx +
  ".jpg')";
document.querySelector("#timer button img").src = "images/play.png";
if (localStorage.getItem("nickname")) {
  document.querySelector("#welcome-nickname h1").innerText =
    "돌아오셨군요, " + localStorage.getItem("nickname");
}

const todoList = localStorage.getItem("todoList");
const todoListEl = document.querySelector("#todo-list ul");
const paintTodoList = (todoList) => {
  todoListEl.innerHTML = "";
  todoList.split("#").map((todo) => {
    if (!todo || todo == "null") {
      return;
    }
    const todoEl = document.createElement("li");
    todoEl.innerText = todo;
    todoListEl.appendChild(todoEl);
  });
};
if (todoList) {
  paintTodoList(todoList);
}

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem(
    "todoList",
    localStorage.getItem("todoList") +
      "##" +
      document.querySelector("#todo").value
  );
  paintTodoList(localStorage.getItem("todoList"));
});

const API_KEY = "c02003905296d3e6759b0ce00d183307";
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

const refreshWindow = () => {
  localStorage.setItem("nickname", document.querySelector("#nickname").value);
  document.querySelector("#welcome-nickname h1").innerText =
    "HI, " + localStorage.getItem("nickname");
  document.querySelector("#login-form").style.display = "none";
  document.querySelector("#nickname").value = "";
  document.querySelector("#welcome-nickname").style.display = "inherit";
};

const resetBtn = document.createElement("button");
resetBtn.id = "resetBtn";
resetBtn.innerText = "RESET NICKNAME";
resetBtn.addEventListener("click", (e) => {
  document.querySelector("#login-form").style.display = "inherit";
  document.querySelector("#welcome-nickname").style.display = "none";
});
document.querySelector("#welcome-nickname").appendChild(resetBtn);

document.querySelector("#login").addEventListener("submit", (e) => {
  e.preventDefault();
  refreshWindow();
  document.querySelector("#timer").display = "inherit";
});

let leftMinute = 5;
let leftSecond = 0;
document.querySelector("#timer button").addEventListener("click", (e) => {
  timerStarted = !timerStarted;
  if (timerStarted) {
    // 타이머가 시작됐으면
    document.querySelector("#timer button img").src = "images/pause.png";
  } else {
    document.querySelector("#timer button img").src = "images/play.png";
  }
});

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

const myTimer = () => {
  const timezone = new Date();
  const currentTime =
    timezone.getFullYear() +
    "년 " +
    (parseInt(timezone.getMonth()) + 1) +
    "월 " +
    timezone.getDate() +
    "일 " +
    timezone.getHours() +
    "시 " +
    timezone.getMinutes() +
    "분 " +
    timezone.getSeconds() +
    "초";
  document.querySelector("#current-time h1").innerText = currentTime;
  if (!timerStarted) {
    return;
  }
  leftSecond--;
  if (leftSecond < 0) {
    leftSecond += 60;
    leftMinute--;
  }
  if (leftMinute == 0 && leftSecond == 0) {
    timerStarted = !timerStarted;
    leftMinute = 5;
    leftSecond = 0;
  }
  let timerString =
    "0" + leftMinute + ":" + (leftSecond < 10 ? "0" : "") + leftSecond;
  document.querySelector("#left-time").innerText = timerString;
};
setInterval(myTimer, 1000);
