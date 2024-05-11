import "@styles/style.css";
import p5 from "p5";

function init() {
  const app = document.getElementById("app");
  if (!app) return;

  new p5((p5Instance) => {
    const count = 1000;
    let t = 0;
    let gridX: number, gridY: number;

    const p = p5Instance as unknown as p5;

    p.setup = function setup() {
      p.createCanvas(800, 800);
      gridX = p.width / count;
      gridY = p.height / count;
    };

    p.draw = function draw() {
      const colorOffset = 255 / count;
      p.background(20, 60, 255);
      p.noStroke();
      p.translate(0, 80);
      for (let i = 0; i < count + 1; i++) {
        // const colorOffset = Math.sin(i / 500 + t / 2) * 60;

        p.fill(0, i * colorOffset, 255);
        const offset = Math.sin(i / (count / 15)) * (p.width / 2);
        p.ellipse(
          p.width / 2 + offset,
          i * gridY + Math.sin(i / 40) * 80,
          gridX * 650
        );
      }
      t += 0.04;
    };
  }, app);
}

init();
