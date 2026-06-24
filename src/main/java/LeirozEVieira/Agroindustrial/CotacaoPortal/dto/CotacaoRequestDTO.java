package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;
import java.util.List;

public class CotacaoRequestDTO {

    private String colaborador;
    private List<ProdutoDTO> produtos;

    public String getColaborador() {
        return colaborador;
    }

    public void setColaborador(String colaborador) {
        this.colaborador = colaborador;
    }

    public List<ProdutoDTO> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<ProdutoDTO> produtos) {
        this.produtos = produtos;
    }
}
