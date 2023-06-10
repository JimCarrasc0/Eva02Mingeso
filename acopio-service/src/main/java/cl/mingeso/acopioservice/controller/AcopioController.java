package cl.mingeso.acopioservice.controller;


import cl.mingeso.acopioservice.entity.AcopioEntity;
import cl.mingeso.acopioservice.service.AcopioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/acopio")
public class AcopioController {
    @Autowired
    AcopioService acopioService;

    @GetMapping
    public ResponseEntity<List<AcopioEntity>> getAll(){
        List<AcopioEntity> acopio = acopioService.obtenerAcopio();
        if(acopio.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(acopio);
    }

    @PostMapping("/nuevo")
    public String save (@RequestParam("file") MultipartFile file){
        try{
            acopioService.guardar(file);
            acopioService.leerCsv(file.getOriginalFilename());
            return "Archivo importado correctamente";
        }catch (Exception e){
            return "Error" + e.getMessage();
        }
    }

}
