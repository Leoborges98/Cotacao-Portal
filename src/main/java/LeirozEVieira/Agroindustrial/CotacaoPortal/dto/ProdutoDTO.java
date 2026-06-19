package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;

public class ProdutoDTO {

    private Long cod_id;
    private String descricao;
    private Integer quantidade;
    private int unidade;

    public ProdutoDTO() {
    }

    public ProdutoDTO(Long codigo, String descricao, Integer quantidade, int unidade) {
        this.cod_id = codigo;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.unidade = unidade;
    }

    public Long getCodigo() {
        return cod_id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public int getUnidade() {
        return unidade;
    }
}
