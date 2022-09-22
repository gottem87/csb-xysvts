import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Player from "./Player/Player.js";
import Lazar from "./Lazar/Lazar.js";
import Lemon from "./Lemon/Lemon.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Player: new Player({
    x: -121.4999999999995,
    y: -48.599999999999376,
    direction: 84.63162919043077,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 3
  }),
  Lazar: new Lazar({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  Lemon: new Lemon({
    x: 73.4594039306014,
    y: -157.37196113175605,
    direction: -140.90603138158224,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
