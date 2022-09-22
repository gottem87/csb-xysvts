/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lazar extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Lazar/costumes/costume1.svg", {
        x: 12.714285714285722,
        y: 5.214285714285722
      })
    ];

    this.sounds = [new Sound("pop", "./Lazar/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *startAsClone() {
    this.goto(this.sprites["Player"].x, this.sprites["Player"].y);
    this.direction = this.sprites["Player"].direction;
    this.visible = true;
    while (!this.touching("edge")) {
      this.move(13.756);
      if (this.touching(this.sprites["Lemon"].andClones())) {
        this.deleteThisClone();
      }
      yield;
    }
    this.deleteThisClone();
  }
}
