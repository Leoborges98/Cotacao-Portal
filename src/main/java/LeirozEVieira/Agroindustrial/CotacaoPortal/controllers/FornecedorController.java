package LeirozEVieira.Agroindustrial.CotacaoPortal.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/fornecedor")
public class FornecedorController {

    @GetMapping
    public String dashboard() {
        return "fornecedor/dashboard";
    }

    @GetMapping("/cotacoes")
    public String cotacoes() {
        return "fornecedor/cotacoes";
    }

}