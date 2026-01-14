package LeirozEVieira.Agroindustrial.CotacaoPortal.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import LeirozEVieira.DTO.FornecedorDTO;

@Controller
public class FornecedorController {

    // Tela principal do fornecedor
    @GetMapping("/fornecedor")
    public String telaFornecedor() {
        return "fornecedor/fornecedor"; // fornecedor.html
    }

    // Cadastro de fornecedor
    @PostMapping("/fornecedores/cadastrar")
    @ResponseBody
    public ResponseEntity<String> cadastrarFornecedor(@RequestBody FornecedorDTO fornecedor) {
        System.out.println("Cadastro recebido:");
        System.out.println("Tipo: " + fornecedor.getTipo());
        System.out.println("Nome: " + fornecedor.getNome());
        System.out.println("Email: " + fornecedor.getEmail());
        System.out.println("Senha: " + fornecedor.getSenha());
        return ResponseEntity.ok("Cadastro realizado com sucesso!");
    }

    // Tela de detalhes da cotação
    @GetMapping("/detalhes-cotacao")
    public String detalhesCotacao() {
        return "fornecedor/detalhes-cotacao"; // detalhes-cotacao.html
    }
}
