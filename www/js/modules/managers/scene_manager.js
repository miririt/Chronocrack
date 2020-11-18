
import { GameManager } from './index.js';

export default class SceneManager {
  static _sceneStack = [];
  static _currentScene = null;

  static _updateStage() {
    const newScene = this._sceneStack[this._sceneStack.length - 1];
    
    // update container object
    GameManager.app.stage.children.forEach(obj => {
      GameManager.app.stage.removeChild(obj);
    });
    console.log(newScene);
    GameManager.app.stage.addChild(newScene._container);

    // update bgm
    this._currentScene?.bgm?.fadeout();
    newScene.bgm.fadein();

    // update tickers
    this._currentScene?._tickers?.forEach(ticker => {
      GameManager.app.ticker.remove(ticker);
    });

    newScene._tickers.forEach(ticker => {
      GameManager.app.ticker.add(ticker);
    });

    this._currentScene = newScene;
  }

  static pushScene(targetScene) {
    // check if target scene is already exists
    if(this._sceneStack.includes(targetScene)) {
      this._sceneStack.push(this._sceneStack.splice(this._sceneStack.indexOf(targetScene), 1)[0]);
    }
    
    // or push target scene into stack.
    this._sceneStack.push(targetScene);
    this._updateStage();
    return true;
  }

  static popScene() {
    // pops scene stack and returns it.
    const targetScene = _this._sceneStack.pop();
    this._updateStage();

    return targetScene;
  }

  static setScene(targetScene) {
    // clear all scenes in stack and shows target scene.
    this._sceneStack = [targetScene];
    this._updateStage();

    return true;
  }
};