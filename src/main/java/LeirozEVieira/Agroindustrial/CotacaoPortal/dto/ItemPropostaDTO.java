package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;

public class ItemPropostaDTO {
    private int id;
    private int proposta_id;
    private int produto_id;
    private double valor_unit;
    private double valor_total;

public ItemPropostaDTO() {
    }

    public ItemPropostaDTO(int id, int proposta_id, int produto_id, double valor_unit, double valor_total) {
        this.id = id;
        this.proposta_id = proposta_id;
        this.produto_id = produto_id;
        this.valor_unit = valor_unit;
        this.valor_total = valor_total;
    }

    public int getId(){
        return id;
    }

    public int getProposta_id(){
        return proposta_id;
    }

    public int getProduto(){
        return produto_id;
    }

    public double getValor_unit(){
        return valor_unit;
    }

    public double getValor_total(){
        return valor_total;
    }


}