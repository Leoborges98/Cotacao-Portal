class CotacaoCalculator {
    constructor() {
        this.calculoTimeout = null;
        this.ultimoCampoAlterado = null;
        this.init();
    }

    init() {
        this.carregarDadosCotacao();
        this.carregarProdutos();
        this.configurarEventosDesconto();
        this.configurarEventosGerais();
    }

    carregarDadosCotacao() {
        const cotacao = JSON.parse(sessionStorage.getItem('cotacaoAtual'));

        if (!cotacao) {
            console.error('❌ Nenhuma cotação encontrada no sessionStorage');
            return;
        }

        document.getElementById('idCotacao').textContent = cotacao.id;
        document.querySelector('.info-card .info-value').textContent = cotacao.id;
        document.getElementById('colaborador').textContent = cotacao.colaborador;
        document.getElementById('status').textContent = cotacao.status;
    }

    carregarProdutos() {
        const cotacao = JSON.parse(sessionStorage.getItem('cotacaoAtual'));

        if (!cotacao || !cotacao.produtos || cotacao.produtos.length === 0) {
            console.error('❌ Produtos não encontrados na cotação');
            return;
        }

        console.log('📦 Produtos carregados:', cotacao.produtos);
        this.renderizarMateriais(cotacao.produtos);
        this.calcularTudo();
    }

    renderizarMateriais(produtos) {
        const container = document.getElementById('listaMateriais');
        container.innerHTML = '';

        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'material-card';

            card.innerHTML = `
                <div class="material-header">
                    <span class="codigo-empresa">CÓDIGO ${produto.codigo}</span>
                    <h3 class="material-nome">${produto.descricao}</h3>
                </div>

                <div class="material-body">
                    <input data-field="quantidade" type="number" value="${produto.quantidade}">
                    <input data-field="valorUnitario" type="number" placeholder="Valor Unitário">
                    <input class="desconto-percentual" type="number" placeholder="% Desc">
                    <input class="desconto-real" type="number" placeholder="R$ Desc">
                    <input data-field="ipi" type="number" placeholder="IPI %">
                    <input data-field="icms" type="number" placeholder="ICMS %">
                </div>

                <div class="material-footer">
                    <div data-field="total">R$ 0,00</div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    calcularMaterial(card) {
        const q = +card.querySelector('[data-field="quantidade"]').value || 0;
        const v = +card.querySelector('[data-field="valorUnitario"]').value || 0;
        const subtotal = q * v;

        let descontoPercentual = +card.querySelector('.desconto-percentual').value || 0;
        let descontoReal = +card.querySelector('.desconto-real').value || 0;

        if (this.ultimoCampoAlterado === 'percentual') {
            descontoReal = subtotal * (descontoPercentual / 100);
        } else {
            descontoPercentual = subtotal ? (descontoReal / subtotal) * 100 : 0;
        }

        const base = subtotal - descontoReal;
        const ipi = +card.querySelector('[data-field="ipi"]').value || 0;
        const icms = +card.querySelector('[data-field="icms"]').value || 0;

        const total = base + (base * ipi / 100) + (base * icms / 100);

        return total;
    }

    calcularTudo() {
        let totalGeral = 0;

        document.querySelectorAll('.material-card').forEach(card => {
            const total = this.calcularMaterial(card);
            card.querySelector('[data-field="total"]').textContent = this.formatarMoeda(total);
            totalGeral += total;
        });

        document.getElementById('valorTotalCotacao').textContent = this.formatarMoeda(totalGeral);
    }

    configurarEventosDesconto() {
        document.addEventListener('input', e => {
            if (e.target.classList.contains('desconto-percentual')) {
                this.ultimoCampoAlterado = 'percentual';
                this.calcularTudo();
            }
            if (e.target.classList.contains('desconto-real')) {
                this.ultimoCampoAlterado = 'real';
                this.calcularTudo();
            }
        });
    }

    configurarEventosGerais() {
        document.addEventListener('input', e => {
            if (e.target.matches('[data-field]')) {
                clearTimeout(this.calculoTimeout);
                this.calculoTimeout = setTimeout(() => this.calcularTudo(), 200);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Detalhes da cotação iniciado');
    new CotacaoCalculator();
});
