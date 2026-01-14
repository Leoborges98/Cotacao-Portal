// ================================
// PASSO 3A — FORNECEDOR
// Usar ID salvo da cotação
// ================================

const lista = document.getElementById('listaCotacoes');

// Recupera o ID salvo no PASSO 2
const cotacaoId = sessionStorage.getItem('cotacaoId');

if (!cotacaoId) {
    console.error('❌ Nenhuma cotação encontrada no sessionStorage');
} else {
    console.log('📦 ID da cotação recuperado:', cotacaoId);

    // ⚠️ Enquanto o GET real não existe,
    // usamos dados mínimos apenas para montar o card
    const cotacao = {
        id: cotacaoId,
        data: new Date().toLocaleDateString('pt-BR'),
        comprador: 'Leiroz & Vieira',
        valor: '—'
    };

    // ================================
    // CRIA CARD DA COTAÇÃO
    // ================================
    const div = document.createElement('div');
    div.classList.add('card-cotacao');

    div.innerHTML = `
        <div class="card-info">
            <div class="id-com-icone">
                <!-- Abrir detalhes da cotação ao clicar no olhinho -->
                <a href="/detalhes-cotacao?id=${cotacao.id}" class="btn-visualizar-inline">
                    <i class="bi bi-eye-fill"></i>
                </a>
                <strong>ID:</strong> ${cotacao.id}
            </div>
            <div><strong>Data:</strong> ${cotacao.data}</div>
            <div><strong>Comprador:</strong> ${cotacao.comprador}</div>
            <div><strong>Valor:</strong> ${cotacao.valor}</div>
        </div>

        <button class="btn-liberar">Liberar Cotação</button>
    `;

    lista.appendChild(div);
}
