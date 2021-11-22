package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Result;
import com.example.demo.service.ResultService;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1")
public class ResultController {
	
	@Autowired
	ResultService resultservice;
	
	@GetMapping("/results")
	public ResponseEntity<List<Result>> getAllResult() {
		return ResponseEntity.ok().body(resultservice.findAllResult());
		
	}
	
	@GetMapping("/results/owned")
	@PostFilter("filterObject.owner==authentication.name")
	public List<Result> getResultOwnedBy() {
		return resultservice.findAllResult();
		
	}
	
	@PostMapping("/results")
	public ResponseEntity<Result> saveResult(@RequestBody Result newResult,Authentication auth) {
		System.out.println(newResult.getSubName()+"  "+auth.getName());
		return ResponseEntity.status(HttpStatus.CREATED).body((resultservice.saveResult(newResult)));
		
	}
	
	@GetMapping("/results/{id}")
	public ResponseEntity<Result> getResultById(@PathVariable("id") int resultId) {
		return ResponseEntity.ok().body(resultservice.findResultById(resultId).get());
		
	}
	
	@PutMapping("/results/{id}")
	public ResponseEntity<Result> updateResult(@PathVariable("id") int resultId,@RequestBody Result newResult) {
		return ResponseEntity.ok().body(resultservice.updateResult(resultId,newResult));
		
	}
	
	@DeleteMapping("/results/{id}")
	public ResponseEntity<Object> deleteResult(@PathVariable("id") int resultId) {
		 resultservice.deleteResult(resultId);
		 return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		
	}
	
	@GetMapping("/results/search")
	public ResponseEntity<?> userDetails(Authentication auth, @RequestParam("sname") String sName) {
		System.out.println(auth.getName().toString());
		Result result=resultservice.findByStudentName(sName);
		if(result==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("result not found");
		}
		return ResponseEntity.ok().body(result);
		
	}
	

}
