package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;
import java.util.List;

public class CotacaoRequestDTO {

    private String comprador;
    private List<ProdutoDTO> produtos;

    public String getComprador() {
        return comprador;
    }

    public void setComprador(String comprador) {
        this.comprador = comprador;
    }

    public List<ProdutoDTO> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ProdutoDTO> produtos) {
        this.produtos = produtos;
    }
}
