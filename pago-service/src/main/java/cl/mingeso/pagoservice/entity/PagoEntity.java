package cl.mingeso.pagoservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private Integer id;
    private String proveedorId;
    private String nombre;
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

}
