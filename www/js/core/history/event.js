export default class Event {
  constructor(conditions, effects) {
    this.conditions = conditions;
    this.effects = effects;
  }

  _checkCondition() {
    return this.conditions.every(condition => condition.check())
  }

  _activate() {
    this.effects.forEach(effect => effect.activate());
  }

  check() {
    if(this._checkCondition()) {
      this.activate();
    }
  }
}