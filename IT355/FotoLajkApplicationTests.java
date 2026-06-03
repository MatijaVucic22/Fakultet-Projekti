package com.example.fotolajk.model;

import java.util.ArrayList;
import java.util.List;

public class User {
    private Long id;
    private String username;
    private String email;
    private List<Long> photoIds = new ArrayList<>();

    public User() {}

    public User(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    // Getteri i setteri
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<Long> getPhotoIds() { return photoIds; }
    public void setPhotoIds(List<Long> photoIds) { this.photoIds = photoIds; }

    // Pomocne metode
    public void addPhotoId(Long photoId) {
        if (!this.photoIds.contains(photoId)) {
            this.photoIds.add(photoId);
        }
    }

    public void removePhotoId(Long photoId) {
        this.photoIds.remove(photoId);
    }
}
