package com.packt.cardatabase.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Classe {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long classeid;
	private String  name ;
	
	public Classe() {
	}

	public Classe(String name) {
		super();
		this.name = name;
	}

	
	public Long getClasseid() {
		return classeid;
	}

	public void setClasseid(Long classeid) {
		this.classeid = classeid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
