document.addEventListener('DOMContentLoaded', function() {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        const img = document.getElementById('uploadedImage');
        img.src = uploadedImage;

        const cropper = new Cropper(img, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
            movable: true,
            zoomable: true,
            rotatable: false,
            scalable: false,
            cropBoxResizable: false,
            ready() {
                const frame = document.getElementById('frame');
                frame.style.width = this.cropper.getCropBoxData().width + 'px';
                frame.style.height = this.cropper.getCropBoxData().height + 'px';
                frame.style.left = this.cropper.getCropBoxData().left + 'px';
                frame.style.top = this.cropper.getCropBoxData().top + 'px';
            },
            crop() {
                const frame = document.getElementById('frame');
                frame.style.width = this.cropper.getCropBoxData().width + 'px';
                frame.style.height = this.cropper.getCropBoxData().height + 'px';
                frame.style.left = this.cropper.getCropBoxData().left + 'px';
                frame.style.top = this.cropper.getCropBoxData().top + 'px';
            }
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
