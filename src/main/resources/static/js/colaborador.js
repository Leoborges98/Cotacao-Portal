// ================= MENU =================
const menuItens = document.querySelectorAll('.menu-item');
const telas = document.querySelectorAll('.tela');

menuItens.forEach(item => {
    item.addEventListener('click', () => {
        menuItens.forEach(i => i.classList.remove('ativo'));
        telas.forEach(t => t.classList.remove('ativa'));

        item.classList.add('ativo');
        const telaId = 'tela-' + item.dataset.tela;
        document.getElementById(telaId).classList.add('ativa');
    });
});

// ============ NOVA COTAÇÃO - UPLOAD EXCEL ============
const inputArquivo = document.getElementById('arquivoExcel');
const nomeArquivo = document.querySelector('.upload-info');

if (inputArquivo) {
    inputArquivo.addEventListener('change', () => {
        const arquivo = inputArquivo.files[0];

        if (!arquivo) {
            nomeArquivo.textContent = 'Nenhum arquivo selecionado';
            return;
        }

        const nome = arquivo.name.toLowerCase();
        if (!nome.endsWith('.xls') && !nome.endsWith('.xlsx')) {
            alert('Selecione um arquivo Excel válido (.xls ou .xlsx)');
            inputArquivo.value = '';
            nomeArquivo.textContent = 'Nenhum arquivo selecionado';
            return;
        }

        nomeArquivo.textContent = `Arquivo selecionado: ${arquivo.name}`;

        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const nomeAba = workbook.SheetNames[0];
            const planilha = workbook.Sheets[nomeAba];

            // 🔹 Leitura bruta do Excel
            const produtosExcel = XLSX.utils.sheet_to_json(planilha);
            console.log('📄 Produtos lidos do Excel:', produtosExcel);

            // ==================================================
            // ✅ PASSO 1 — AJUSTE PARA ProdutoDTO
            // ==================================================
            const produtosAjustados = produtosExcel.map(p => ({
                codigo: String(p['Código Produto']).trim(),
                descricao: String(p['Nome do Produto']).trim(),
                quantidade: Number(
                    String(p['Quantidade Total'])
                        .replace(/\./g, '')
                        .replace(',', '.')
                )
            }));

            console.log('✅ Produtos ajustados (ProdutoDTO):', produtosAjustados);

            // ==================================================
            // 🔹 ENVIO (ainda simples, só para validar fluxo)
            // ==================================================
            fetch('http://localhost:8080/api/cotacoes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comprador: 'COLABORADOR_TESTE',
                    produtos: produtosAjustados
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('🟢 Cotação criada no backend:', data);

                 sessionStorage.setItem('cotacaoId', data.id);

                console.log('💾 ID da cotação salvo:', data.id);
                })
                
            .catch(err => {
                console.error('❌ Erro ao enviar cotação:', err);
            });

            // ==================================================
            // 🔹 PREVIEW DA TABELA (SEM ALTERAÇÃO)
            // ==================================================
            const preview = document.getElementById('previewProdutos');
            const cabecalho = document.getElementById('cabecalhoProdutos');
            const corpo = document.getElementById('corpoProdutos');

            cabecalho.innerHTML = '';
            corpo.innerHTML = '';

            const colunas = Object.keys(produtosExcel[0]);

            colunas.forEach(coluna => {
                const th = document.createElement('th');
                th.textContent = coluna;
                cabecalho.appendChild(th);
            });

            produtosExcel.forEach(produto => {
                const tr = document.createElement('tr');

                colunas.forEach(coluna => {
                    const td = document.createElement('td');
                    td.textContent = produto[coluna] ?? '';
                    tr.appendChild(td);
                });

                corpo.appendChild(tr);
            });

            preview.style.display = 'block';
        };

        reader.readAsArrayBuffer(arquivo);
    });
}
