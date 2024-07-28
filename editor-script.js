document.addEventListener('DOMContentLoaded', function() {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const img = document.getElementById('uploadedImage');
        img.src = uploadedImage;

        let scale = 1;
        let x = 0;
        let y = 0;

        interact('#uploadedImage')
            .draggable({
                listeners: {
                    move(event) {
                        x += event.dx;
                        y += event.dy;
                        img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
                    }
                },
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                inertia: true
            });

        document.getElementById('zoomSlider').addEventListener('input', function(event) {
            scale = event.target.value;
            img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        });

        document.getElementById('zoomIn').addEventListener('click', function() {
            const slider = document.getElementById('zoomSlider');
            slider.value = Math.min(parseFloat(slider.value) + 0.1, 3);
            scale = slider.value;
            img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        });

        document.getElementById('zoomOut').addEventListener('click', function() {
            const slider = document.getElementById('zoomSlider');
            slider.value = Math.max(parseFloat(slider.value) - 0.1, 0.5);
            scale = slider.value;
            img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        });

        document.getElementById('doneButton').addEventListener('click', function() {
            saveImage();
        });
    } else {
        window.location.href = 'upload.html';
    }
});

function saveImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('uploadedImage');
    const frame = document.getElementById('frame');

    canvas.width = frame.offsetWidth;
    canvas.height = frame.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calcula o scale, eixos e dimensões da imagem
    const scale = parseFloat(img.getAttribute('data-scale')) || 1;
    const imgWidth = img.naturalWidth * scale;
    const imgHeight = img.naturalHeight * scale;
    const offsetX = parseFloat(img.getAttribute('data-x')) || 0;
    const offsetY = parseFloat(img.getAttribute('data-y')) || 0;

    // Desenha a imagem ajustada no canvas
    ctx.drawImage(img,
        -offsetX,
        -offsetY,
        imgWidth,
        imgHeight
    );
    
    // Desenha a moldura no canvas
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    const finalImageSrc = canvas.toDataURL('image/png');
    localStorage.setItem('finalImage', finalImageSrc);

    window.location.href = 'final.html';
}
