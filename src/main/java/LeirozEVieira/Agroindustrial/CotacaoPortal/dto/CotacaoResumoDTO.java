package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;

import java.time.LocalDate;

public class CotacaoResumoDTO {

    private Long id;
    private LocalDate data;
    private String colaborador;

    public CotacaoResumoDTO() {
    }

    public CotacaoResumoDTO(Long id, LocalDate data, String colaborador) {
        this.id = id;
        this.data = data;
        this.colaborador = colaborador;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getColaborador() {
        return colaborador;
    }

    public void setColaborador(String colaborador) {
        this.colaborador = colaborador;
    }
}