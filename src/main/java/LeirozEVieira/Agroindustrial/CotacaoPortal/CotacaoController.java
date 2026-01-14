package LeirozEVieira.Agroindustrial.CotacaoPortal;

import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

import LeirozEVieira.DTO.CotacaoRequestDTO;
import LeirozEVieira.DTO.CotacaoResponseDTO;

@RestController
@RequestMapping("/api/cotacoes")
@CrossOrigin(origins = "*")
public class CotacaoController {

    private static final AtomicLong SEQUENCE = new AtomicLong(1001);

    @PostMapping
    public CotacaoResponseDTO criarCotacao(@RequestBody CotacaoRequestDTO request) {

        Long idGerado = SEQUENCE.getAndIncrement();
        LocalDate dataAtual = LocalDate.now();

        System.out.println("📦 Nova cotação recebida");
        System.out.println("Comprador: " + request.getComprador());
        System.out.println("Qtd produtos: " + request.getProdutos().size());

        return new CotacaoResponseDTO(idGerado, dataAtual);
    }
}
