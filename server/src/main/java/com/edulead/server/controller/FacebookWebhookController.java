package com.edulead.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/facebook")
public class FacebookWebhookController {

    private final String VERIFY_TOKEN = "leadcrm123";

    // ✅ Verification (GET request from Facebook)
    @GetMapping("/webhook")
    public String verifyWebhook(
            @RequestParam("hub.mode") String mode,
            @RequestParam("hub.verify_token") String token,
            @RequestParam("hub.challenge") String challenge) {

        if ("subscribe".equals(mode) && VERIFY_TOKEN.equals(token)) {
            return challenge;
        }
        return "Verification failed";
    }

    // ✅ Receive Lead Data (POST request)
    @PostMapping("/webhook")
    public ResponseEntity<?> receiveLead(@RequestBody String payload) {
        System.out.println("🔥 Lead Received: " + payload);
        return ResponseEntity.ok().build();
    }
}
