
import { GameManager, SceneManager } from '../managers/index.js';

export default class Action {
  /**
   * Constructor.
   *
   * Initializes action.
   */
  constructor(actionType, data) {
    this._actionType = actionType;
    this._data = data;
  }

  do() {
    switch(this._actionType) {
      case 'pushScene':
        this._doScenePush();
        break;
    }
  }

  async _doScenePush() {
    const targetScene = await GameManager.loadScene(this._data);
    SceneManager.pushScene(targetScene);
  }
};