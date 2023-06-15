package cl.mingeso.pagoservice.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcopioModel {
    private Date fecha;
    private String turno;
    private Float kgLeche;
}
