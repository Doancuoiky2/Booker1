package com.example.booker.restController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/locations")
public class LocationController {

    private final RestTemplate restTemplate;

    public LocationController() {
        this.restTemplate = new RestTemplate();
    }

    // Lấy danh sách tỉnh/thành phố cùng quận/huyện và phường/xã (depth=3)
    @GetMapping("/provinces")
    public ResponseEntity<?> getProvincesWithDetails() {
        String url = "https://provinces.open-api.vn/api/?depth=3";

        try {
            Object provinces = restTemplate.getForObject(url, Object.class);
            return ResponseEntity.ok(provinces);
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching provinces: " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching provinces.");
        }
    }

    // Lấy danh sách phường/xã theo quận/huyện (trường hợp cần bổ sung riêng)
    @GetMapping("/wards/{districtCode}")
    public ResponseEntity<?> getWardsByDistrict(@PathVariable String districtCode) {
        String url = "https://provinces.open-api.vn/api/w/" + districtCode;

        try {
            Object wards = restTemplate.getForObject(url, Object.class);
            return ResponseEntity.ok(wards);
        } catch (HttpClientErrorException e) {
            System.err.println("Error fetching wards: " + e.getResponseBodyAsString());
            return ResponseEntity.status(e.getStatusCode()).body(e.getResponseBodyAsString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching wards.");
        }
    }
}
