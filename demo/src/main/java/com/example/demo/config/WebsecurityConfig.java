package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
public class WebsecurityConfig extends WebSecurityConfigurerAdapter {

	
	@Autowired
	UserDetailsService userDetailsService;
	
	
	
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		
		return super.authenticationManagerBean();
	}
	

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
				
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();

		
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		
		http.authorizeRequests().antMatchers(HttpMethod.POST).hasAnyRole("ADMIN")
		.antMatchers(HttpMethod.PUT).hasAnyRole("ADMIN")
		.antMatchers(HttpMethod.DELETE).hasAnyRole("ADMIN")
		.antMatchers(HttpMethod.GET,"/v1/results").hasAnyRole("ADMIN")
//		.antMatchers(HttpMethod.GET,"/v1/results/{studentName}").access("@userSecurity.hasStudentName(authentication,#studentName)")
//		.antMatchers(HttpMethod.GET,"/v1/results/{resultId}").access("@userSecurity.hasUserId(authentication,#resultId)")
		.antMatchers(HttpMethod.GET,"/v1/results/{userId}").hasAnyRole("ADMIN","STUDENT")
		
		//.antMatchers(HttpMethod.GET,"/v1/results/{studentName}").hasAnyRole("ADMIN")
			
		.antMatchers(HttpMethod.GET,"/v1/users").hasAnyRole("ADMIN","STUDENT")
//		.antMatchers(HttpMethod.GET,"/v1/users/{userId}").access("@userSecurity.hasUserId(authentication,#userId)")
		.antMatchers(HttpMethod.GET,"/v1/users/{userId}").hasAnyRole("ADMIN")
		.antMatchers(HttpMethod.POST,"/v1/login").hasAnyRole("ADMIN","STUDENT")
		;
		
		
	    
		
		
		http.cors().disable();
		http.csrf().disable();
		http.headers().frameOptions().disable();
		
		super.configure(http);
		
		
		
	}
	
}











