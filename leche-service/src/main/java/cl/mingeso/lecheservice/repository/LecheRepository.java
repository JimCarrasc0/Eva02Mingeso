package cl.mingeso.lecheservice.repository;

import cl.mingeso.lecheservice.entity.LecheEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LecheRepository extends JpaRepository<LecheEntity, Integer> {
    @Query("select e from LecheEntity e where e.proveedorId =:proveedorId")
    List<LecheEntity> findByProveedor(@Param("proveedorId") String proveedorId);

}
