
var buttons = document.querySelectorAll(".drum");

var sounds = {
  w: "crash.mp3",
  a: "kick-bass.mp3",
  s: "snare.mp3",
  d: "tom-1.mp3",
  j: "tom-2.mp3",
  k: "tom-3.mp3",
  l: "tom-4.mp3"
};

function playDrum(key) {
  var button = document.querySelector("." + key + ".drum");

  if (!button || !sounds[key]) {
    return;
  }

  var audio = new Audio("./" + sounds[key]);

  audio.play().catch(function(error) {
    console.log("Cannot play sound:", error);
  });

  button.classList.add("pressed");

  setTimeout(function() {
    button.classList.remove("pressed");
  }, 100);
}

buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    playDrum(button.classList[0]);
  });
});

document.addEventListener("keydown", function(event) {
  if (event.repeat) return;
  playDrum(event.key.toLowerCase());
});
