(() => {
  const audio = document.getElementById("space-audio");
  const toggleBtn = document.getElementById("space-audio-toggle");

  if (!(audio instanceof HTMLMediaElement) || !(toggleBtn instanceof HTMLButtonElement)) return;

  const LABEL_ON = "SOUND: ON";
  const LABEL_OFF = "SOUND: OFF";

  // Reasonable default volume (can be adjusted later)
  audio.volume = 0.35;

  const setUi = (isOn) => {
    toggleBtn.classList.toggle("is-on", isOn);
    toggleBtn.setAttribute("aria-pressed", String(isOn));
    toggleBtn.textContent = isOn ? LABEL_ON : LABEL_OFF;
  };

  const tryPlay = async () => {
    try {
      await audio.play();
      return true;
    } catch {
      return false;
    }
  };

  const syncUi = () => setUi(!audio.paused);

  const tryResumeOnGesture = async () => {
    if (!audio.paused) return;
    const ok = await tryPlay();
    if (ok) {
      window.removeEventListener("pointerdown", tryResumeOnGesture);
      window.removeEventListener("keydown", tryResumeOnGesture);
    }
    syncUi();
  };

  toggleBtn.addEventListener("click", async () => {
    if (audio.paused) {
      await tryPlay();
    } else {
      audio.pause();
    }
    syncUi();
  });

  audio.addEventListener("play", syncUi);
  audio.addEventListener("pause", syncUi);

  // Attempt autoplay; if blocked by browser policy, fall back to first user gesture.
  setUi(false);
  tryPlay().then((ok) => {
    syncUi();
    if (!ok) {
      window.addEventListener("pointerdown", tryResumeOnGesture, { passive: true });
      window.addEventListener("keydown", tryResumeOnGesture);
    }
  });
})();
