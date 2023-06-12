package cl.mingeso.pagoservice.repository;

import cl.mingeso.pagoservice.entity.PagoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PagoRepository extends JpaRepository<PagoEntity, Integer> {
}
