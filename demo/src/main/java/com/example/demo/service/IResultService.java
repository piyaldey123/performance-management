package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.model.Result;

public interface IResultService {

	
	public List<Result> findAllResult() ;

	public Optional<Result> findResultById(int id);
	
	public Result findByStudentName(String studentName) ;

}
