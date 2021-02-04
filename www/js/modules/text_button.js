
import { AudioManager, GameManager } from '../core/managers/index.js';

export default class TextButton {
  constructor(text, options = { fontFamily : 'Georgia', fontSize: 24, fill : 0xffffff, dropShadow: true, dropShadowBlur: 6 }) {
    this._sprite = new PIXI.Text(text, options);
    
    this._sprite.anchor.set(0.5);

    this._sprite.interactive = true;
    this._sprite.buttonMode = true;

    this.on('pointertap', function() {
      AudioManager.SFX.play('audio/sfx/click.mp3');
    });

    this.on('pointerover', function() {
      this._sprite.style.fill = parseInt(this._sprite.style.fill.substr(1), 16) ^ 0xFFFFFF;
      this._sprite.style.dropShadowColor = parseInt(this._sprite.style.dropShadowColor.substr(1), 16) ^ 0xFFFFFF;
      this._sprite.updateText();
      AudioManager.SFX.play('audio/sfx/hoveron.wav');
      AudioManager.SFX.cancel('audio/sfx/hoverout.wav');
    });
    this.on('pointerout', function() {
      this._sprite.style.fill = parseInt(this._sprite.style.fill.substr(1), 16) ^ 0xFFFFFF;
      this._sprite.style.dropShadowColor = parseInt(this._sprite.style.dropShadowColor.substr(1), 16) ^ 0xFFFFFF;
      this._sprite.updateText();
      AudioManager.SFX.play('audio/sfx/hoverout.wav');
    });
  }

  on(event, handler) {
    this._sprite.on(event, handler.bind(this));
  }

  async linkAction(actionName) {
    const action = await GameManager.loadAction(actionName);
    this.on('pointertap', function() {
      action.do();
    });
  }
};