package cl.mingeso.acopioservice.service;

import cl.mingeso.acopioservice.entity.AcopioEntity;
import cl.mingeso.acopioservice.repository.AcopioRepository;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AcopioService {
    @Autowired
    private AcopioRepository acopioRepository;

    private final Logger logg = LoggerFactory.getLogger(AcopioService.class);

    public List<AcopioEntity> obtenerAcopio(){
        return (List<AcopioEntity>) acopioRepository.findAll();
    }

    @Generated
    public String guardar(MultipartFile file) {
        String nombre = file.getOriginalFilename();
        if(nombre != null){
            if(!file.isEmpty()){
                try{
                    byte [] bytes = file.getBytes();
                    Path path = Paths.get(file.getOriginalFilename());
                    Files.write(path, bytes);
                    logg.info("Archivo guardado");
                } catch (IOException e){
                    logg.error("Error",e);
                }
            }
            return "Archivo guardado";
        }
        else
            return "No se pudo guardar el archivo";
    }

    public void guardarDB(String fecha, String turno, String proveedorId, String kgLeche){
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");

        AcopioEntity datos = new AcopioEntity();

        try {
            Date fexa = format.parse(fecha);
            datos.setFecha(new java.sql.Date(fexa.getTime()));
        } catch (ParseException e) {
            logg.error("ERROR",e);
        }

        datos.setTurno(turno);
        datos.setProveedorId(proveedorId);
        datos.setKgLeche(Float.parseFloat(kgLeche));

        acopioRepository.save(datos);
    }

    @Generated
    public void leerCsv(String direccion){
        String texto="";
        BufferedReader bf= null;
        acopioRepository.deleteAll();
        try{
            bf = new BufferedReader(new FileReader(direccion));
            String temp="";
            String bfRead;
            int count = 1;
            while((bfRead=bf.readLine())!=null){
                if (count==1){
                    count=0;
                }
                else {
                    guardarDB(bfRead.split(";")[0], bfRead.split(";")[1], bfRead.split(";")[2], bfRead.split(";")[3]);
                    temp= temp + "\n" + bfRead;
                }
            }

        }catch (IOException e){
            logg.error("Error",e);
        }
    }
}
