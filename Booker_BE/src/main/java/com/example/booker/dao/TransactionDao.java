package com.example.booker.dao;

import com.example.booker.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransactionDao extends JpaRepository<Transaction, Long> {

    @Query("SELECT t FROM Transaction t WHERE t.id_vi = :id_vi")
    public List<Transaction> findByIdVi(String id_vi);
}
