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
            ctx.drawImage(img, 0, 0);
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
        window.location.href = 'index.html';
    }
});

function saveImage() {
    const imageCanvas = document.getElementById('imageCanvas');
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = imageCanvas.width;
    finalCanvas.height = imageCanvas.height;
    const finalCtx = finalCanvas.getContext('2d');

    const img = new Image();
    img.src = localStorage.getItem('uploadedImage');
    img.onload = function() {
        finalCtx.save();
        finalCtx.translate(-x + (finalCanvas.width / 2), -y + (finalCanvas.height / 2));
        finalCtx.scale(scale, scale);
        finalCtx.drawImage(img, 0, 0);
        finalCtx.restore();

        const frame = new Image();
        frame.src = 'path/to/your/frame.png'; // Substitua pelo caminho da sua moldura
        frame.onload = function() {
            finalCtx.drawImage(frame, 0, 0, finalCanvas.width, finalCanvas.height);
            const finalImageSrc = finalCanvas.toDataURL('image/png');
            localStorage.setItem('finalImage', finalImageSrc);
            window.location.href = 'final.html';
        };
    };
}
