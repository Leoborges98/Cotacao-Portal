// ===============================
// COLABORADOR.JS CORRIGIDO
// ===============================
alert("JS ATUALIZADO");
let produtos = [];

// Espera o HTML carregar
document.addEventListener("DOMContentLoaded", function () {

    const inputExcel = document.getElementById("arquivoExcel");
    const uploadInfo = document.querySelector(".upload-info");
    const previewDiv = document.getElementById("previewProdutos");
    const corpoTabela = document.getElementById("corpoProdutos");
    const btnEnviar = document.getElementById("btnEnviarCotacao");

    // ============================
    // AO SELECIONAR O ARQUIVO
    // ============================
    inputExcel.addEventListener("change", function (event) {

        const file = event.target.files[0];

        if (!file) {
            uploadInfo.textContent = "Nenhum arquivo selecionado";
            return;
        }

        uploadInfo.textContent = "Arquivo selecionado: " + file.name;

        const reader = new FileReader();

        reader.onload = function (e) {

            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const json = XLSX.utils.sheet_to_json(sheet);

            produtos = json.map(item => ({
                codigo: item["Código Produto"] || "",
                descricao: item["Nome do Produto"] || "",
                quantidade: Number(item["Quantidade Total"]) || 0
            }));

            console.log("Produtos lidos:", produtos);

            renderizarPreview();
            sessionStorage.setItem("produtos", JSON.stringify(produtos));
        };

        reader.readAsArrayBuffer(file);
    });

    // ============================
    // RENDERIZA TABELA
    // ============================
    function renderizarPreview() {

        corpoTabela.innerHTML = "";

        if (produtos.length === 0) return;

        previewDiv.style.display = "block";

        produtos.forEach(p => {

            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${p.codigo}</td>
                <td>${p.descricao}</td>
                <td>${p.quantidade}</td>
            `;

            corpoTabela.appendChild(tr);
        });
    }

    // ============================
    // ENVIAR COTAÇÃO
    // ============================
    btnEnviar.addEventListener("click", function () {

        const produtosSalvos = JSON.parse(sessionStorage.getItem("produtos"));

        if (!produtosSalvos || produtosSalvos.length === 0) {
            alert("Nenhum produto carregado.");
            return;
        }

        fetch("/api/cotacoes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                comprador: "Colaborador",
                produtos: produtosSalvos
            })
        })
        .then(response => response.json())
        .then(data => {

            console.log("Cotação enviada com sucesso:", data);

            alert("Cotação enviada com sucesso!");

            // Redireciona para fornecedor
            window.location.href = "/fornecedor";
        })
        .catch(error => {
            console.error("Erro ao enviar:", error);
            alert("Erro ao enviar cotação.");
        });
    });

});