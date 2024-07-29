document.addEventListener('DOMContentLoaded', function() {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const img = document.getElementById('uploadedImage');
        img.src = uploadedImage;

        const cropper = new Cropper(img, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
            movable: false,  // Desativa o movimento da caixa de corte
            zoomable: false, // Desativa o zoom da caixa de corte
            rotatable: false,
            scalable: false,
            cropBoxResizable: false, // Desativa o redimensionamento da caixa de corte
            ready() {
                const frame = document.getElementById('frame');
                frame.style.width = this.cropper.getCropBoxData().width + 'px';
                frame.style.height = this.cropper.getCropBoxData().height + 'px';
                frame.style.left = this.cropper.getCropBoxData().left + 'px';
                frame.style.top = this.cropper.getCropBoxData().top + 'px';
            }
        });

        // Adiciona a funcionalidade de arrastar a imagem de fundo
        interact('#uploadedImage')
            .draggable({
                listeners: {
                    move(event) {
                        const { target } = event;
                        const dataX = parseFloat(target.getAttribute('data-x')) || 0;
                        const dataY = parseFloat(target.getAttribute('data-y')) || 0;

                        target.style.transform = `translate(${dataX + event.dx}px, ${dataY + event.dy}px)`;
                        target.setAttribute('data-x', dataX + event.dx);
                        target.setAttribute('data-y', dataY + event.dy);
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

        document.getElementById('doneButton').addEventListener('click', function() {
            saveImage(cropper);
        });
    } else {
        window.location.href = 'upload.html';
    }
});

function saveImage(cropper) {
    const canvas = cropper.getCroppedCanvas({
        width: 1080,
        height: 1080
    });

    const frame = document.getElementById('frame');
    const frameImg = new Image();
    frameImg.src = frame.src;
    frameImg.onload = function() {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        const finalImageSrc = canvas.toDataURL('image/png');
        localStorage.setItem('finalImage', finalImageSrc);
        window.location.href = 'final.html';
    };
}
