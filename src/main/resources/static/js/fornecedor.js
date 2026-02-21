// ===============================
// FORNECEDOR.JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    carregarCotacoes();
});

// ===============================
// BUSCAR COTAÇÕES
// ===============================
function carregarCotacoes() {
    fetch("/api/cotacoes")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar cotações");
            }
            return response.json();
        })
        .then(cotacoes => {
            renderizarCotacoes(cotacoes);
        })
        .catch(error => {
            console.error("Erro:", error);
        });
}

// ===============================
// RENDERIZAR COTAÇÕES
// ===============================
function renderizarCotacoes(cotacoes) {
    const container = document.getElementById("listaCotacoes");

    if (!container) {
        console.error("Div #listaCotacoes não encontrada");
        return;
    }

    container.innerHTML = "";

    if (!cotacoes || cotacoes.length === 0) {
        container.innerHTML = `
            <p style="margin-top:20px;">Nenhuma cotação disponível.</p>
        `;
        return;
    }

    cotacoes.forEach(cotacao => {
        const card = document.createElement("div");
        card.classList.add("cotacao-card");

        card.innerHTML = `
            <div class="cotacao-info">
                <span><strong>ID:</strong> ${cotacao.id}</span>
                <span><strong>Data:</strong> ${formatarData(cotacao.data)}</span>
            </div>

            <div class="cotacao-acoes">
                <a href="/detalhes-cotacao?id=${cotacao.id}" title="Visualizar Cotação">
                    <i class="bi bi-eye"></i>
                </a>
            </div>
        `;

        container.appendChild(card);
    });
}

// ===============================
// FORMATAR DATA
// ===============================
function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
}
