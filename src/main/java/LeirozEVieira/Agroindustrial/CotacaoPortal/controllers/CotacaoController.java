package LeirozEVieira.Agroindustrial.CotacaoPortal.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import LeirozEVieira.Agroindustrial.CotacaoPortal.dto.CotacaoRequestDTO;
import LeirozEVieira.Agroindustrial.CotacaoPortal.dto.CotacaoResumoDTO;
import LeirozEVieira.Agroindustrial.CotacaoPortal.services.CotacaoService;

@RestController
@RequestMapping("/api/cotacoes")
public class CotacaoController {

    @Autowired
    private CotacaoService cotacaoService;

    @PostMapping
    public CotacaoResumoDTO criar(@RequestBody CotacaoRequestDTO dto) {
        return cotacaoService.criarCotacao(dto);
    }
}
