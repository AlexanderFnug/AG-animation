document.addEventListener('DOMContentLoaded', () => {
    const word1 = "MB";
    const word2 = "KG";
    const density2 = `${word1} ${word2}.`;
    
    let canvas2, ctx2;
    let radii2 = [];
    let heights2 = [];
    let circleIndex2 = 0;
    const maxCircles2 = 200;
    const maxRadius2 = 800;
    const growthRate2 = 0.3;
    const delayBetweenCircles2 = 5;
    let frameCountDelay2 = 0;
    let heightGrowthRate2;

    const asciiDiv2 = document.getElementById('ascii-art');

    function setup() {
        canvas2 = document.createElement('canvas');
        canvas2.width = window.innerWidth/4;
        canvas2.height = window.innerHeight;
        ctx2 = canvas2.getContext('2d');
        //document.body.appendChild(canvas2);

        for (let i = 0; i < maxCircles2; i++) {
            radii2.push(0);
            heights2.push(0);
        }

        draw();
    }

    function draw() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.strokeStyle = 'white';
        ctx2.lineWidth = 1;
        ctx2.save();
        ctx2.translate(canvas2.width / 4, canvas2.height / 8);

        for (let i = 0; i < maxCircles2; i++) {
            ctx2.beginPath();
            ctx2.ellipse(0, 0, radii2[i], heights2[i], 0, 0, 2 * Math.PI);
            ctx2.stroke();
            ctx2.rotate(2 * Math.PI / maxCircles2);
            heightGrowthRate2 = i / 64;
        }

        ctx2.restore();

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

        generateAsciiArt2();
        requestAnimationFrame(draw);
    }

    function generateAsciiArt2() {
        const imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
        const pixels2 = imageData2.data;
        let asciiImage2 = '';

        for (let j = 0; j < canvas2.height; j += 2) {
            for (let i = 0; i < canvas2.width; i += 2) {
                const pixelIndex2 = 4 * (i + j * canvas2.width);
                const r2 = pixels2[pixelIndex2];
                const g2 = pixels2[pixelIndex2 + 1];
                const b2 = pixels2[pixelIndex2 + 2];
                const avg2 = (r2 + g2 + b2) / 3;
                const len2 = density2.length;
                const charIndex2 = Math.floor(map(avg2, 0, 255, len2 - 1, 0));
                const c2 = density2.charAt(charIndex2);
                asciiImage2 += c2 === " " ? "&nbsp;" : c2;
            }
            asciiImage2 += "<br/>";
        }
        asciiDiv2.innerHTML = asciiImage2;
    }

    function map(value, start1, stop1, start2, stop2) {
        return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    }

    setup();
});
