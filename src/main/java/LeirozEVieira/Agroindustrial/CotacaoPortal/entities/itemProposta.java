package LeirozEVieira.Agroindustrial.CotacaoPortal.entities;
import jakarta.persistence.*;

@Entity
@Table(name = "item_proposta")
public class itemProposta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double valorUnit;

    private Double valorTotal;

    @ManyToOne
    @JoinColumn(name = "fk_proposta_id")
    private Proposta proposta;

    @ManyToOne
    @JoinColumn(name = "fk_produto_id")
    private Produto produto;

    public Long getId() {
        return id;
    }

    public Double getValorUnit() {
        return valorUnit;
    }

    public void setValorUnit(Double valorUnit) {
        this.valorUnit = valorUnit;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Proposta getProposta() {
        return proposta;
    }

    public void setProposta(Proposta proposta) {
        this.proposta = proposta;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}