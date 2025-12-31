package com.example.booker.dao;

import com.example.booker.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TransactionDao extends JpaRepository<Transaction, Long> {

    @Query("SELECT t FROM Transaction t WHERE t.id_vi = :id_vi")
    public List<Transaction> findByIdVi(String id_vi);
    
    // Lấy transaction mới nhất của một ví (sắp xếp theo ngày giảm dần)
    @Query("SELECT t FROM Transaction t WHERE t.id_vi = :id_vi ORDER BY t.transactionDate DESC, t.transaction_id DESC")
    public List<Transaction> findByIdViOrderByDateDesc(String id_vi);
}
