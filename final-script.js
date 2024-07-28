document.addEventListener('DOMContentLoaded', function() {
    const finalImageSrc = localStorage.getItem('finalImage');
    if (finalImageSrc) {
        const img = document.getElementById('finalImage');
        img.src = finalImageSrc;

        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Baixar foto';
        downloadButton.onclick = function() {
            downloadImage(finalImageSrc);
        };

        document.body.appendChild(downloadButton);
    } else {
        // Caso não haja imagem final, redireciona de volta para a página de upload
        window.location.href = 'upload.html';
    }
});

function downloadImage(imageSrc) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'foto-moldura.png';
    link.click();
}
