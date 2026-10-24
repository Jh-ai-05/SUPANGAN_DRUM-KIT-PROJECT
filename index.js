
const sounds = {
    w: "./tom-1.mp3",
    a: "./tom-2.mp3",
    s: "./tom-3.mp3",
    d: "./tom-4.mp3",
    j: "./snare.mp3",
    k: "./crash.mp3",
    l: "./kick-bass.mp3"
};

function playSound(key) {
    const file = sounds[key];

    if (!file) return;

    const audio = new Audio(file);

    audio.play().catch(error => {
        alert("Sound error! Check the MP3 files in GitHub.");
        console.error(error);
    });

    const button = document.querySelector("." + key + ".drum");

    if (button) {
        button.classList.add("pressed");

        setTimeout(() => {
            button.classList.remove("pressed");
        }, 150);
    }
}

document.querySelectorAll(".drum").forEach(button => {
    button.addEventListener("click", function () {
        playSound(this.textContent.trim().toLowerCase());
    });
});

document.addEventListener("keydown", function (event) {
    if (event.repeat) return;
    playSound(event.key.toLowerCase());
});
