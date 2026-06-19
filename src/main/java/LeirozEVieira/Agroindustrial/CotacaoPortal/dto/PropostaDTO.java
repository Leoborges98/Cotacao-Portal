package LeirozEVieira.Agroindustrial.CotacaoPortal.dto;
import java.time.LocalDate;

public class PropostaDTO {
    private int id;
    private int fornecedor_id;
    private int cotacao_id;
    private double desconto;
    private double ipi;
    private double icms;
    private LocalDate data_entrega;
    private LocalDate data_resposta;
    private String observacao;

    public PropostaDTO() {
    }

    public PropostaDTO(int id, int fornecedor_id, int cotacao_id, double desconto, double ipi, double icms, LocalDate data_entrega ,LocalDate data_resposta, String observacao) {
        this.id = id;
        this.fornecedor_id = fornecedor_id;
        this.cotacao_id    = cotacao_id;
        this.desconto      = desconto;
        this.ipi           = ipi;
        this.icms          = icms;
        this.data_entrega  = data_entrega;
        this.data_resposta = data_resposta;
        this.observacao    = observacao;
    }

    public int getId() {
        return id;
    }

    public int getFornecedor_id() {
        return fornecedor_id;
    }

    public int getCotacao_id() {
        return cotacao_id;
    }

    public double getDesconto() {
        return desconto;
    }

    public double getIpi(){
        return ipi;
    }

    public double getIcms(){
        return icms;
    }

    public LocalDate getData_entrega(){
        return data_entrega;
    }

    public LocalDate getData_resposta(){
        return data_entrega;
    }

    public String getObservacao(){
        return observacao;
    }
}
