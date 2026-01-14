// ===================== ARMAZENAMENTO EM MEMÓRIA =====================
let usuarios = [
    { tipo: "colaborador", nome: "Teste Colaborador", email: "colaborador@teste.com", senha: "123" },
    { tipo: "fornecedor", nome: "Teste Fornecedor", email: "fornecedor@teste.com", senha: "123" }
];

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

// ===================== CADASTRO =====================
function cadastrarUsuario(event) {
    event.preventDefault();

    const tipo = document.getElementById("tipo-cadastro").value;
    const nome = document.getElementById("nome-cadastro").value;
    const email = document.getElementById("email-cadastro").value;
    const senha = document.getElementById("senha-cadastro").value;

    if (!tipo || !nome || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    if (usuarios.some(u => u.email === email)) {
        alert("Usuário já cadastrado!");
        return;
    }

    usuarios.push({ tipo, nome, email, senha });
    alert("Cadastro realizado com sucesso!");
    mostrarLogin();
}

// ===================== LOGIN =====================
function fazerLogin(event) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const email = document.querySelector("#login-form input[placeholder='E-mail']").value;
    const senha = document.querySelector("#login-form input[placeholder='Senha']").value;

    if (!tipo || !email || !senha) {
        alert("Preencha todos os campos.");
        return;
    }

    const usuarioEncontrado = usuarios.find(u => 
        u.email === email && u.senha === senha && u.tipo === tipo.toLowerCase()
    );

    if (!usuarioEncontrado) {
        alert("Usuário ou senha inválidos.");
        return;
    }

    alert(`Login efetuado como ${tipo}.`);
    if (tipo === "colaborador") {
        window.location.href = "colaborador.html"; // sua tela de colaborador
    } else {
        window.location.href = "fornecedor.html";  // sua tela de fornecedor
    }
}

// ===================== ADICIONAR LISTENERS =====================
document.getElementById("login-form").addEventListener("submit", fazerLogin);
document.getElementById("cadastro-form").addEventListener("submit", cadastrarUsuario);
