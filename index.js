
let audioContext;

function playSound(key) {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) {
    alert("Your browser does not support audio.");
    return;
  }

  if (!audioContext) audioContext = new AudioCtx();

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  if (key === "w" || key === "s") {
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(key === "w" ? 150 : 100, now);
    oscillator.frequency.exponentialRampToValueAtTime(40, now + 0.22);
    gain.gain.setValueAtTime(1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    oscillator.start(now);
    oscillator.stop(now + 0.25);
  } else if (key === "k") {
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(1200, now);
    oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.18);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  } else {
    const buffer = audioContext.createBuffer(
      1, audioContext.sampleRate * 0.18, audioContext.sampleRate
    );
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();

    filter.type = "highpass";
    filter.frequency.value = key === "j" ? 1000 : 250;

    noise.buffer = buffer;
    noise.connect(filter);
    filter.connect(gain);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    noise.start(now);
    noise.stop(now + 0.18);
  }

  const button = document.querySelector(`[data-key="${key}"]`);
  if (button) {
    button.classList.add("pressed");
    setTimeout(() => button.classList.remove("pressed"), 120);
  }
}

document.querySelectorAll(".drum").forEach(button => {
  button.addEventListener("click", () => {
    playSound(button.dataset.key);
  });
});

document.addEventListener("keydown", event => {
  if (event.repeat) return;
  const key = event.key.toLowerCase();
  if ("wasdjkl".includes(key)) playSound(key);
});
