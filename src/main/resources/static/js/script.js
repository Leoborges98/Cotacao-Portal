
// ===================== TROCA DE TELAS =====================
function mostrarCadastro() {
    limparCamposCadastro();
    document.getElementById("login-container").style.display = "none";
    document.getElementById("cadastro-container").style.display = "block";
}

function mostrarLogin() {
    limparCamposLogin();
    document.getElementById("cadastro-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
}

// ===================== LIMPAR CAMPOS =====================
function limparCamposLogin() {
    document.getElementById("tipo").value = "";
    document.querySelector("#login-form input[placeholder='E-mail']").value = "";
    document.querySelector("#login-form input[placeholder='Senha']").value = "";
}

function limparCamposCadastro() {
    document.getElementById("tipo-cadastro").value = "";
    document.getElementById("nome-cadastro").value = "";
    document.getElementById("email-cadastro").value = "";
    document.getElementById("senha-cadastro").value = "";
}
