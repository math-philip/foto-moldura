// editor-script.js
document.addEventListener('DOMContentLoaded', function() {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const img = new Image();
        img.src = uploadedImage;
        const imageCanvas = document.getElementById('imageCanvas');
        const ctx = imageCanvas.getContext('2d');
        const zoomSlider = document.getElementById('zoomSlider');
        const zoomInButton = document.getElementById('zoomIn');
        const zoomOutButton = document.getElementById('zoomOut');
        const doneButton = document.getElementById('doneButton');
        let scale = parseFloat(zoomSlider.value) || 1;
        let x = 0;
        let y = 0;
        let isDragging = false;

        imageCanvas.width = 500;
        imageCanvas.height = 500;

        img.onload = function() {
            drawImage();
        };

        function drawImage() {
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, img.width, img.height);
            ctx.restore();
        }

        zoomSlider.addEventListener('input', function() {
            scale = parseFloat(zoomSlider.value);
            drawImage();
        });

        zoomInButton.addEventListener('click', function() {
            scale = Math.min(scale + 0.1, 3);
            zoomSlider.value = scale;
            drawImage();
        });

        zoomOutButton.addEventListener('click', function() {
            scale = Math.max(scale - 0.1, 0.5);
            zoomSlider.value = scale;
            drawImage();
        });

        imageCanvas.addEventListener('mousedown', function(event) {
            isDragging = true;
        });

        imageCanvas.addEventListener('mouseup', function() {
            isDragging = false;
        });

        imageCanvas.addEventListener('mousemove', function(event) {
            if (isDragging) {
                x += event.movementX;
                y += event.movementY;
                drawImage();
            }
        });

        doneButton.addEventListener('click', function() {
            saveImage();
        });
    } else {
        window.location.href = 'upload.html';
    }
});

function saveImage() {
    const imageCanvas = document.getElementById('imageCanvas');
    const ctx = imageCanvas.getContext('2d');
    const img = document.querySelector('#imageCanvas img');
    const frame = new Image();
    frame.src = 'https://frame.twibbonize.com/679bb025-afc8-4ccd-b69f-3e11f8e43099.png'; // URL da moldura
    const scale = parseFloat(document.getElementById('zoomSlider').value) || 1;
    const offsetX = parseFloat(document.getElementById('imageCanvas').getAttribute('data-x')) || 0;
    const offsetY = parseFloat(document.getElementById('imageCanvas').getAttribute('data-y')) || 0;

    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');
    finalCanvas.width = imageCanvas.width;
    finalCanvas.height = imageCanvas.height;

    finalCtx.translate(-offsetX + (finalCanvas.width / 2), -offsetY + (finalCanvas.height / 2));
    finalCtx.scale(scale, scale);
    finalCtx.drawImage(img, 0, 0);

    frame.onload = function() {
        finalCtx.drawImage(frame, 0, 0, finalCanvas.width, finalCanvas.height);

        const finalImageSrc = finalCanvas.toDataURL('image/png');
        localStorage.setItem('finalImage', finalImageSrc);
        window.location.href = 'final.html';
    };
}
