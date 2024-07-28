document.addEventListener('DOMContentLoaded', function() {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const img = document.getElementById('uploadedImage');
        img.src = uploadedImage;

        interact('#uploadedImage')
            .draggable({
                listeners: {
                    move(event) {
                        const x = (parseFloat(img.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(img.getAttribute('data-y')) || 0) + event.dy;

                        img.style.transform = `translate(${x}px, ${y}px)`;
                        img.setAttribute('data-x', x);
                        img.setAttribute('data-y', y);
                    }
                },
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true
                    })
                ],
                inertia: true
            })
            .gesturable({
                listeners: {
                    start(event) {
                        // Start scaling
                    },
                    move(event) {
                        const scale = (parseFloat(img.getAttribute('data-scale')) || 1) * event.scale;
                        img.style.transform = `translate(${parseFloat(img.getAttribute('data-x')) || 0}px, ${parseFloat(img.getAttribute('data-y')) || 0}px) scale(${scale})`;
                        img.setAttribute('data-scale', scale);
                    }
                }
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

    canvas.width = img.offsetWidth;
    canvas.height = img.offsetHeight;

    ctx.drawImage(img, 0, 0, img.width * (parseFloat(img.getAttribute('data-scale')) || 1), img.height * (parseFloat(img.getAttribute('data-scale')) || 1));
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    const finalImageSrc = canvas.toDataURL('image/png');
    localStorage.setItem('finalImage', finalImageSrc);

    window.location.href = 'final.html';
}
