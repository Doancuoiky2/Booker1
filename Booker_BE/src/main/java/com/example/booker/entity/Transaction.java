package com.example.booker.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "transaction", 
         uniqueConstraints = @UniqueConstraint(columnNames = "transaction_id"))
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Transaction {

    @Id
    @JsonProperty("transactionID")
    @Column(unique = true)
    private Long transaction_id;
    private BigDecimal amount;
    private String description;
    @Column(name = "transaction_date")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private Date transactionDate;
    private String type;
    @Column(name = "id_vi")
    String id_vi;
    @ManyToOne
    @JoinColumn(name = "id_vi", insertable = false, updatable = false)
    Vi vi;
}
