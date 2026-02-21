package LeirozEVieira.Agroindustrial.CotacaoPortal.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Cotacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate data;

    public Cotacao() {
    }

    public Long getId() {
        return id;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }
}
