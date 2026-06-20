package LeirozEVieira.Agroindustrial.CotacaoPortal.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Cotacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    private String status;

    private LocalDate dataCotacao;

    @ManyToOne
    @JoinColumn(name = "fk_colab_id")
    private Usuario colaborador;
   
    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getStatus() {
        return status;
    }


    public LocalDate getDataCotacao() {
        return dataCotacao;
    }

    public Usuario getColaborador() {
        return colaborador;
    }

    public void setColaborador(Usuario colaborador) {
        this.colaborador = colaborador;
    }
}
