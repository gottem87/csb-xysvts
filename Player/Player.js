/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Player/costumes/costume2.svg", {
        x: 42.81613440282709,
        y: 17.856022843705773
      })
    ];

    this.sounds = [new Sound("Meow", "./Player/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.speedX = -6.405793776306646e-14;
    this.vars.speedY = -7.112170097136956e-14;
    this.vars.fireRate = 2;
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.goto(0, 0);
    this.vars.speedX = 0;
    this.vars.speedY = 0;
    while (true) {
      yield* this.moveX(this.keyPressed("d") - this.keyPressed("a"));
      yield* this.moveY(this.keyPressed("w") - this.keyPressed("s"));
      this.direction = this.radToScratch(
        Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x)
      );
      yield* this.shoot();
      yield;
    }
  }

  *moveX(joystickX) {
    this.vars.speedX += 0.9 * joystickX;
    this.vars.speedX = 0.9 * this.vars.speedX;
    this.x += this.vars.speedX;
  }

  *moveY(joystickY) {
    this.vars.speedY += 0.9 * joystickY;
    this.vars.speedY = 0.9 * this.vars.speedY;
    this.y += this.vars.speedY;
  }

  *shoot() {
    if (this.keyPressed("space")) {
      this.sprites["Lazar"].createClone();
    }
  }
}
