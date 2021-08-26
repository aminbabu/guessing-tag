// create button animation
(() => {
  const intronBtn = document.getElementById("introBtn");
  const rules = document.getElementById("rules");
  const introCloseBtn = document.getElementById("introClose");

  // function to show game rules
  function showRules() {
    intronBtn.classList.add("hide-intro-btn");
    rules.classList.add("active-rules");
  }

  // function to hide game rules
  function hideRules() {
    intronBtn.classList.remove("hide-intro-btn");
    rules.classList.remove("active-rules");
  }

  intronBtn.addEventListener("click", showRules);
  introCloseBtn.addEventListener("click", hideRules);
})();

// real-time clock
(() => {
  const clockField = document.getElementById("clock");

  // update clock in every one second
  setInterval(() => {
    showClock();
  }, 1000);

  // function to create real-time clock
  function showClock() {
    // define local time
    const time = new Date().toLocaleTimeString();

    // render clock to html
    clockField.innerText = time;
  }
})();
