package cl.mingeso.acopioservice.repository;

import cl.mingeso.acopioservice.entity.AcopioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcopioRepository extends JpaRepository<AcopioEntity, Integer> {
    @Query("select e from AcopioEntity e where e.proveedorId =:proveedorId")
    List<AcopioEntity> findByProveedor(@Param("proveedorId") String proveedorId);
}
