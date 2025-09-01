const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

console.log(ctx);
const W = canvas.width = 500;
const H = canvas.height = 300;


let datas = [
    { high: 35, low: 22 },
    { high: 37, low: 24 },
    { high: 37, low: 25 },
    { high: 34, low: 24 },
    { high: 33, low: 23 }
];

const padding = 40;
const stepX = (W - padding*2) / (datas.length - 1);

let highs = datas.map(d => d.high);
let lows = datas.map(d => d.low);
let maxT = Math.max(...highs);
let minT = Math.min(...lows);

const stepY = (H - padding*2) / (maxT - minT);

function getXY(index, value) {
    let x = padding + stepX * index;
    let y = H - padding - (value - minT) * stepY;
    return {x, y}
}

function drawLine(dataKey, color, offset) {
    ctx.beginPath();
    dataKey.forEach((value, i) => {
        let {x, y} = getXY(i, value);
        if(i===0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    dataKey.forEach((value, i) => {
         let {x, y} = getXY(i, value);

         ctx.beginPath();
         ctx.arc(x, y, 4, 0, Math.PI * 2);
         ctx.fillStyle = color;
         ctx.fill();


         ctx.fillStyle = color;
         ctx.font = "14px sans-serif";
         ctx.textAlign = "center";
         ctx.fillText(value+'℃', x, y - offset);

    })
}

drawLine(highs, 'red', 8);
drawLine(lows, 'blue', -24);