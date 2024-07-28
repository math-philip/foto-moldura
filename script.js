document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgSrc = e.target.result;
                // Salva o caminho da imagem no localStorage
                localStorage.setItem('uploadedImage', imgSrc);
                // Redireciona para a página de edição
                window.location.href = 'editor.html';
            };
            reader.readAsDataURL(file);
        }
    });
});
