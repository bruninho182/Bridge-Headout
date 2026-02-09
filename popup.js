document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('operadorNome');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    // Carrega o nome que já estava salvo, se houver
    chrome.storage.local.get("usuarioConfigurado", (data) => {
        if (data.usuarioConfigurado) {
            input.value = data.usuarioConfigurado;
        }
    });

    // Salva o novo nome
    saveBtn.addEventListener('click', () => {
        const nome = input.value.trim();
        if (nome) {
            chrome.storage.local.set({ "usuarioConfigurado": nome }, () => {
                status.innerText = "Nome salvo com sucesso!";
                setTimeout(() => { status.innerText = ""; }, 2000);
            });
        }
    });
});