const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const penSizeSlider = document.getElementById('penSize');
const eraserSizeSlider = document.getElementById('eraserSize');
const penButton = document.getElementById('penButton');
const eraserButton = document.getElementById('eraserButton');
const rectButton = document.getElementById('rectButton');
const squareButton = document.getElementById('squareButton');
const circleButton = document.getElementById('circleButton');
const triangleButton = document.getElementById('triangleButton');
const clearButton = document.getElementById('clearButton');
const undoButton = document.getElementById('undoButton');
const fullscreenButton = document.getElementById('fullscreenButton');

let drawing = false;
let penColor = '#000000'; // Varsayılan kalem rengi siyah
let penSize = 5; // Varsayılan kalem boyutu
let eraserSize = 10; // Varsayılan silgi boyutu
let eraserMode = false;
let shapeMode = null; // Şekil modu başlangıçta yok
let startX, startY; // Başlangıç koordinatları
let undoStack = []; // Geri alma işlemi için yığın

const buttons = {
    pen: penButton,
    eraser: eraserButton,
    rectangle: rectButton,
    square: squareButton,
    circle: circleButton,
    triangle: triangleButton
};

function resetActiveButton() {
    // Aktif olan butonları sıfırlamak için
    for (let button of Object.values(buttons)) {
        button.classList.remove('active');
    }
}

function resizeCanvas() {
    // Canvas boyutunu pencere boyutuna göre yeniden ayarla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - document.querySelector('.toolbar').offsetHeight;
}

// Renk seçici olay dinleyicisi
colorPicker.addEventListener('input', (e) => {
    penColor = e.target.value;
});

// Kalem boyutu kaydırıcısı olay dinleyicisi
penSizeSlider.addEventListener('input', (e) => {
    penSize = e.target.value;
});

// Silgi boyutu kaydırıcısı olay dinleyicisi
eraserSizeSlider.addEventListener('input', (e) => {
    eraserSize = e.target.value;
});

// Kalem butonu tıklama olayı
penButton.addEventListener('click', () => {
    eraserMode = false;
    shapeMode = null;
    resetActiveButton();
    penButton.classList.add('active');
});

// Silgi butonu tıklama olayı
eraserButton.addEventListener('click', () => {
    eraserMode = true;
    shapeMode = null;
    resetActiveButton();
    eraserButton.classList.add('active');
});

// Dikdörtgen çizim modu
rectButton.addEventListener('click', () => {
    shapeMode = 'rectangle';
    resetActiveButton();
    rectButton.classList.add('active');
});

// Kare çizim modu
squareButton.addEventListener('click', () => {
    shapeMode = 'square';
    resetActiveButton();
    squareButton.classList.add('active');
});

// Daire çizim modu
circleButton.addEventListener('click', () => {
    shapeMode = 'circle';
    resetActiveButton();
    circleButton.classList.add('active');
});

// Üçgen çizim modu
triangleButton.addEventListener('click', () => {
    shapeMode = 'triangle';
    resetActiveButton();
    triangleButton.classList.add('active');
});

// Temizleme butonu
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack = [];
});

// Geri alma butonu
undoButton.addEventListener('click', () => {
    if (undoStack.length > 0) {
        const imageData = undoStack.pop();
        ctx.putImageData(imageData, 0, 0);
    }
});

// Canvas üzerinde fare basıldığında
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.clientX - canvas.offsetLeft;
    startY = e.clientY - canvas.offsetTop;
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.beginPath();
});

// Fare hareket ettiğinde
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        if (!shapeMode && !eraserMode) {
            drawFreehand(e);
        } else if (eraserMode) {
            erase(e);
        }
    }
});

// Fare bırakıldığında
canvas.addEventListener('mouseup', () => {
    if (drawing) {
        drawing = false;
        if (shapeMode) {
            drawShape();
        }
    }
});

// Serbest çizim işlevi
function drawFreehand(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    ctx.lineTo(x, y);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

// Silgi işlevi
function erase(e) {
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    ctx.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
}

// Şekil çizim işlevi
function drawShape() {
    const endX = event.clientX - canvas.offsetLeft;
    const endY = event.clientY - canvas.offsetTop;
    const width = endX - startX;
    const height = endY - startY;

    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;

    ctx.beginPath(); // Çizim yolunu başlat

    switch (shapeMode) {
        case 'rectangle':
            ctx.strokeRect(startX, startY, width, height);
            break;
        case 'square':
            const side = Math.min(Math.abs(width), Math.abs(height));
            ctx.strokeRect(startX, startY, side, side);
            break;
        case 'circle':
            const radius = Math.sqrt(width * width + height * height);
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 'triangle':
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + width, startY);
            ctx.lineTo(startX + width / 2, startY - height);
            ctx.closePath();
            ctx.stroke();
            break;
        default:
            break;
    }
}

// Tam ekran butonu
fullscreenButton.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch(err => console.error(err));
    } else {
        document.exitFullscreen();
    }
});

// Pencere boyutu değiştiğinde canvas'ı yeniden boyutlandır
window.addEventListener('resize', resizeCanvas);
document.addEventListener('fullscreenchange', resizeCanvas);

resizeCanvas(); // Sayfa yüklendiğinde canvas'ı doğru boyutlandır
