package cl.mingeso.pagoservice.service;

import cl.mingeso.pagoservice.entity.PagoEntity;
import cl.mingeso.pagoservice.models.AcopioModel;
import cl.mingeso.pagoservice.models.LecheModel;
import cl.mingeso.pagoservice.models.ProveedorModel;
import cl.mingeso.pagoservice.repository.PagoRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.awt.geom.RectangularShape;
import java.util.ArrayList;
import java.util.List;

@Service
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

    public List<String> listaProveedorId(){
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<List<ProveedorModel>> response = restTemplate.exchange("http://proveedor-service/proveedor", HttpMethod.GET, entity, new ParameterizedTypeReference<List<ProveedorModel>>() {});
        List<ProveedorModel> proveedores = response.getBody();

        List<String> listaId = new ArrayList<>();

        for(ProveedorModel elemento : proveedores){
            listaId.add(elemento.getProveedorId());
        }

        return listaId;
    }

    public List<AcopioModel> consultaAcopio(String proveedorId){
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<List<AcopioModel>> response = restTemplate.exchange("http://acopio-service/acopio/" + proveedorId, HttpMethod.GET, entity, new ParameterizedTypeReference<List<AcopioModel>>() {});

        List<AcopioModel> acopio = response.getBody();
        return acopio;
    }

    public List<LecheModel> consultaLeche(String proveedorId){
        /*List<LecheModel> datosLeche = restTemplate.getForObject("http://leche-service/leche/"+proveedorId,List.class);
        System.out.println("leche ok");
        return datosLeche;*/
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<List<LecheModel>> response = restTemplate.exchange("http://leche-service/leche/"+proveedorId, HttpMethod.GET, entity, new ParameterizedTypeReference<List<LecheModel>>() {});

        List<LecheModel> leche = response.getBody();
        return leche;

    }

    public List<Float> calculoAcopio(String proveedorId){
        List<AcopioModel> acopio = consultaAcopio(proveedorId);
        Float kilos = 0.0f;
        Float bonus = 0.0f;
        Float varKilos = 0.0f;
        List<Float> lecheYbonus = new ArrayList<>();
        List<String> turnos = new ArrayList<>();
        /*for (AcopioModel elemento : acopio){

            kilos += elemento.getKgLeche();

            if(!turnos.contains(elemento.getTurno())){
                turnos.add(elemento.getTurno());
            }
        }*/

        for(int i = 0; i<acopio.size();i++){
            kilos += acopio.get(i).getKgLeche();

            if(!turnos.contains(acopio.get(i).getTurno())){
                turnos.add(acopio.get(i).getTurno());
            }
        }
        if (acopio.size()>1)
            varKilos = (acopio.get(0).getKgLeche() - acopio.get(acopio.size()-1).getKgLeche())/acopio.get(0).getKgLeche();

        for(String turno: turnos){
            if(turno=="M"){
                bonus += 0.12f;
            } else{
                bonus += 0.08f;
            }
        }


        lecheYbonus.add(kilos);
        lecheYbonus.add(bonus);
        lecheYbonus.add(varKilos);

        return lecheYbonus;

    }

    public List<Float> calculoLeche (String proveedorId){
        List<LecheModel> leche = consultaLeche(proveedorId);
        Float avgGrasa = 0.0f;
        Float avgSolido = 0.0f;
        Float varGrasa;
        Float varSolido;
        List <Float> avgYvar = new ArrayList<>();

        for(LecheModel elemento : leche){
            avgGrasa += elemento.getGrasa();
            avgSolido += elemento.getSolido();
        }
        avgGrasa = avgGrasa/ leche.size();
        avgSolido = avgSolido / leche.size();

        varGrasa = (leche.get(0).getGrasa() - leche.get(leche.size()-1).getGrasa())/leche.get(0).getGrasa();
        varSolido = (leche.get(0).getSolido() - leche.get(leche.size()-1).getSolido())/leche.get(0).getSolido();


        avgYvar.add(avgGrasa);
        avgYvar.add(varGrasa);
        avgYvar.add(avgSolido);
        avgYvar.add(varSolido);

        return avgYvar;
    }

    public int precioCategoria(String categoria){
        int precioCat;
        System.out.println(categoria);
        if(categoria.equals("A")){
            precioCat = 700;
        } else if (categoria.equals("B")) {
            precioCat = 550;
        } else if (categoria.equals("C")) {
            precioCat = 400;
        } else if (categoria.equals("D")) {
            precioCat = 250;
        } else {
            precioCat = 0;
        }
        return precioCat;
    }

    public int precioGrasa(Float gt){
        int precioGrasa = 0;

        if(gt <= 20){
            precioGrasa+= 30;
        } else if (gt >= 21 && gt <= 45) {
            precioGrasa+= 80;
        } else if (gt <= 100) {
            precioGrasa+= 120;
        }

        return precioGrasa;
    }

    public int precioSolido(Float st){
        int precioSolido = 0;

        if(st < 7){
            precioSolido+= -130;
        } else if (st >= 8 && st <= 18) {
            precioSolido+= -90;
        }else if (st >= 19 && st <= 35) {
            precioSolido+= 95;
        } else if (st <= 100) {
            precioSolido+= 150;
        }

        return precioSolido;
    }

    public Float descLeche(Float varLeche){
        Float descLeche = 0f;
        if (varLeche >= 9 && varLeche <= 25) {
            descLeche+= 0.07f;
        } else if (varLeche >= 26 && varLeche <= 45) {
            descLeche+= 0.15f;
        } else if (varLeche <= 100){
            descLeche+= 0.3f;
        }
        return descLeche;
    }

    public Float descGrasa(Float varGrasa){
        Float descGrasa=0f;
        if (varGrasa >= 16 && varGrasa <= 25) {
            descGrasa+= 0.12f;
        } else if (varGrasa >= 26 && varGrasa <= 40) {
            descGrasa+= 0.2f;
        } else if (varGrasa <= 100){
            descGrasa+= 0.3f;
        }

        return descGrasa;
    }

    public Float descSolido(Float varSolido){
        Float descSolido=0f;

        if (varSolido >= 7 && varSolido <= 12) {
            descSolido+= 0.18f;
        } else if (varSolido >= 13 && varSolido <= 35) {
            descSolido+= 0.27f;
        } else if (varSolido <= 100){
            descSolido+= 0.45f;
        }

        return descSolido;
    }

    public PagoEntity calculoPago(String proveedorId){
        PagoEntity pago = new PagoEntity();
        ProveedorModel proveedor = consultaProveedor(proveedorId);
        /**
         * proveedor:
         * {
         * nombre : "Nombre"
         * categoria : "A"
         * retencion : "Si"
         */

        pago.setProveedorId(proveedorId);
        pago.setNombre(proveedor.getNombre());

        int precioCat = precioCategoria(proveedor.getCategoria());
        System.out.println(precioCat);

        Float retencion = 0.0f;
        if (proveedor.getRetencion() == "Si") {
            retencion = 0.13f;
        }

        List<Float> acopio = calculoAcopio(proveedorId);
        Float kilos = acopio.get(0);
        Float bonus = acopio.get(1);

        pago.setKilos(kilos);
        pago.setFreqBonus(bonus);

        List<Float> leche = calculoLeche(proveedorId);

        int precioGr = precioGrasa(leche.get(0));
        int precioSo = precioSolido(leche.get(2));

        pago.setPagoLeche(precioCat * kilos);
        pago.setPagoGrasa(precioGr * kilos);
        pago.setPagoSolido(precioSo * kilos);

        Float descGr = descGrasa(leche.get(1));
        Float descSo = descSolido(leche.get(3));
        Float descLe = descLeche(acopio.get(2));

        pago.setDescGrasa(descGr * kilos);
        pago.setDescSolido(descSo * kilos);
        pago.setDescLeche(descLe * kilos);

        Float pagoTotal = pago.getPagoSolido() + pago.getPagoGrasa() + pago.getPagoLeche() - (pago.getDescGrasa() + pago.getDescSolido() + pago.getDescLeche());
        pago.setPagoTotal(pagoTotal);

        if(pagoTotal>=950000){
            pago.setPagoFinal(pagoTotal-pagoTotal*retencion);
        }
        pago.setRetencion(retencion);
        pago.setPagoFinal(pagoTotal);

        pagoRepository.save(pago);
        return pago;
    }

    public List<PagoEntity> calculoPlanilla(){


        List<String> proveedoresId = listaProveedorId();

        for(String proveedorId : proveedoresId){
            calculoPago(proveedorId);
        }

        return (List<PagoEntity>) pagoRepository.findAll();
    }
    public void vaciarDB(){
        pagoRepository.deleteAll();
    }
}
