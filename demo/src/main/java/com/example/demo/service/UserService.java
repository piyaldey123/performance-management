package com.example.demo.service;


import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.model.Result;
import com.example.demo.repo.UserRepository;
import com.example.demo.model.ResponseMessage;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class UserService implements IUserService{

	@Autowired
	private UserRepository userRepo;
	
	
	public List<User> findAllUsers() {
		return userRepo.findAll();
	}


	public Optional<User> findUserById(int id) {
		return userRepo.findById(id);
	}
	
	public User findByUserName(String userName) {
		
		User user=userRepo.findByUserName(userName);
		return user;
		
	}
	
	public User saveUser(User newUser) {
		
		User user=userRepo.save(newUser);
		return user;
		
	}

	public User updateUser(int id,User user) {
		
		Optional<User> retrievedUser=userRepo.findById(id);
		if(retrievedUser==null)
			try {
				throw new Exception("User not found");
			} catch (Exception e) {
				e.printStackTrace();
			}
		userRepo.save(user);
		return userRepo.findById(id).get();
		
	}
	
	public User deleteUser(int userId) {
		
		Optional<User> retrievedUser=userRepo.findById(userId);
		if(retrievedUser==null)
			try {
				throw new Exception("User not found");
			} catch (Exception e) {
				e.printStackTrace();
			}
		userRepo.deleteById(userId);
		return retrievedUser.get();
		
	}
	String message;
	  public ResponseEntity<ResponseMessage> registrationService(User userDetails){
	    	
	    	try {
	    		if(userRepo.existsByUserName(userDetails.getUserName()))
					throw new Exception("We have another user with same UserName!");
	    		
				if(userRepo.existsByEmailId(userDetails.getEmailId()))
					throw new Exception("Email already exists!");
				
				if(userRepo.existsByContact(userDetails.getContact()))
					throw new Exception("This contact number is already taken!");
				User user = new User(userDetails.getUserId(), userDetails.getUserName(), userDetails.getPassword(), userDetails.getRole(), userDetails.getContact(), 
							userDetails.getEmailId(),userDetails.getAddress());
				saveUser(user);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(e.getMessage()));
			}
	    	String message="Registration Successful!";
	    	return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
	    }	
	  
	  public ResponseEntity<ResponseMessage> login(User userDetails){
		  User user = userRepo.findByUserName(userDetails.getUserName());
		  if(user == null) {
		  throw new RuntimeException("User not exist.");
		  }
		  
		  if(!user.getPassword().equals(userDetails.getPassword())){
		  throw new RuntimeException("Password mismatch.");
		  }
		  String message="login Successful!";
		  return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));

		  }
	  
//	  public ResponseEntity<ResponseMessage> login(User userDetails) {
//		  if(!userRepo.existsByPassword(userDetails.getPassword()))
//			  message="This is not your password!";
//		  else if(!userRepo.existsByUserName(userDetails.getUserName()))
//			  message="Username does not exist";
//		  else{
//			  User user = userRepo.findByUserName(userDetails.getUserName());
//			  message="login Successful!";
//		  }
//		  return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//		  }
	  
	  
}
