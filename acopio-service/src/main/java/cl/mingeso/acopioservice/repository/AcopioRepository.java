package cl.mingeso.acopioservice.repository;

import cl.mingeso.acopioservice.entity.AcopioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcopioRepository extends JpaRepository<AcopioEntity, Integer> {

}
