package cl.mingeso.pagoservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PagoEntity {
    @Id
    @NonNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;
    private String proveedorId;
    private String nombreProveedor;
    private Float kilos;
    private Float pagoLeche;
    private Float pagoGrasa;
    private Float pagoSolido;
    private Float freqBonus;
    private Float descLeche;
    private Float descGrasa;
    private Float descSolido;
    private Float pagoTotal;
    private Float retencion;
    private Float pagoFinal;
    private Float totalKilos;
    private Float varLeche;
    private Float varGrasa;
    private Float varSolido;

}
