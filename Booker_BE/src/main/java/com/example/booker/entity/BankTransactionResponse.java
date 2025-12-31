package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BankTransactionResponse {
    private Boolean status;
    private BankTransactionData data;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class BankTransactionData {
        @JsonProperty("ChiTietGiaoDich")
        private List<ChiTietGiaoDich> chiTietGiaoDich;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class ChiTietGiaoDich {
        @JsonProperty("SoThamChieu")
        private String soThamChieu;
        
        @JsonProperty("SoTienGhiCo")
        private String soTienGhiCo;
        
        @JsonProperty("MoTa")
        private String moTa;
        
        @JsonProperty("NgayGiaoDich")
        private String ngayGiaoDich;
        
        @JsonProperty("PostingTime")
        private String postingTime;
        
        @JsonProperty("CD")
        private String cd; // "+" hoặc "-"
    }
}

