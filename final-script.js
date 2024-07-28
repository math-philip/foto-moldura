document.addEventListener('DOMContentLoaded', function() {
    const finalImageSrc = localStorage.getItem('finalImage');
    if (finalImageSrc) {
        const finalImage = document.getElementById('finalImage');
        finalImage.src = finalImageSrc;
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = finalImageSrc;
    } else {
        window.location.href = 'index.html';
    }
});
