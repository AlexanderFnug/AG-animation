const sketch1 = (p) => {
    const density = 'mb%*o!;:,. ';
  
    let buffer;
    let asciiDiv;
    let radii = [];
    let heights = [];
    let circleIndex = 0;
    let maxCircles = 30;
    let maxRadius = 400;
    let growthRate = 2;
    let heightGrowthRate // Adjust this to change the vertical growth rate
    let delayBetweenCircles = 5;
    let frameCountDelay = 0;
  
    p.setup = () => {
      p.noCanvas();
      buffer = p.createGraphics(p.windowWidth, p.windowHeight);
      buffer.angleMode(p.DEGREES);
      buffer.clear(); // Clear the buffer to make it transparent
      asciiDiv = p.createDiv();
      asciiDiv.id("ascii-art");
  
      for (let i = 0; i < maxCircles; i++) {
        radii.push(0);
        heights.push(0);
        
      }
    }
  
    p.draw = () => {
      buffer.clear(); // Clear the buffer to maintain transparency
      buffer.noFill();
      buffer.stroke(255);
      buffer.strokeWeight(1);
  
      buffer.push();
      buffer.translate(buffer.width / 4, buffer.height / 8);
  
      for (let i = 0; i < maxCircles; i++) {
        buffer.ellipse(0, 0, radii[i], heights[i]);
        //buffer.rotate(360 / maxCircles);
        heightGrowthRate = i/8 + 1;
      }
  
      buffer.pop();
  
      frameCountDelay++;
      if (frameCountDelay >= delayBetweenCircles) {
        if (circleIndex < maxCircles - 1) {
          circleIndex++;
        }
        frameCountDelay = 0;
      }
  
      for (let i = 0; i <= circleIndex; i++) {
        if (radii[i] < maxRadius) {
          radii[i] += growthRate;
          heights[i] += heightGrowthRate;
        }
      }
  
      if (circleIndex == maxCircles - 1 && radii[circleIndex] >= maxRadius) {
        radii = radii.map(() => 0);
        heights = heights.map(() => 0);
        circleIndex = 0;
      }
  
      // Generate the ASCII art
      buffer.loadPixels();
      let asciiImage = "";
      for (let j = 0; j < buffer.height; j += 8) {
        for (let i = 0; i < buffer.width; i += 2) {
          const pixelIndex = 4 * (i + j * buffer.width);
          const r = buffer.pixels[pixelIndex + 0];
          const g = buffer.pixels[pixelIndex + 1];
          const b = buffer.pixels[pixelIndex + 2];
          const avg = (r + g + b) / 3;
          const len = density.length;
          const charIndex = Math.floor(p.map(avg, 0, 255, len - 1, 0));
          const c = density.charAt(charIndex);
          asciiImage += c === " " ? "&nbsp;" : c;
        }
        asciiImage += "<br/>";
      }
      asciiDiv.html(asciiImage);
    }
  };
  
  new p5(sketch1);
  