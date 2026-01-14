// Sistema de Cálculo de Cotações com desconto % ↔ R$
class CotacaoCalculator {
    constructor() {
        this.calculoTimeout = null;
        this.ultimoCampoAlterado = null; // Para rastrear qual campo foi alterado
        this.init();
    }

    init() {
        this.carregarDadosCotacao();
        this.configurarEventosDesconto();
        this.configurarEventosGerais();
        this.calcularTudo();
        this.perguntarCarregarDadosSalvos();
    }

    carregarDadosCotacao() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        
        if (id) {
            document.getElementById('idCotacao').textContent = id;
        }
    }

    formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
    }

    // Cálculo principal de um material
    calcularMaterial(materialCard) {
        // Valores básicos
        const quantidade = parseFloat(materialCard.querySelector('[data-field="quantidade"]')?.value) || 0;
        const valorUnitario = parseFloat(materialCard.querySelector('[data-field="valorUnitario"]')?.value) || 0;
        
        // Subtotal
        const subtotal = quantidade * valorUnitario;
        
        // Verifica qual campo de desconto foi alterado por último
        const campoDescontoAlterado = this.ultimoCampoAlterado === 'percentual' ? 'percentual' : 'real';
        
        let descontoPercentual, descontoReal;
        
        if (campoDescontoAlterado === 'percentual') {
            // Se % foi alterado, calcula R$ baseado no %
            descontoPercentual = parseFloat(materialCard.querySelector('.desconto-percentual')?.value) || 0;
            descontoReal = subtotal * (descontoPercentual / 100);
        } else {
            // Se R$ foi alterado, calcula % baseado no R$
            descontoReal = parseFloat(materialCard.querySelector('.desconto-real')?.value) || 0;
            descontoPercentual = subtotal > 0 ? (descontoReal / subtotal) * 100 : 0;
        }
        
        // Garante que os valores não sejam negativos
        descontoReal = Math.max(0, descontoReal);
        descontoPercentual = Math.max(0, Math.min(100, descontoPercentual));
        
        // Valor com desconto
        const valorComDesconto = subtotal - descontoReal;
        
        // Impostos
        const ipiPercentual = parseFloat(materialCard.querySelector('[data-field="ipi"]')?.value) || 0;
        const icmsPercentual = parseFloat(materialCard.querySelector('[data-field="icms"]')?.value) || 0;
        
        const valorIPI = valorComDesconto * (ipiPercentual / 100);
        const valorComIPI = valorComDesconto + valorIPI;
        const valorICMS = valorComIPI * (icmsPercentual / 100);
        const total = valorComIPI + valorICMS;
        
        return {
            subtotal: subtotal,
            descontoPercentual: descontoPercentual,
            descontoReal: descontoReal,
            valorComDesconto: valorComDesconto,
            ipiPercentual: ipiPercentual,
            valorIPI: valorIPI,
            icmsPercentual: icmsPercentual,
            valorICMS: valorICMS,
            total: total
        };
    }

    // Atualiza display de um material
    atualizarMaterial(materialCard) {
        const resultado = this.calcularMaterial(materialCard);
        
        // Atualiza todos os campos
        const campos = {
            'subtotal': resultado.subtotal,
            'descontoPercentual': resultado.descontoPercentual,
            'descontoReal': resultado.descontoReal,
            'valorComDesconto': resultado.valorComDesconto,
            'ipi': resultado.ipiPercentual,
            'valorIPI': resultado.valorIPI,
            'icms': resultado.icmsPercentual,
            'valorICMS': resultado.valorICMS,
            'total': resultado.total
        };
        
        // Atualiza inputs e displays
        Object.keys(campos).forEach(campo => {
            const elemento = materialCard.querySelector(`[data-field="${campo}"]`);
            if (elemento) {
                if (elemento.tagName === 'INPUT') {
                    // Para inputs, apenas atualiza se não for o campo que está sendo editado
                    if (!elemento.matches(':focus')) {
                        elemento.value = campos[campo].toFixed(2);
                    }
                } else {
                    // Para divs (valores exibidos)
                    if (campo === 'total') {
                        elemento.textContent = this.formatarMoeda(campos[campo]);
                        elemento.classList.add('updating');
                        setTimeout(() => elemento.classList.remove('updating'), 300);
                    } else if (campo.includes('valor') || campo === 'subtotal' || campo === 'descontoReal') {
                        elemento.textContent = this.formatarMoeda(campos[campo]);
                    }
                }
            }
        });
        
        return resultado;
    }

    // Sincroniza campos de desconto
    sincronizarDescontos(materialCard, campoAlterado) {
        const quantidade = parseFloat(materialCard.querySelector('[data-field="quantidade"]')?.value) || 0;
        const valorUnitario = parseFloat(materialCard.querySelector('[data-field="valorUnitario"]')?.value) || 0;
        const subtotal = quantidade * valorUnitario;
        
        const inputPercentual = materialCard.querySelector('.desconto-percentual');
        const inputReal = materialCard.querySelector('.desconto-real');
        
        if (campoAlterado === 'percentual') {
            // % → R$
            const percentual = parseFloat(inputPercentual.value) || 0;
            const real = subtotal * (percentual / 100);
            inputReal.value = real.toFixed(2);
        } else {
            // R$ → %
            const real = parseFloat(inputReal.value) || 0;
            const percentual = subtotal > 0 ? (real / subtotal) * 100 : 0;
            inputPercentual.value = percentual.toFixed(2);
        }
    }

    // Configura eventos específicos para descontos
    configurarEventosDesconto() {
        document.addEventListener('input', (e) => {
            const target = e.target;
            
            if (target.classList.contains('desconto-percentual')) {
                this.ultimoCampoAlterado = 'percentual';
                const materialCard = target.closest('.material-card');
                this.sincronizarDescontos(materialCard, 'percentual');
                this.calcularTudo();
            }
            
            if (target.classList.contains('desconto-real')) {
                this.ultimoCampoAlterado = 'real';
                const materialCard = target.closest('.material-card');
                this.sincronizarDescontos(materialCard, 'real');
                this.calcularTudo();
            }
        });
        
        // Evento para quando o campo perde o foco (atualiza mesmo se não houver input)
        document.addEventListener('blur', (e) => {
            const target = e.target;
            
            if (target.classList.contains('desconto-percentual') || 
                target.classList.contains('desconto-real')) {
                this.calcularTudo();
            }
        }, true);
    }

    // Configura eventos gerais
    configurarEventosGerais() {
        // Eventos para outros campos numéricos
        document.addEventListener('input', (e) => {
            const target = e.target;
            
            if (target.matches('[data-field="quantidade"], [data-field="valorUnitario"], [data-field="ipi"], [data-field="icms"]')) {
                // Limpa timeout anterior
                if (this.calculoTimeout) {
                    clearTimeout(this.calculoTimeout);
                }
                
                // Novo timeout para cálculo
                this.calculoTimeout = setTimeout(() => {
                    this.calcularTudo();
                }, 300);
            }
        });
        
        // Evento para select de unidade
        document.addEventListener('change', (e) => {
            if (e.target.matches('[data-field="unidade"]')) {
                this.calcularTudo();
            }
        });
        
        // Botões
        document.getElementById('btnSalvarTodas').addEventListener('click', () => this.salvarAlteracoes());
        document.getElementById('btnCancelar').addEventListener('click', () => this.cancelarAlteracoes());
        document.getElementById('btnEnviarProposta').addEventListener('click', () => this.enviarProposta());
    }

    // Calcula todos os materiais e atualiza totais
    calcularTudo() {
        console.log('Calculando tudo...');
        
        const materiaisCards = document.querySelectorAll('.material-card');
        let subtotalGeral = 0;
        let descontosGeral = 0;
        let ipiGeral = 0;
        let icmsGeral = 0;
        let totalGeral = 0;
        
        materiaisCards.forEach(card => {
            const resultado = this.atualizarMaterial(card);
            
            subtotalGeral += resultado.subtotal;
            descontosGeral += resultado.descontoReal;
            ipiGeral += resultado.valorIPI;
            icmsGeral += resultado.valorICMS;
            totalGeral += resultado.total;
        });
        
        // Atualiza totais na interface
        this.atualizarTotaisInterface({
            subtotal: subtotalGeral,
            descontos: descontosGeral,
            ipi: ipiGeral,
            icms: icmsGeral,
            total: totalGeral
        });
        
        return totalGeral;
    }

    // Atualiza interface com totais
    atualizarTotaisInterface(totais) {
        document.getElementById('valorTotalCotacao').textContent = this.formatarMoeda(totais.total);
        document.getElementById('subtotalCotacao').textContent = this.formatarMoeda(totais.subtotal);
        document.getElementById('totalDescontos').textContent = `-${this.formatarMoeda(totais.descontos)}`;
        document.getElementById('totalIPI').textContent = `+${this.formatarMoeda(totais.ipi)}`;
        document.getElementById('totalICMS').textContent = `+${this.formatarMoeda(totais.icms)}`;
    }

    // Coletar dados da proposta
    coletarProposta() {
        const materiaisCards = document.querySelectorAll('.material-card');
        const materiais = [];
        
        let subtotalGeral = 0;
        let descontosGeral = 0;
        let ipiGeral = 0;
        let icmsGeral = 0;
        let totalGeral = 0;
        
        materiaisCards.forEach(card => {
            const resultado = this.calcularMaterial(card);
            
            // Soma totais
            subtotalGeral += resultado.subtotal;
            descontosGeral += resultado.descontoReal;
            ipiGeral += resultado.valorIPI;
            icmsGeral += resultado.valorICMS;
            totalGeral += resultado.total;
            
            // Coleta dados do material
            const codigoEmpresa = card.querySelector('.codigo-empresa').textContent.replace('CÓDIGO DA EMPRESA ', '');
            const nome = card.querySelector('.material-nome').textContent;
            const codigoInterno = card.querySelector('.field-value').textContent;
            const unidade = card.querySelector('[data-field="unidade"]').value;
            const ncm = card.querySelector('[data-field="ncm"]').value;
            const quantidade = card.querySelector('[data-field="quantidade"]').value;
            const valorUnitario = card.querySelector('[data-field="valorUnitario"]').value;
            const descontoPercentual = card.querySelector('.desconto-percentual').value;
            const descontoReal = card.querySelector('.desconto-real').value;
            const ipi = card.querySelector('[data-field="ipi"]').value;
            const icms = card.querySelector('[data-field="icms"]').value;
            const diasEntrega = card.querySelector('[data-field="diasEntrega"]').value;
            
            materiais.push({
                codigoEmpresa,
                nome,
                codigoInterno,
                ncm,
                unidade,
                quantidade: parseFloat(quantidade),
                valorUnitario: parseFloat(valorUnitario),
                descontoPercentual: parseFloat(descontoPercentual),
                descontoReal: parseFloat(descontoReal),
                ipi: parseFloat(ipi),
                icms: parseFloat(icms),
                diasEntrega: parseInt(diasEntrega),
                total: resultado.total
            });
        });
        
        return {
            idCotacao: document.getElementById('idCotacao').textContent,
            comprador: document.getElementById('comprador').textContent,
            data: document.getElementById('data').textContent,
            status: document.getElementById('status').textContent,
            dataEnvio: new Date().toLocaleString('pt-BR'),
            materiais,
            totais: {
                subtotal: subtotalGeral,
                descontos: descontosGeral,
                ipi: ipiGeral,
                icms: icmsGeral,
                total: totalGeral
            }
        };
    }

    // Salvar alterações
    salvarAlteracoes() {
        const proposta = this.coletarProposta();
        const idCotacao = document.getElementById('idCotacao').textContent;
        
        localStorage.setItem(`cotacao_${idCotacao}`, JSON.stringify(proposta));
        
        // Feedback visual
        const btn = document.getElementById('btnSalvarTodas');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="icon">✓</span> Salvo';
        btn.style.background = '#059669';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 1500);
        
        return proposta;
    }

    // Cancelar alterações
    cancelarAlteracoes() {
        if (confirm('Deseja descartar todas as alterações não salvas?')) {
            const idCotacao = document.getElementById('idCotacao').textContent;
            localStorage.removeItem(`cotacao_${idCotacao}`);
            location.reload();
        }
    }

    // Enviar proposta
    enviarProposta() {
        const validacao = this.validarProposta();
        
        if (!validacao.valido) {
            alert('Corrija os seguintes erros:\n\n• ' + validacao.erros.join('\n• '));
            return;
        }
        
        const proposta = this.coletarProposta();
        const btn = document.getElementById('btnEnviarProposta');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="icon">⏳</span> Enviando...';
        btn.disabled = true;
        
        // Simulação de envio
        setTimeout(() => {
            btn.innerHTML = '<span class="icon">✓</span> Enviado';
            btn.style.background = '#059669';
            
            // Atualiza status
            document.getElementById('status').textContent = 'Enviada';
            document.getElementById('status').className = 'info-value status-enviada';
            
            // Salva como enviada
            proposta.status = 'Enviada';
            localStorage.setItem(`cotacao_${proposta.idCotacao}`, JSON.stringify(proposta));
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                alert('Proposta enviada com sucesso!');
            }, 2000);
        }, 1500);
    }

    // Validar proposta
    validarProposta() {
        const materiaisCards = document.querySelectorAll('.material-card');
        let valido = true;
        const erros = [];
        
        materiaisCards.forEach((card, index) => {
            const nome = card.querySelector('.material-nome').textContent;
            const quantidade = card.querySelector('[data-field="quantidade"]').value;
            const valorUnitario = card.querySelector('[data-field="valorUnitario"]').value;
            
            if (!quantidade || parseFloat(quantidade) <= 0) {
                valido = false;
                erros.push(`${nome}: Informe uma quantidade válida`);
            }
            
            if (!valorUnitario || parseFloat(valorUnitario) <= 0) {
                valido = false;
                erros.push(`${nome}: Informe um valor unitário válido`);
            }
        });
        
        return { valido, erros };
    }

    // Perguntar sobre carregar dados salvos
    perguntarCarregarDadosSalvos() {
        const idCotacao = document.getElementById('idCotacao').textContent;
        const dadosSalvos = localStorage.getItem(`cotacao_${idCotacao}`);
        
        if (dadosSalvos) {
            setTimeout(() => {
                if (confirm('Existem alterações salvas para esta cotação. Deseja carregá-las?')) {
                    this.carregarDadosSalvos();
                }
            }, 1000);
        }
    }

    // Carregar dados salvos
    carregarDadosSalvos() {
        const idCotacao = document.getElementById('idCotacao').textContent;
        const dadosSalvos = localStorage.getItem(`cotacao_${idCotacao}`);
        
        if (!dadosSalvos) return;
        
        try {
            const proposta = JSON.parse(dadosSalvos);
            this.aplicarDadosSalvos(proposta);
        } catch (error) {
            console.error('Erro ao carregar dados salvos:', error);
        }
    }

    // Aplicar dados salvos aos campos
    aplicarDadosSalvos(proposta) {
        // Atualiza informações básicas
        if (proposta.comprador) document.getElementById('comprador').textContent = proposta.comprador;
        if (proposta.status) {
            document.getElementById('status').textContent = proposta.status;
            document.getElementById('status').className = `info-value status-${proposta.status.toLowerCase().replace(' ', '-')}`;
        }
        
        // Atualiza materiais
        proposta.materiais?.forEach((material, index) => {
            const materialCard = document.querySelectorAll('.material-card')[index];
            if (!materialCard) return;
            
            // Atualiza select de unidade
            const selectUnidade = materialCard.querySelector('[data-field="unidade"]');
            if (selectUnidade && material.unidade) {
                selectUnidade.value = material.unidade;
            }
            
            // Atualiza campos de input
            const campos = ['ncm', 'quantidade', 'valorUnitario', 'ipi', 'icms', 'diasEntrega'];
            campos.forEach(campo => {
                const input = materialCard.querySelector(`[data-field="${campo}"]`);
                if (input && material[campo] !== undefined) {
                    input.value = material[campo];
                }
            });
            
            // Atualiza descontos
            const inputPercentual = materialCard.querySelector('.desconto-percentual');
            const inputReal = materialCard.querySelector('.desconto-real');
            
            if (inputPercentual && material.descontoPercentual !== undefined) {
                inputPercentual.value = material.descontoPercentual;
            }
            
            if (inputReal && material.descontoReal !== undefined) {
                inputReal.value = material.descontoReal;
            }
        });
        
        // Recalcula tudo após carregar dados
        this.calcularTudo();
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada, iniciando calculadora...');
    window.cotacaoCalculator = new CotacaoCalculator();
});

// Função de teste rápida
function testarDesconto() {
    console.log('=== TESTANDO DESCONTO ===');
    
    // Muda o desconto percentual do primeiro material
    const inputPercentual = document.querySelector('.desconto-percentual');
    if (inputPercentual) {
        console.log('Valor atual %:', inputPercentual.value);
        inputPercentual.value = '10.00'; // Muda para 10%
        console.log('Valor alterado %:', inputPercentual.value);
        
        // Dispara evento
        const event = new Event('input', { bubbles: true });
        inputPercentual.dispatchEvent(event);
        
        console.log('Evento disparado no % desconto');
    }
}

// Teste automático após 2 segundos
setTimeout(testarDesconto, 2000);