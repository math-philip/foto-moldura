document.addEventListener('DOMContentLoaded', function() {
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
        // Cria elementos para exibir a imagem e a moldura
        const container = document.createElement('div');
        container.id = 'imageContainer';
        
        const img = new Image();
        img.id = 'uploadedImage';
        img.src = uploadedImage;

        const frame = new Image();
        frame.id = 'frame';
        frame.src = 'images/moldura.png';

        container.appendChild(img);
        container.appendChild(frame);

        document.body.appendChild(container);

        const doneButton = document.createElement('button');
        doneButton.textContent = 'Pronto';
        doneButton.onclick = function() {
            saveImage();
        };

        document.body.appendChild(doneButton);
    } else {
        // Caso não haja imagem carregada, redireciona de volta para a página de upload
        window.location.href = 'upload.html';
    }
});

function saveImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('uploadedImage');
    const frame = document.getElementById('frame');

    // Configura as dimensões do canvas
    canvas.width = img.width;
    canvas.height = img.height;

    // Desenha a imagem e a moldura no canvas
    ctx.drawImage(img, 0, 0);
    ctx.drawImage(frame, 0, 0, img.width, img.height);

    // Converte o canvas para uma URL de imagem
    const finalImageSrc = canvas.toDataURL('image/png');
    
    // Salva a URL da imagem final no localStorage
    localStorage.setItem('finalImage', finalImageSrc);
    
    // Redireciona para a página final
    window.location.href = 'final.html';
}
