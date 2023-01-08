package com.oop.project.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.oop.project.models.User;
import com.oop.project.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import java.util.Collections;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> get(int id) throws Exception {
        Optional<User> user = this.userRepository.findById(id);
        return user;
    }

    public void create(String username, String email, String googleSubId, String profilePic) {
        User user = new User(username, email, googleSubId, profilePic);
        this.userRepository.save(user);
    }

    public Payload login(String token) throws Exception {
        String CLIENT_ID = "192136603544-5f21lpassjk3e09ci5o0if0d5csmnsvj.apps.googleusercontent.com";
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
        .setAudience(Collections.singletonList(CLIENT_ID))
        .build();
        GoogleIdToken idToken = verifier.verify(token);
        if (idToken != null) {
            Payload payload = idToken.getPayload();

            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);

            // Get profile information from payload
            String email = payload.getEmail();
            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String locale = (String) payload.get("locale");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");

            System.out.println(email);
            System.out.println(name);
            System.out.println(pictureUrl);

            return payload;
        } else {
            return null;
        }
    }

}
