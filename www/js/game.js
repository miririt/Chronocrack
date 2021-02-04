
import { GameManager, SceneManager } from './core/managers/index.js';

import { Scene, TextButton } from './modules/index.js';

async function init() {
  GameManager.init(window);

  const introScene = await GameManager.loadScene('intro');
  const dawnScene = await GameManager.loadScene('dawn');
  const buildingScene = new Scene();

  buildingScene.background.load('img/bg/city', 0.1, [
    { 'src': 'Sky-layer.png', 'zIndex': 1 },
    { 'src': 'buildings-layer.png', 'zIndex': 2 }
  ]);

  const startBtn = new TextButton('Start', {
    fontFamily : 'Georgia',
    fontSize: GameManager.dprSize(48),
    fill : 0xffffff,
    dropShadow: true,
    dropShadowDistance: 0,
    dropShadowColor: 'lightgrey',
    dropShadowBlur: 6
  });

  startBtn._sprite.position.x = GameManager.app.screen.width / 2;
  startBtn._sprite.position.y = GameManager.app.screen.height / 2;

  startBtn.linkAction('open_dawn');

  const introBtn = new TextButton('Intro');
  introBtn._sprite.position.x = GameManager.app.screen.width / 2;
  introBtn._sprite.position.y = GameManager.app.screen.height / 2;

  introBtn.linkAction('open_intro');

  introScene.addSprite(startBtn);
  dawnScene.addSprite(introBtn);
  SceneManager.pushScene(introScene);
}

window.addEventListener('load', init);