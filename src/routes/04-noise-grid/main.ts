import "@styles/style.css";
import p5 from "p5";

function init() {
  const app = document.getElementById("app");
  if (!app) return;

  const canvasX = 800;
  const canvasY = canvasX;
  const tiles = 32;
  const tileWidth = canvasX / tiles;
  const noiseDetail = 0.075;
  let t = 0;

  new p5((p5Instance) => {
    const p = p5Instance as unknown as p5;

    p.setup = function setup() {
      p.createCanvas(canvasX, canvasY);
      p.colorMode("hsl");
      p.noStroke();
    };

    p.draw = function draw() {
      p.background(0);

      for (let x = 0; x < tiles; x++) {
        for (let y = 0; y < tiles; y++) {
          const n = p.noise(x * noiseDetail, y * noiseDetail, t);
          p.fill(160 + n * 100, 100, 50);
          p.rect(x * tileWidth, y * tileWidth, tileWidth, tileWidth);
        }
      }

      t += 0.01;
    };
  }, app);
}

init();
