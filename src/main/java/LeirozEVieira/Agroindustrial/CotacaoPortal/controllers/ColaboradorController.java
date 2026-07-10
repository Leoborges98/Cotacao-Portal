package LeirozEVieira.Agroindustrial.CotacaoPortal.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/colaborador")
public class ColaboradorController {

    @GetMapping
    public String dashboard() {
        return "colaborador/dashboard";
    }

    @GetMapping("/cotacoes")
    public String cotacoes() {
        return "colaborador/cotacoes";
    }

    @GetMapping("/nova-cotacao")
    public String novaCotacao() {
        return "colaborador/nova-cotacao";
    }

}