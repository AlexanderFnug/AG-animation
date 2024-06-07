const sketch2 = (p) => {
    let word1 = "MB"
    let word2 = "KG"
    const density2 = `B${word1} ${word2} `;
  
    let buffer2;
    let asciiDiv2;
    let radii2 = [];
    let heights2 = [];
    let circleIndex2 = 0;
    let maxCircles2 = 30;
    let maxRadius2 = 400;
    let growthRate2 = 2;
    let heightGrowthRate2; // Adjust this to change the vertical growth rate
    let delayBetweenCircles2 = 5;
    let frameCountDelay2 = 0;
  
    p.setup = () => {
      p.noCanvas();
      buffer2 = p.createGraphics(p.windowWidth, p.windowHeight);
      buffer2.angleMode(p.DEGREES);
      buffer2.clear(); // Clear the buffer to make it transparent
      asciiDiv2 = p.createDiv();
      asciiDiv2.id("ascii-art2");
  
      for (let i = 0; i < maxCircles2; i++) {
        radii2.push(0);
        heights2.push(0);
      }
    }
  
    p.draw = () => {
      buffer2.clear(); // Clear the buffer to maintain transparency
      buffer2.noFill();
      buffer2.stroke(255);
      buffer2.strokeWeight(1);
  
      buffer2.push();
      buffer2.translate(buffer2.width / 4, buffer2.height / 8);
  
      for (let i = 0; i < maxCircles2; i++) {
        buffer2.ellipse(0, 0, radii2[i], heights2[i]);
        buffer2.rotate(360 / maxCircles2);
        heightGrowthRate2 = i / 8 + 1;
      }
  
      buffer2.pop();
  
      frameCountDelay2++;
      if (frameCountDelay2 >= delayBetweenCircles2) {
        if (circleIndex2 < maxCircles2 - 1) {
          circleIndex2++;
        }
        frameCountDelay2 = 0;
      }
  
      for (let i = 0; i <= circleIndex2; i++) {
        if (radii2[i] < maxRadius2) {
          radii2[i] += growthRate2;
          heights2[i] += heightGrowthRate2;
        }
      }
  
      if (circleIndex2 == maxCircles2 - 1 && radii2[circleIndex2] >= maxRadius2) {
        radii2 = radii2.map(() => 0);
        heights2 = heights2.map(() => 0);
        circleIndex2 = 0;
      }
  
      // Generate the ASCII art
      buffer2.loadPixels();
      let asciiImage2 = "";
      for (let j = 0; j < buffer2.height; j += 8) {
        for (let i = 0; i < buffer2.width; i += 2) {
          const pixelIndex2 = 4 * (i + j * buffer2.width);
          const r = buffer2.pixels[pixelIndex2 + 0];
          const g = buffer2.pixels[pixelIndex2 + 1];
          const b = buffer2.pixels[pixelIndex2 + 2];
          const avg2 = (r + g + b) / 3;
          const len2 = density2.length;
          const charIndex2 = Math.floor(p.map(avg2, 0, 255, len2 - 1, 0));
          const c = density2.charAt(charIndex2);
          asciiImage2 += c === " " ? "&nbsp;" : c;
        }
        asciiImage2 += "<br/>";
      }
      asciiDiv2.html(asciiImage2);
    }
  };
  
  new p5(sketch2);
