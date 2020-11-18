
import { AudioManager } from '../managers/index.js';

export default class BGM {

  /**
   * Constructor.
   *
   * Initializes BGM.
   */
  constructor() {
    this._bgmList = [];
    this._currentIdx = [];
    this._shuffle = false;
  }

  /**
   * Add an sprite.
   *
   * Put target sprite into container.
   *
   * @param   {Array}   srcList             Background music information.
   * @param   {Object}  options             Backgroudn music option.
   * @param   {Int}  options.startsWith     Index of first background music.
   * @param   {Boolean}  options.shuffle    Either shuffles background music order or not.
   */
  load(srcList, options = { startsWith: 0, shuffle: false }) {
    this.stop();

    this._bgmList = srcList ? srcList.map(bgmSrc => AudioManager.load(bgmSrc)) : this._bgmList;
    this._currentIdx = options.startsWith || 0;
    this._shuffle = options.shuffle || false;
    
    if(this._shuffle) {
      this.next(this._bgmList.length);
    }
    this.play();
  }
  
  _getCurrent() {
    return this._bgmList[this._currentIdx];
  }

  go(newIdx) {
    this.stop();
    this._currentIdx = newIdx;
    this.play();
  }

  next(step = 1) {
    if(this._currentIdx + step >= this._bgmList.length && this._shuffle) {
      // shuffles bgm list
      for(let i = this._bgmList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [this._bgmList[i], this._bgmList[j]] = [this._bgmList[j], this._bgmList[i]];
      }
    }
    this.go((this._currentIdx + step) % this._bgmList.length);
  }
  
  play() {
    if(!this._getCurrent()) return new Promise(function(resolve, reject) { reject('BGM is not loaded'); });
    this._getCurrent().onended = (function() {
      this.next();
    }).bind(this);
    return this._getCurrent()?.play().catch(_ => { setTimeout(this.play.bind(this), 0); });
  }
  
  pause() {
    this._getCurrent()?.pause();
  }
  
  stop() {
    this._getCurrent()?.stop();
  }

  fadeout() {
    function fadeVolume() {
      if(
        (this._getCurrent().volume = 
          Math.max(this._getCurrent().volume - 0.05, 0)
        ) > 0) {
        setTimeout(fadeVolume.bind(this), 100);
      } else {
        this._getCurrent().stop();
      }
    }

    if(!this._getCurrent()) return false;

    setTimeout(fadeVolume.bind(this), 100);
    return true;
  }

  fadein() {
    function fadeVolume() {
      if(
        (this._getCurrent().volume = 
          Math.min(this._getCurrent().volume + 0.1, 1)
        ) < 1) {
        setTimeout(fadeVolume.bind(this), 100);
      }
    }

    if(!this._getCurrent()) return false;

    this._getCurrent().volume = 0;
    this._getCurrent().play();
    setTimeout(fadeVolume.bind(this), 100);
    return true;
  }
};