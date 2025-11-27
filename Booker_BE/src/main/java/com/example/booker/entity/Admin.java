package com.example.booker.entity;



import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor

public class Admin {

  private   Float tong_tien_nap;
  private  Float tong_tien_rut;
  private Float doanh_thu_san;
  private Float doanh_thu_cua_hang;

}