package cl.mingeso.proveedorservice.repository;

import cl.mingeso.proveedorservice.entity.ProveedorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<ProveedorEntity,String> {

    @Query("select e from ProveedorEntity e where e.nombre =:nombre")
    ProveedorEntity findByNameCustomQuery(@Param("nombre") String nombre);

    @Query("select e.categoria from ProveedorEntity e where e.proveedorId =:proveedorId")
    String findCategoryById(@Param("proveedorId")String proveedorId);

    @Query("select e from ProveedorEntity e where e.proveedorId =:proveedorId")
    ProveedorEntity findProveedorById(@Param("proveedorId")String proveedorId);

    @Query("select e.retencion from ProveedorEntity e where e.proveedorId =:proveedorId")
    String findRetencionById(@Param("proveedorId")String proveedorId);

}
