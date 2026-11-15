class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
    this.isPlaying = false;
  }

  speak(text, language = 'en-US', onEndCallback = null) {
    if (!this.synth) {
      console.warn("SpeechSynthesis API not supported in this browser.");
      return false;
    }

    this.stop();

    if (!text || text.trim() === '') return false;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Attempt to find appropriate voice
    const voices = this.synth.getVoices();
    let voice = voices.find(v => v.lang === language || v.lang.replace('_', '-') === language);
    if (!voice && language.includes('-')) {
      voice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
    }
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.lang = language;
    utterance.rate = 0.9; // slightly deliberate speed for medical clarity
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isPlaying = false;
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = (e) => {
      console.error("SpeechSynthesis error:", e);
      this.isPlaying = false;
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.isPlaying = true;
    this.synth.speak(utterance);
    return true;
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.isPlaying = false;
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.isPlaying = true;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }
}

export const speechService = new SpeechService();
