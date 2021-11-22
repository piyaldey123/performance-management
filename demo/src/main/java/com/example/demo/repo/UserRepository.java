package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUserName(String userName);
	
	public boolean existsByContact(long contact);
	public boolean existsByEmailId(String emailId);
	public boolean existsByUserName(String userName);
	public boolean existsByPassword(String password);

}
