package LeirozEVieira.Agroindustrial.CotacaoPortal.entities;
import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "proposta")
public class Proposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double desconto;

    private Double ipi;

    private Double icms;

    private LocalDate dataEntrega;

    @ManyToOne
    @JoinColumn(name = "fk_fornecedor_id")
    private Usuario fornecedor;

    @ManyToOne
    @JoinColumn(name = "fk_cotacao_id")
    private Cotacao cotacao;

    public Long getId() {
        return id;
    }

    public Double getDesconto() {
        return desconto;
    }

    public void setDesconto(Double desconto) {
        this.desconto = desconto;
    }

    public Double getIpi() {
        return ipi;
    }

    public void setIpi(Double ipi) {
        this.ipi = ipi;
    }

    public Double getIcms() {
        return icms;
    }

    public void setIcms(Double icms) {
        this.icms = icms;
    }

    public LocalDate getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDate dataEntrega) {
        this.dataEntrega = dataEntrega;
    }

    public Usuario getFornecedor() {
        return fornecedor;
    }

    public void setFornecedor(Usuario fornecedor) {
        this.fornecedor = fornecedor;
    }

    public Cotacao getCotacao() {
        return cotacao;
    }

    public void setCotacao(Cotacao cotacao) {
        this.cotacao = cotacao;
    }
}