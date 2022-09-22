/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Lemon extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Lemon/costumes/costume1.svg", {
        x: 27.50000000000003,
        y: 18.93136541695202
      })
    ];

    this.sounds = [new Sound("pop", "./Lemon/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    while (true) {
      yield* this.wait(0.45666);
      this.createClone();
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.goto(this.random(-200, 200), this.random(-200, 200));
    this.direction = this.radToScratch(
      Math.atan2(
        this.sprites["Player"].y - this.y,
        this.sprites["Player"].x - this.x
      )
    );
    while (true) {
      this.move(5);
      this.direction += this.random(-5, 9);
      if (this.touching(this.sprites["Lazar"].andClones())) {
        this.deleteThisClone();
      }
      if (this.touching(this.sprites["Player"].andClones())) {
        this.broadcast("gameover");
        /* TODO: Implement stop all */
      }
      if (this.touching("edge")) {
        this.deleteThisClone();
      }
      yield;
    }
  }
}
