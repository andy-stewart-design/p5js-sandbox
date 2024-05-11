import "@styles/style.css";
import p5 from "p5";

interface Circle {
  x: number;
  y: number;
  r: number;
  o: number;
  vX: number;
  vY: number;
  colors: number[];
}

function init() {
  const app = document.getElementById("app");
  if (!app) return;

  new p5((p5Instance) => {
    const p = p5Instance as unknown as p5;

    let circles: Circle[] = [];

    p.setup = function setup() {
      p.createCanvas(800, 800);
      p.noStroke();
    };

    p.draw = function draw() {
      p.background(0);
      for (let i = 0; i < circles.length; i++) {
        const circle = circles[i];
        circle.o -= 6;
        circle.y += circle.vY;
        circle.x += circle.vX;
        circle.vX *= 0.85;
        circle.vY *= 0.85;
        // const colorSelector = Math.random();
        // if (colorSelector >= 0 && colorSelector < 0.33)
        //   p.fill(0, 0, 255, circle.o);
        // else if (colorSelector >= 0.33 && colorSelector < 0.66)
        //   p.fill(255, 0, 0, circle.o);
        // else p.fill(255, 255, 255, circle.o);

        const [r, g, b] = circle.colors;
        p.fill(r, g, b, circle.o);

        p.ellipse(circle.x, circle.y, circle.r);
      }

      circles = circles.filter((c) => c.o > 0);
    };

    p.mouseClicked = function mouseClicked() {
      createCircle(100);
    };

    p.mouseDragged = function mouseDragged() {
      createCircle();
    };

    function createCircle(amount = 15) {
      for (let i = 0; i < amount; i++) {
        const directionX = Math.random() - 0.5 >= 0 ? 1 : -1;
        const directionY = Math.random() - 0.5 >= 0 ? 1 : -1;

        const colorSelector = Math.random();
        console.log(colorSelector);

        const colorArray =
          colorSelector >= 0 && colorSelector < 0.33
            ? [50, 125, 255]
            : colorSelector >= 0.33 && colorSelector < 0.66
            ? [255, 0, 0]
            : [255, 255, 255];

        circles.push({
          x: p.mouseX,
          y: p.mouseY,
          r: Math.random() * 12,
          o: 255,
          vX: Math.random() * 20 * directionX,
          vY: Math.random() * 20 * directionY,
          colors: colorArray,
        });
      }
    }
  }, app);
}

init();
