package com.example.demo.model;

import javax.persistence.*;;

@Entity
@Table(name="user")
public class User {

	@Id
	@Column(name="user_id")
	private int userId;
	
	@Column(name="user_name")
	private String userName;
		
	@Column(name="password")
	private String password;
	
	@Column(name="role")
	private String role;
	
	@Column(name="contact_no")
	private long contact;
	
	@Column(name="email_id")
	private String emailId;
	
	@Column(name="address")
	private String address;
	
		
	public User(int userId, String userName, String password, String role, long contact, String emailId, String address ) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.password = password;
		this.role = role;
		this.contact = contact;
		this.emailId = emailId;
		this.address = address;
	}
	
	public User(String userName, String password) {
	super();
	this.userName = userName;
	this.password = password;
	}



	public User() {
		super();
	}
	

	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

	
	public long getContact() {
		return contact;
	}


	public void setContact(long contact) {
		this.contact = contact;
	}


	public String getEmailId() {
		return emailId;
	}


	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	@Override
	public int hashCode() {
		
		return this.userId;
	}


	@Override
	public boolean equals(Object obj) {
		
		
		if(obj==null || !(obj instanceof User) )
			return false;
		return this.userId==((User)obj).getUserId();
	}


	
}
