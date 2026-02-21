package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;

import java.time.LocalDate;

public class CotacaoResponseDTO {

    private Long id;
    private LocalDate data;

    public CotacaoResponseDTO(Long id, LocalDate data) {
        this.id = id;
        this.data = data;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getData() {
        return data;
    }
}
