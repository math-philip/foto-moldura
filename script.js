document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                openEditor(img);
            };
        };
        reader.readAsDataURL(file);
    }
});

function openEditor(img) {
    const editorWindow = window.open('upload.html', '_self');
    editorWindow.onload = function() {
        const container = document.createElement('div');
        container.id = 'imageContainer';

        const uploadedImage = document.createElement('img');
        uploadedImage.id = 'uploadedImage';
        uploadedImage.src = img.src;

        const frame = document.createElement('img');
        frame.id = 'frame';
        frame.src = 'images/moldura.png';

        container.appendChild(uploadedImage);
        container.appendChild(frame);

        document.body.appendChild(container);

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Pronto';
        doneButton.onclick = function() {
            saveImage();
        };

        document.body.appendChild(doneButton);
    };
}

function saveImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('uploadedImage');
    const frame = document.getElementById('frame');

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    ctx.drawImage(frame, 0, 0, img.width, img.height);

    const finalImage = canvas.toDataURL('image/png');
    const finalImageWindow = window.open('final.html', '_self');
    finalImageWindow.onload = function() {
        document.getElementById('finalImage').src = finalImage;
    };
}

function downloadImage() {
    const img = document.getElementById('finalImage').src;
    const link = document.createElement('a');
    link.href = img;
    link.download = 'foto-moldura.png';
    link.click();
}
