package LeirozEVieira.Agroindustrial.CotacaoPortal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import LeirozEVieira.Agroindustrial.CotacaoPortal.entities.Cotacao;

public interface CotacaoRepository extends JpaRepository<Cotacao, Long> {
}
