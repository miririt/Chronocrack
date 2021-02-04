
HTMLAudioElement.prototype.stop = function() {
  this.pause();
  this.currentTime = 0;
};

HTMLAudioElement.prototype.replay = function() {
  this.stop();
  this.play();
};

export default class AudioManager {
  static _cachedAudios = {};

  static load(src, preload) {
    if(this._cachedAudios[src]) {
      return this._cachedAudios[src];
    }

    const audioObj = new Audio(src);

    if(preload) {
      audioObj.load();
    }
    this._cachedAudios[src] = audioObj;

    return audioObj;
  }
};

AudioManager.SFX = class {
  static _sfxList = {};
  static play(src) {
    if(this._sfxList[src]) {
      this._sfxList[src].replay();
    } else {
      const sfxAudio = AudioManager.load(src);
      
      this._sfxList[src] = sfxAudio;
      sfxAudio.onended = (function() {
        delete this._sfxList[src];
      }).bind(this);
      
      sfxAudio.play();
    }
  }

  static cancel(src) {
    if(this._sfxList[src]) {
      this._sfxList[src].stop();
    }
  }
};