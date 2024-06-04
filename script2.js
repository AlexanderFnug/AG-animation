//const density = '       .:-i|=+%O#@';
const density = "Ñ@#W$9876543210?!abc;:+=-,._                    ";

let buffer;
let asciiDiv;
let angle = 0;

function setup() {
  noCanvas();
  buffer = createGraphics(window.width, window.height);
  buffer.angleMode(DEGREES);
  asciiDiv = createDiv();
}

function draw() {
   buffer.background(255);
  buffer.push();
  buffer.translate(buffer.width / 2, buffer.height / 2);
  buffer.rotate(angle);
  buffer.noFill();
  buffer.stroke(0);
  buffer.strokeWeight(2);
  buffer.beginShape();
  buffer.vertex(-40, -40);
  buffer.circle(50, 50, 25);
  buffer.endShape(CLOSE);
  buffer.pop();
  angle += 0.5;

  // Use the buffer as the image for the ASCII art
  buffer.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < buffer.height; j++) {
    for (let i = 0; i < buffer.width; i++) {
      const pixelIndex = (i + j * buffer.width) * 4;
      const r = buffer.pixels[pixelIndex + 0];
      const g = buffer.pixels[pixelIndex + 1];
      const b = buffer.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += "<br/>";
  }
  asciiDiv.html(asciiImage);
}
