package com.example.demo.service;


import org.springframework.stereotype.Service;

import com.example.demo.model.Result;
import com.example.demo.repo.ResultRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ResultService implements IResultService{

	@Autowired
	private ResultRepository resultRepo;
	
	
	@Override
	public List<Result> findAllResult() {
		// TODO Auto-generated method stub
		return resultRepo.findAll();
	}


	public Optional<Result> findResultById(int id) {
		return resultRepo.findById(id);
	}
	
	public Result findByStudentName(String studentName) {
		
		Result res=resultRepo.findByStudentName(studentName);
		
		return res;
		
	}
	
	public Result saveResult(Result newResult) {
		
		Result Result=resultRepo.save(newResult);
		return Result;
		
	}

	public Result updateResult(int id,Result result) {
		
		Optional<Result> retrievedResult=resultRepo.findById(id);
		
		if(retrievedResult==null)
			try {
				throw new Exception("Result not found");
			} catch (Exception e) {
				e.printStackTrace();
			}
		resultRepo.save(result);
		return resultRepo.findById(id).get();
		
	}
	
	public Result deleteResult(int resultId) {
		
		Optional<Result> retrievedResult=resultRepo.findById(resultId);
		if(retrievedResult==null)
			try {
				throw new Exception("Result not found");
			} catch (Exception e) {
				e.printStackTrace();
			}
		resultRepo.deleteById(resultId);
		return retrievedResult.get();
			
	}
}
