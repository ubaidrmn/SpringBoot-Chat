package com.oop.project.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.oop.project.dtos.FriendDto;
import com.oop.project.dtos.NotificationDto;
import com.oop.project.models.User;
import com.oop.project.models.Chat;
import com.oop.project.models.Message;
import com.oop.project.repository.ChatRepository;
import com.oop.project.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public Optional<User> get(int id) throws Exception {
        Optional<User> user = this.userRepository.findById(id);
        return user;
    }

    public User getByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public void create(String username, String email, String googleSubId, String profilePic) {
        User user = new User(username, email, googleSubId, profilePic);
        this.userRepository.save(user);
    }

    public GoogleIdToken verify(String token) throws GeneralSecurityException, IOException {
        String CLIENT_ID = "192136603544-5f21lpassjk3e09ci5o0if0d5csmnsvj.apps.googleusercontent.com";
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
        .setAudience(Collections.singletonList(CLIENT_ID))
        .build();
        GoogleIdToken idToken = verifier.verify(token);
        return idToken;
    }

    public Payload login(String token) throws Exception {
        GoogleIdToken idToken = this.verify(token);
        if (idToken != null) {
            Payload payload = idToken.getPayload();
            String userId = payload.getSubject();
            System.out.println("User ID: " + userId);
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String googleSubId = (String) payload.get("sub");
            System.out.println(email);
            System.out.println(name);
            System.out.println(pictureUrl);
            if (this.userRepository.findByGoogleSubId(googleSubId) == null) {
                this.create(name, email, googleSubId, pictureUrl);
            }
            return payload;
        } else {
            return null;
        }
    }

    public void acceptRequest(String token, String email) throws Exception {
        Payload payload = this.login(token);
		User user = this.getByEmail((String) payload.get("email"));
        User sender = this.getByEmail(email);
		List<User> requests = user.getRequests();
		List<User> friends = user.getFriends();
		List<User> senderFriends = sender.getFriends();
        
		boolean alreadyAFriend = false;

		for (int i=0;i<friends.size();i++) {
			if (friends.get(i).getEmail().equals(email)) {
				alreadyAFriend = true;
				break;
			}
		}

		if (!alreadyAFriend) {
			for (int i=0;i<requests.size();i++) {

				if (requests.get(i).getEmail().equals(email)) {
                    System.out.println("GOT EM");
					friends.add(requests.get(i));
					requests.remove(i);
                    senderFriends.add(user);
                    user.setRequests(requests);
                    user.setFriends(friends);
                    sender.setFriends(senderFriends);
                    this.userRepository.save(user);
                    this.userRepository.save(sender);
                    List<User> members = new ArrayList<>();
                    members.add(user);
                    members.add(sender);
                    Chat chat = new Chat(new ArrayList<Message>(), members);
                    this.chatRepository.save(chat);
		            this.simpMessagingTemplate.convertAndSend("/chatnotify"+email, new NotificationDto(((String) payload.get("email")) + " accepted your friend request"));

				}
			}
		}
    }

    public void addFriend(String token, String email) throws Exception {
        Payload payload = this.login(token);
		User user = this.getByEmail(email);
		List<User> requests = user.getRequests();
		List<User> friends = user.getFriends();

        boolean requestAlreadyExists = false;
        boolean alreadyAFriend = false;

        for (int i=0;i<friends.size();i++) {
			if (friends.get(i).getEmail().equals((String) payload.get("email"))) {
				alreadyAFriend = true;
				break;
			}
		}

        for (int i=0;i<requests.size();i++) {
            System.out.println(requests.get(i).getEmail());
            if (requests.get(i).getEmail().equals((String) payload.get("email"))) {
                requestAlreadyExists = true;
				break;
            }
        }
        
        System.out.println(alreadyAFriend + " " + requestAlreadyExists);
        if (!alreadyAFriend & !requestAlreadyExists) {
            requests.add(this.getByEmail((String) payload.get("email")));
            user.setRequests(requests);
            this.userRepository.save(user);
		    this.simpMessagingTemplate.convertAndSend("/chatnotify"+email, new NotificationDto("You have a new friend request"));
        }
    }

    public HashMap<String, List<FriendDto>> getFriends(String token) throws Exception {
        HashMap<String, List<FriendDto>> map = new HashMap<>();
        Payload payload = this.login(token);
        User user = this.getByEmail((String) payload.getEmail());
        List<FriendDto> friends = new ArrayList<>();
        List<User> userFriends = user.getFriends();
        for (int i=0;i<userFriends.size();i++) {
            friends.add(new FriendDto(userFriends.get(i)));
        }
        List<FriendDto> requests = new ArrayList<>();
        List<User> userRequests = user.getRequests();
        for (int i=0;i<userRequests.size();i++) {
            requests.add(new FriendDto(userRequests.get(i)));
        }
        map.put("friends", friends);
        map.put("requests", requests);
        return map;
    }

}
