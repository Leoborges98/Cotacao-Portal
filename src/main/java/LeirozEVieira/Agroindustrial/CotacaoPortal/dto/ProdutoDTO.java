package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;

public class ProdutoDTO {

    private Long codigo;
    private String descricao;
    private Integer quantidade;

    public ProdutoDTO() {
    }

    public ProdutoDTO(Long codigo, String descricao, Integer quantidade) {
        this.codigo = codigo;
        this.descricao = descricao;
        this.quantidade = quantidade;
    }

    public Long getCodigo() {
        return codigo;
    }

    public String getDescricao() {
        return descricao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }
}
