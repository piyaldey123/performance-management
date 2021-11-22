package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.example.demo.repo.UserRepository;
import com.example.demo.model.User;
import com.example.demo.repo.ResultRepository;

@Component("userSecurity")
public class UserSecurity {
	
	@Autowired
	UserRepository userRepo;
	@Autowired
	ResultRepository resultRepo;
	
	public boolean hasUserId(Authentication authentication, Integer userId) {
		
		int userID=userRepo.findByUserName(authentication.getName()).getUserId();
//		System.out.println(userId+"  "+userID);
            if(userID==userId)
            	return true;
            
            return false;  
    }
	
}
