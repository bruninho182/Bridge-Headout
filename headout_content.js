console.log("Bridge Extension: Headout Script V6 - Monitoramento Ativo");

const delay = ms => new Promise(res => setTimeout(res, ms));

// Função que tenta achar o e-mail várias vezes após o clique
async function waitForEmail(cell, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
        const text = cell.innerText || "";
        const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        
        if (match) {
            console.log("✅ E-mail encontrado após tentativa:", i + 1);
            return match[0];
        }
        
        console.log(`⏳ Tentativa ${i + 1}: E-mail ainda não apareceu...`);
        await delay(500); // Espera meio segundo entre tentativas
    }
    return "";
}

async function extractData(row) {
    const headers = Array.from(document.querySelectorAll('th')).map(th => th.innerText.trim().toUpperCase());
    const cells = row.cells;

    const idxId = headers.indexOf("BOOKING ID");
    const idxName = headers.indexOf("GUEST NAME");
    const idxDetails = headers.indexOf("ADDITIONAL DETAILS");

    const detailsCell = cells[idxDetails];
    let email = "";

    if (detailsCell) {
        // 1. Verifica se o e-mail já está visível
        const existingMatch = detailsCell.innerText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        
        if (existingMatch) {
            email = existingMatch[0];
        } else {
            // 2. Se não estiver, procura o link para clicar
            // Tentamos encontrar especificamente pelo texto "View"
            const allLinks = Array.from(detailsCell.querySelectorAll('a, span, div, p'));
            const viewBtn = allLinks.find(el => el.innerText.toLowerCase().includes('view'));

            if (viewBtn) {
                console.log("🖱️ Clicando para revelar detalhes...");
                viewBtn.click();
                // 3. Aguarda ativamente o e-mail aparecer
                email = await waitForEmail(detailsCell);
            }
        }
    }

    return {
        nome: cells[idxName]?.innerText.trim(),
        bookingId: cells[idxId]?.innerText.trim(),
        email: email,
        source: 'Headout'
    };
}

function injectButtons() {
    const rows = document.querySelectorAll('tr');
    rows.forEach((row) => {
        if (!row.querySelector('td') || row.querySelector('.btn-bridge')) return;

        const btn = document.createElement('button');
        btn.innerText = 'COPIAR';
        btn.className = 'btn-bridge';
        btn.setAttribute('style', 'background:#673ab7 !important; color:white !important; border:none; padding:4px 8px; cursor:pointer; font-weight:bold; border-radius:4px; margin-right:10px;');
        
        btn.onclick = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const originalText = btn.innerText;
            btn.innerText = '⏳...';

            const data = await extractData(row);

            if (data && data.bookingId) {
                chrome.storage.local.set({ bridgeData: data }, () => {
                    console.log("🚀 Dados Copiados:", data);
                    btn.innerText = '✅ OK';
                    setTimeout(() => btn.innerText = originalText, 2000);
                });
            } else {
                btn.innerText = '❌ Erro';
                setTimeout(() => btn.innerText = originalText, 2000);
            }
        };
        row.cells[0].prepend(btn);
    });
}

setInterval(injectButtons, 2000);