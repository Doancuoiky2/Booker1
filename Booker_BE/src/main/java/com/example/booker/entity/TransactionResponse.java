package com.example.booker.entity;

import com.example.booker.entity.Transaction;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TransactionResponse {
    private boolean status;
    private String message;
    private List<Transaction> transactions;


}
