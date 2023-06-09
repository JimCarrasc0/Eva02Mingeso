package cl.mingeso.proveedorservice.controller;

import cl.mingeso.proveedorservice.entity.ProveedorEntity;
import cl.mingeso.proveedorservice.service.ProveedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/proveedor")
public class ProveedorController {
    @Autowired
    ProveedorService proveedorService;

    @GetMapping
    public ResponseEntity<List<ProveedorEntity>> getAll(){
        List<ProveedorEntity> proveedores = proveedorService.obtenerProveedores();
        if(proveedores.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(proveedores);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<ProveedorEntity> save(@RequestBody ProveedorEntity proveedorEntity){
        ProveedorEntity nuevoProveedor = proveedorService.saveProveedor(proveedorEntity);
        return ResponseEntity.ok(nuevoProveedor);
    }

    @GetMapping("/{proveedorId}")
    public ResponseEntity<ProveedorEntity> getById(@PathVariable("proveedorId") String proveedorId){
        ProveedorEntity proveedor = proveedorService.getProveedor(proveedorId);
        return ResponseEntity.ok(proveedor);
    }

}
