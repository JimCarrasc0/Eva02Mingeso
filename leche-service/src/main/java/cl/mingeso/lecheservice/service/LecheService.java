package cl.mingeso.lecheservice.service;

import cl.mingeso.lecheservice.entity.LecheEntity;
import cl.mingeso.lecheservice.repository.LecheRepository;
import lombok.Generated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

@Service
public class LecheService {
    @Autowired
    private LecheRepository lecheRepository;
    private final Logger logg = LoggerFactory.getLogger(LecheService.class);

    public ArrayList<LecheEntity> obtenerLeche(){
        return (ArrayList<LecheEntity>) lecheRepository.findAll();
    }

    @Generated
    public String guardar(MultipartFile file){
        String nombre = file.getOriginalFilename();
        if(nombre!=null){
            if(!file.isEmpty()){
                try{
                    byte [] bytes = file.getBytes();
                    Path path = Paths.get(file.getOriginalFilename());
                    Files.write(path, bytes);
                    logg.info("Archivo Guardado");

                }catch (IOException e){
                    logg.error("ERROR", e);
                }
            }
            return "Archivo guardado con éxito";
        }
        else {
            return "No se pudo guardar el archivo";
        }
    }

    public void guardarDB(String proveedorId, String grasa, String solido){
        LecheEntity datos = new LecheEntity();

        datos.setProveedorId(proveedorId);
        datos.setGrasa(Float.parseFloat(grasa));
        datos.setSolido(Float.parseFloat(solido));

        lecheRepository.save(datos);
    }

    @Generated
    public void leerCsv(String direccion){
        BufferedReader bf = null;

        try {
            bf = new BufferedReader(new FileReader(direccion));
            String temp="";
            String bfRead;
            int count = 1;
            while((bfRead=bf.readLine())!=null){
                if(count==1){
                    count=0;
                }else {
                    guardarDB(bfRead.split(";")[0], bfRead.split(";")[1], bfRead.split(";")[2]);
                    temp= temp + "\n" + bfRead;
                }
            }

        }catch (IOException e){
            logg.error("Error",e);
        }
    }
}
