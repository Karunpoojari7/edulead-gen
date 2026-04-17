package com.edulead.server.controller;

import com.edulead.server.model.FollowUp;
import com.edulead.server.repository.FollowUpRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/follow-ups")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class FollowUpController {

    private final FollowUpRepository followUpRepository;

    public FollowUpController(FollowUpRepository followUpRepository) {
        this.followUpRepository = followUpRepository;
    }

    @GetMapping
    public List<FollowUp> getAllFollowUps() {
        return followUpRepository.findAll();
    }

    @PostMapping
    public FollowUp createFollowUp(@RequestBody FollowUp followUp) {
        return followUpRepository.save(followUp);
    }
}
