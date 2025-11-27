package com.example.booker.request;

import com.example.booker.entity.Transaction;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
public class ApiResponse<T> {

    private int code;
    private String message;
    private T result;
    private List<Transaction> transactions;
}
