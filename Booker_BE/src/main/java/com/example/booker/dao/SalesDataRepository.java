package com.example.booker.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public class SalesDataRepository {

    @Autowired
    private EntityManager entityManager;

    public List<Object[]> getSalesDataLast7Days() {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("GetSalesDataLast7Days");

        // Thực thi stored procedure và lấy kết quả
        return query.getResultList();
    }
}
