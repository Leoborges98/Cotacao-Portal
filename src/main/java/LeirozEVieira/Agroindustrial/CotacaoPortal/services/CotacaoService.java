package LeirozEVieira.Agroindustrial.CotacaoPortal.services;

import org.springframework.stereotype.Service;

import LeirozEVieira.Agroindustrial.CotacaoPortal.dto.CotacaoRequestDTO;
import LeirozEVieira.Agroindustrial.CotacaoPortal.dto.CotacaoResumoDTO;

@Service
public class CotacaoService {

    public CotacaoResumoDTO criarCotacao(CotacaoRequestDTO dto) {
        CotacaoResumoDTO resumo = new CotacaoResumoDTO();
        resumo.setId(1L);
        resumo.setData(java.time.LocalDate.now());
        return resumo;
    }
}
