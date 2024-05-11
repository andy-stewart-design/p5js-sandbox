import "@styles/style.css";
import p5 from "p5";

function init() {
  const app = document.getElementById("app");
  if (!app) return;

  let value = 0;

  new p5((p5Instance) => {
    const count = 1000;
    let t = 0;
    let gridX: number, gridY: number;

    const p = p5Instance as unknown as p5;

    p.setup = function setup() {
      p.createCanvas(800, 800);
      // p.colorMode("hsl");
      gridX = p.width / count;
      gridY = p.height / count;
    };

    p.draw = function draw() {
      const colorOffset = 255 / count;
      p.background(0);
      p.noStroke();
      for (let i = 0; i < count + 1; i++) {
        // const colorOffset = Math.sin(i / 500 + t / 2) * 60;
        console.log(i * colorOffset);

        p.fill(0, i * colorOffset, 255);
        const offset =
          Math.sin(i / (count / (24 - value)) + t) * (p.width / 2.5);
        p.ellipse(
          p.width / 2 + offset,
          i * gridY + Math.sin(i / 30 + t * 3) * 30,
          gridX * 650
        );
      }
      t += 0.04;
    };
  }, document.getElementById("app")!);

  const min = 0;
  const max = 15;
  const step = 0.01;
  const slider = document.createElement("input");
  slider.type = "range";
  slider.min = String(min);
  slider.max = String(max);
  slider.step = String(step);
  slider.value = String(value);
  slider.addEventListener("input", (e: Event) => {
    // @ts-expect-error
    const newValue = e.target.value as number;
    value = newValue;
    console.log("value", value);
  });
  app.append(slider);
}

init();

// function createSlider(
//   value: number,
//   parent: HTMLElement,
//   min = 0,
//   max = 1,
//   step = 0.1
// ) {
//   const slider = document.createElement("input");
//   slider.type = "range";
//   slider.min = String(min);
//   slider.max = String(max);
//   slider.step = String(step);
//   slider.value = String(value);
//   slider.addEventListener("input", (e) => {
//     // @ts-expect-error
//     const newValue = e.target.value as number;
//     value = newValue;
//     console.log("value", value);
//   });
//   parent.append(slider);
// }
