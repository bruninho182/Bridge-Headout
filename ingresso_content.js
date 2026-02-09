function executarPreenchimento(d) {
    if (!d || !d.nome) return;

    // Buscamos o nome do usuário configurado
    chrome.storage.local.get("usuarioConfigurado", (config) => {
        const nomeUsuario = config.usuarioConfigurado || "Sem Nome";
        
        function preencherAposTexto(numero, valor) {
            const todosElementos = Array.from(document.querySelectorAll('td, span, font, b'));
            const elementoAlvo = todosElementos.find(el => el.innerText.trim() === numero.toString());

            if (elementoAlvo) {
                const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]), select'));
                const inputCorreto = inputs.find(input => 
                    elementoAlvo.compareDocumentPosition(input) & Node.DOCUMENT_POSITION_FOLLOWING
                );

                if (inputCorreto) {
                    inputCorreto.value = valor;
                    inputCorreto.dispatchEvent(new Event('input', { bubbles: true }));
                    inputCorreto.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }
        }

        // Preenchimento baseado no seu mapeamento:
        preencherAposTexto(2, d.nome);      // GUEST NAME -> 2
        preencherAposTexto(3, d.bookingId); // BOOKING ID -> 3
        preencherAposTexto(4, d.email);     // EMAIL -> 4

        // REGRA ESPECIAL CAMPO 15: "ID - Nome Usuario"
        const valorFormatadoCV = `${d.bookingId} - ${nomeUsuario}`;
        preencherAposTexto(15, valorFormatadoCV);
        
        console.log("✅ Preenchimento Headout concluído!");
    });
}

// Escuta quando os dados da Headout são salvos
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.bridgeData?.newValue) {
        executarPreenchimento(changes.bridgeData.newValue);
        // Opcional: remover após preencher
        chrome.storage.local.remove("bridgeData");
    }
});

// Tenta executar ao carregar a página caso o dado já esteja lá
chrome.storage.local.get("bridgeData", (res) => {
    if (res.bridgeData) {
        executarPreenchimento(res.bridgeData);
    }
});