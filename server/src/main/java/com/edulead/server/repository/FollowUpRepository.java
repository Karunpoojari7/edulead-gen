package com.edulead.server.repository;

import com.edulead.server.model.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    List<FollowUp> findByStatus(String status);
    long countByLeadId(Long leadId);
}
