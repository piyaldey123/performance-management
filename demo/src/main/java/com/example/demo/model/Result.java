package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.example.demo.model.User;;

@Entity
@Table(name="result")
public class Result {

	@Id
	@Column(name="result_id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int resultId;
	
	@OneToOne
	@JoinColumn(name="student_id", referencedColumnName = "user_id")
	private User user_id;
	
	@Column(name="subject_name")
	private String subName;
		
	@Column(name="marks")
	private double marks;
	
	@Column(name="remarks")
	private String remarks;
	
	@Column(name="student_name")
	private String studentName;
	
	
	public Result() {
		super();
	}

	public Result(int resultId, String subName, double marks, String remarks,String studentName) {
		super();
		this.resultId = resultId;
		this.subName = subName;
		this.marks = marks;
		this.remarks = remarks;
		this.studentName= studentName;
	}

	
	
	public int getResultId() {
		return resultId;
	}

	public void setResultId(int resultId) {
		this.resultId = resultId;
	}

	public String getSubName() {
		return subName;
	}

	public void setSubName(String subName) {
		this.subName = subName;
	}

	public double getMarks() {
		return marks;
	}

	public void setMarks(double marks) {
		this.marks = marks;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public User getUser_id() {
		return user_id;
	}

	public void setUser_id(User user_id) {
		this.user_id = user_id;
	
	}
}
