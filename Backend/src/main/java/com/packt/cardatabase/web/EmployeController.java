package com.packt.cardatabase.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cardatabase.domain.Employe;
import com.packt.cardatabase.domain.EmployeRepository;

@RestController
public class EmployeController {
	private final EmployeRepository repository;

	public EmployeController(EmployeRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/employes")
	public Iterable<Employe> getEmployes() {
		return repository.findAll();
	}
}
