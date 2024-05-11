import "@styles/style.css";
import p5 from "p5";

function init() {
  const app = document.getElementById("app");
  if (!app) return;

  new p5((p5Instance) => {
    const p = p5Instance as unknown as p5;

    const canvasX = 800;
    const canvasY = canvasX;
    const inc = p.TWO_PI / 120;
    const noiseMax = 0.75;

    p.setup = function setup() {
      p.createCanvas(canvasX, canvasY);
      p.colorMode("hsl");
      p.noStroke();
    };

    let t = 0;

    p.draw = function draw() {
      p.background(0);
      p.translate(p.width / 2, p.height / 2);

      p.beginShape();

      for (let a = 0; a <= p.TWO_PI + inc; a += inc) {
        let xOff = p.map(Math.sin(a), -1, 1, 0, noiseMax);
        let yOff = p.map(Math.cos(a), -1, 1, 0, noiseMax);
        const r = p.map(p.noise(xOff * 0.6, yOff * 0.6, t), 0, 1, 100, 400);
        const x = Math.sin(a) * r;
        const y = Math.cos(a) * r;

        p.stroke(255);
        p.strokeWeight(1);
        p.noFill();
        p.vertex(x, y);
        // p.vertex(x / 3, y / 3);
      }
      p.endShape();

      t += 0.02;
      // p.noLoop();
    };
  }, app);
}

init();
