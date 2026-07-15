package LeirozEVieira.Agroindustrial.CotacaoPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import LeirozEVieira.Agroindustrial.CotacaoPortal.dto.UsuarioDTO;
import LeirozEVieira.Agroindustrial.CotacaoPortal.services.UsuarioService;
import LeirozEVieira.Agroindustrial.CotacaoPortal.entities.Usuario;

@Controller
@RequestMapping("/cadastro")
public class CadastroController {

    @Autowired
    private UsuarioService service;

    @GetMapping
    public String telaCadastro(){
        return "cadastro/cadastro";
    }

    @PostMapping
    public String cadastrar(UsuarioDTO dto){

        service.cadastrar(dto);

        return "redirect:/login";

    }

}