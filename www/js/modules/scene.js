
import { Background, BGM } from './index.js';

export default class Scene {
  /**
   * Constructor.
   *
   * Initializes scene's container, background, bgm, and tickers.
   */
  constructor() {
    this._container = new PIXI.Container();
    this.background = new Background(this._container);
    this.bgm = new BGM();
    this._tickers = [ this.background.ticker ];
  }

  /**
   * Add an sprite.
   *
   * Put target sprite into container.
   *
   * @param   {PIXI.Sprite}   pixiSprite           PIXI.Sprite object.
   */
  addSprite(pixiSprite) {
    if(pixiSprite._sprite)
      this._container.addChild(pixiSprite._sprite);
    else
      this._container.addChild(pixiSprite);
  }
};