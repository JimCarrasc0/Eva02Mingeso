package cl.mingeso.pagoservice.service;

import cl.mingeso.pagoservice.entity.PagoEntity;
import cl.mingeso.pagoservice.models.AcopioModel;
import cl.mingeso.pagoservice.models.LecheModel;
import cl.mingeso.pagoservice.models.ProveedorModel;
import cl.mingeso.pagoservice.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.RestTemplate;


import java.util.ArrayList;
import java.util.List;

public class PagoService {
    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    RestTemplate restTemplate;

    private final Logger logg = LoggerFactory.getLogger(PagoService.class);

    public List<PagoEntity> getPagos(){
        return (List<PagoEntity>) pagoRepository.findAll();
    }
    public ProveedorModel consultaProveedor(String proveedorId){
        ProveedorModel datosProveedor = restTemplate.getForObject("http://proveedor-service/proveedor/"+proveedorId,ProveedorModel.class);
        return datosProveedor;
    }

    public List<AcopioModel> consultaAcopio(String proveedorId){
        List<AcopioModel> datosAcopio = restTemplate.getForObject("http://acopio-service/acopio/"+proveedorId,List.class);
        return datosAcopio;
    }

    public List<LecheModel> consultaLeche(String proveedorId){
        List<LecheModel> datosLeche = restTemplate.getForObject("http://leche-service/leche/"+proveedorId,List.class);
        return datosLeche;
    }

    public List<Float> calculoPagoAcopio(String proveedorId){
        List<AcopioModel> acopio = consultaAcopio(proveedorId);
        Float kilos = 0.0f;
        Float bonus = 0.0f;

        List<String> turnos = new ArrayList<>();
        for (AcopioModel elemento : acopio){
            kilos += elemento.getKgLeche();

            if(!turnos.contains(elemento.getTurno())){
                turnos.add(elemento.getTurno());
            }

        }

        for(String turno: turnos){
            if(turno=="M"){
                bonus += 0.12f;
            } else{
                bonus += 0.08f;
            }
        }

        List<Float> lecheYbonus = new ArrayList<>();
        lecheYbonus.add(kilos);
        lecheYbonus.add(bonus);

        return lecheYbonus;

    }


}
