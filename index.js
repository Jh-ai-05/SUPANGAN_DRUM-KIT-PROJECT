var buttons = document.querySelectorAll(".drum");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    playDrum(this.classList[0]);
  });
});

document.addEventListener("keydown", function (event) {
  playDrum(event.key.toLowerCase());
});

function playDrum(key) {
  var sounds = {
    w: "sounds/tom-1.mp3",
    a: "sounds/tom-2.mp3",
    s: "sounds/tom-3.mp3",
    d: "sounds/tom-4.mp3",
    j: "sounds/snare.mp3",
    k: "sounds/crash.mp3",
    l: "sounds/kick-bass.mp3"
  };

  var button = document.querySelector("." + key + ".drum");

  if (!sounds[key] || !button) {
    return;
  }

  var audio = new Audio(sounds[key]);

  audio.play().catch(function (error) {
    console.error("Sound error:", error);
  });

  button.classList.add("pressed");

  setTimeout(function () {
    button.classList.remove("pressed");
  }, 100);
}