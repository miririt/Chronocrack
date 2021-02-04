import { Action, Scene } from "../../modules/index.js";

export default class GameManager {
  static app = null;
  static _cachedScene = {};
  static _cachedAction = {};
  static _dpr = 1.0;

  static init(gameWindow) {
    this._dpr = window.devicePixelRatio;

    const windowData = require('package.json').window;

    // resize window.
    nw.Window.get().resizeTo(~~(windowData.width / this._dpr), ~~(windowData.height / this._dpr));
    
    this.app = new PIXI.Application({ backgroundColor: 0xffffff });

    gameWindow.document.body.appendChild(this.app.view);
  }

  static async loadScene(sceneName) {
    if(this._cachedScene[sceneName]) {
      return this._cachedScene[sceneName];
    }

    const scene = new Scene();
    const sceneDataLocation = `/www/json/scene/${sceneName}.json`;
    const data = await fetch(sceneDataLocation, { method: 'GET' }).then(_ => _.json());

    scene.bgm.load(data.bgm.list, data.bgm.options);
    await scene.background.load(data.background.dir, data.background.scrollSpeed, data.background.layer);

    return (this._cachedScene[sceneName] = scene);
  }

  static async loadAction(actionName) {
    if(this._cachedAction[actionName]) {
      return this._cachedAction[actionName];
    }

    const actionDataLocation = `/www/json/action/${actionName}.json`;
    const data = await fetch(actionDataLocation, { method: 'GET' }).then(_ => _.json());

    return (this._cachedAction[actionName] = new Action(data.actionType, data.data));
  }

  static dprSize(size) {
    if('number' === typeof size) {
      return size / this._dpr;
    }

    return {
      'width': size.width / this._dpr,
      'height': size.height / this._dpr
    };
  }
};