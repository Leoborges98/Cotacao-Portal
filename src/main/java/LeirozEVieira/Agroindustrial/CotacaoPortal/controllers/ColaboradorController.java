package LeirozEVieira.Agroindustrial.CotacaoPortal.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ColaboradorController {

    @GetMapping("/colaborador")
    public String telaColaborador() {
        return "colaborador/colaborador"; // colaborador.html
    }
}
