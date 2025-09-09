let time = 1500; // 25 phút mặc định
let timerInterval;
let isRunning = false;

const timerEl = document.getElementById("timer");
const startPauseBtn = document.getElementById("startPause");
const resetBtn = document.getElementById("reset");
const setTimeBtn = document.getElementById("setTime");
const customMinutesInput = document.getElementById("customMinutes");

const newTaskInput = document.getElementById("newTask");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const youtubeUrlInput = document.getElementById("youtubeUrl");
const playYoutubeBtn = document.getElementById("playYoutube");
let player;

// Định dạng hiển thị mm:ss
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  timerEl.textContent = formatTime(time);
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    startPauseBtn.textContent = "▶ Start";
  } else {
    isRunning = true;
    startPauseBtn.textContent = "⏸ Pause";
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        startPauseBtn.textContent = "▶ Start";
        alert("⏰ Hết giờ!");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  time = Number(customMinutesInput.value) * 60;
  updateDisplay();
  startPauseBtn.textContent = "▶ Start";
}

function setCustomTime() {
  time = Number(customMinutesInput.value) * 60;
  updateDisplay();
  clearInterval(timerInterval);
  isRunning = false;
  startPauseBtn.textContent = "▶ Start";
}

// Quản lý Task
function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => taskList.removeChild(li);

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    newTaskInput.value = "";
  }
}

// Phát nhạc YouTube
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: "",
    events: {
      onReady: () => console.log("YouTube Player ready"),
    },
  });
}

function playYoutube() {
  const url = youtubeUrlInput.value.trim();
  if (!url) return;
  let videoId = "";

  try {
    if (url.includes("v=")) {
      videoId = new URL(url).searchParams.get("v");
    } else if (url.includes("youtu.be")) {
      videoId = url.split("/").pop();
    }
  } catch (e) {
    alert("❌ Link YouTube không hợp lệ!");
    return;
  }

  if (player && videoId) {
    player.loadVideoById(videoId);
    player.playVideo();
  }
}

// Gán sự kiện
startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
setTimeBtn.addEventListener("click", setCustomTime);
addTaskBtn.addEventListener("click", addTask);
playYoutubeBtn.addEventListener("click", playYoutube);

updateDisplay();
