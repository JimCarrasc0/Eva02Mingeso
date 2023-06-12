package cl.mingeso.pagoservice.service;

import cl.mingeso.pagoservice.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.List;

public class PagoService {
    @Autowired
    private PagoRepository pagoRepository;

    private final Logger logg = LoggerFactory.getLogger(PagoService.class);

    public void consultaLeche(String proveedorId){
        String zelda = "localhost:8002/leche/" + proveedorId;
        URL url = null;
        try {
            url = new URL(zelda);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        } catch (ProtocolException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
