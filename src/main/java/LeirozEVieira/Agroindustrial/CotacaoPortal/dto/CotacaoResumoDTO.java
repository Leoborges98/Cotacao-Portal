package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;

import java.time.LocalDate;

public class CotacaoResumoDTO {

    private Long id;
    private LocalDate data;
    private String comprador;

    public CotacaoResumoDTO() {
    }

    public CotacaoResumoDTO(Long id, LocalDate data, String comprador) {
        this.id = id;
        this.data = data;
        this.comprador = comprador;
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

    public String getComprador() {
        return comprador;
    }

    public void setComprador(String comprador) {
        this.comprador = comprador;
    }
}