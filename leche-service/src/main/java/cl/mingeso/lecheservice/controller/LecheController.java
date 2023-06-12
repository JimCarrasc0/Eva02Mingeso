package cl.mingeso.lecheservice.controller;


import cl.mingeso.lecheservice.entity.LecheEntity;
import cl.mingeso.lecheservice.service.LecheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/leche")
public class LecheController {
    @Autowired
    LecheService lecheService;

    @GetMapping
    public ResponseEntity<List<LecheEntity>> getAll(){
        List<LecheEntity> Leche = lecheService.obtenerLeche();
        if(Leche.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(Leche);
    }

    @PostMapping("/nuevo")
    public String save (@RequestParam("file") MultipartFile file){
        try{
            lecheService.guardar(file);
            lecheService.leerCsv(file.getOriginalFilename());
            return "Archivo importado correctamente";
        }catch (Exception e){
            return "Error" + e.getMessage();
        }
    }

    @GetMapping("/{proveedorId}")
    public ResponseEntity<List<LecheEntity>> getByProveedorId(@PathVariable("proveedorId") String proveedorId){
        List<LecheEntity> leche = lecheService.obtenerPorProvId(proveedorId);
        return ResponseEntity.ok(leche);
    }

}
