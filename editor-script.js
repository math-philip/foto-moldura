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
                        img.setAttribute('data-x', x);
                        img.setAttribute('data-y', y);
                        img.setAttribute('data-scale', scale);
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
            img.setAttribute('data-scale', scale);
        });

        document.getElementById('zoomIn').addEventListener('click', function() {
            const slider = document.getElementById('zoomSlider');
            slider.value = Math.min(parseFloat(slider.value) + 0.1, 3);
            scale = slider.value;
            img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            img.setAttribute('data-scale', scale);
        });

        document.getElementById('zoomOut').addEventListener('click', function() {
            const slider = document.getElementById('zoomSlider');
            slider.value = Math.max(parseFloat(slider.value) - 0.1, 0.5);
            scale = slider.value;
            img.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
            img.setAttribute('data-scale', scale);
        });

        document.getElementById('doneButton').addEventListener('click', function() {
            saveImage();
        });
    } else {
        window.location.href = 'upload.html';
    }
});

function saveImage() {
    const container = document.getElementById('container');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('uploadedImage');
    const frame = document.getElementById('frame');

    const scale = parseFloat(img.getAttribute('data-scale')) || 1;
    const offsetX = parseFloat(img.getAttribute('data-x')) || 0;
    const offsetY = parseFloat(img.getAttribute('data-y')) || 0;

    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    // Ajustar tamanho do canvas para a imagem final (1080x1080)
    canvas.width = 1080;
    canvas.height = 1080;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calcular a posição e tamanho da imagem cortada no canvas
    const drawWidth = containerRect.width * scale;
    const drawHeight = containerRect.height * scale;
    const drawX = (containerRect.width - imgRect.width) / 2 + offsetX;
    const drawY = (containerRect.height - imgRect.height) / 2 + offsetY;

    // Desenhar a imagem ajustada no canvas
    ctx.drawImage(
        img,
        drawX,
        drawY,
        drawWidth,
        drawHeight
    );

    // Redimensionar a imagem cortada para 1080x1080
    const resizedCanvas = document.createElement('canvas');
    const resizedCtx = resizedCanvas.getContext('2d');
    resizedCanvas.width = 1080;
    resizedCanvas.height = 1080;
    resizedCtx.drawImage(canvas, 0, 0, 1080, 1080);

    // Desenhar a moldura no canvas redimensionado
    resizedCtx.drawImage(frame, 0, 0, 1080, 1080);

    // Teste para garantir que a imagem final foi criada
    console.log('Imagem final criada');

    const finalImageSrc = resizedCanvas.toDataURL('image/png');
    localStorage.setItem('finalImage', finalImageSrc);

    window.location.href = 'final.html';
}
