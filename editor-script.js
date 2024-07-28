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
    const img = document.getElementById('uploadedImage');
    const frame = document.getElementById('frame');

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const scale = parseFloat(img.getAttribute('data-scale')) || 1;
    const offsetX = parseFloat(img.getAttribute('data-x')) || 0;
    const offsetY = parseFloat(img.getAttribute('data-y')) || 0;

    // Defina o tamanho do canvas para corresponder ao tamanho do container
    const containerRect = container.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    // Desenhe a imagem ajustada no canvas
    ctx.drawImage(img,
        -offsetX + (containerRect.width / 2 - (img.naturalWidth * scale) / 2),
        -offsetY + (containerRect.height / 2 - (img.naturalHeight * scale) / 2),
        img.naturalWidth * scale,
        img.naturalHeight * scale
    );

    // Desenhe a moldura no canvas
    ct
