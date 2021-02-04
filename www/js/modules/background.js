
import { GameManager } from '../core/managers/index.js';

export default class Background {
  /**
   * Constructor.
   *
   * Initializes scene's background.
   *
   * @param   {PIXI.Container}   stage           PIXI.Container object(from Scene).
   */
  constructor(stage) {
    this._bgList = [];
    this._stage = stage;
    this._loader = null;

    this.ticker = this.ticker.bind(this);
  }
  
  /**
   * Load Background Images.
   *
   * Load all background layer images by using PIXI.Loader and creates texture & sprites.
   * Also, put layer sprites in order.
   *
   * @param   {String}   bgDir           Directory name which includes background layer images.
   * @param   {Float}    scrollSpeed     Background layer scroll speed.
   * @param   {Array}    bgList          Background layer information.
   * @param   {String}   bg.src          Background layer image source.
   * @param   {Int}      bg.zIndex       Background layer z-index.
   * 
   * @return  {Promise}
   */
  async load(bgDir, scrollSpeed, bgList) {
    this._loader = new PIXI.Loader(bgDir);

    bgList.forEach(bg => {
      this._loader.add(bg.src, bg.src);
    })

    return new Promise((resolve, reject) => {
      // Load background layers
      this._loader.load((loader, resources) => {
        // Sort by z-index.
        this._bgList = bgList.sort((bg1, bg2) => ((bg1.zIndex || 0) - (bg2.zIndex || 0))).map(bg => {
          const layerTexture = resources[bg.src].texture;
          const layerSprite = new PIXI.TilingSprite(layerTexture, GameManager.app.screen.width, GameManager.app.screen.height);
    
          layerSprite.anchor.set(0.5);
          layerSprite.x = GameManager.app.screen.width / 2;
          layerSprite.y = GameManager.app.screen.height / 2;
          layerSprite.tileScale.x = layerSprite.tileScale.y = GameManager.app.screen.height / layerTexture.height;

          this._stage.addChild(layerSprite);

          return {
            'src': bg.src,
            'sprite': layerSprite,
            'scrollSpeed': bg.zIndex * scrollSpeed || 0
          };
        });
        resolve(true);
      });

      this._loader.onError.add(err => reject(err));
    });
  }

  /**
   * Ticker for background layers.
   *
   * Scroll background layers.
   *
   * @param   {Float}   delta           from PIXI.Ticker.
   */
  ticker(delta) {
    this._bgList.forEach(bg => {
      if(bg.scrollSpeed)
        bg.sprite.tilePosition.x += bg.scrollSpeed;
    });
  };
};