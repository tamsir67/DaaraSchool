package com.packt.cardatabase.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cardatabase.domain.Classe;
import com.packt.cardatabase.domain.ClasseRepository;

@RestController
public class ClasseController {
	private final ClasseRepository repository;

	public ClasseController(ClasseRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/classes")
	public Iterable<Classe> getClasses() {
		return repository.findAll();
	}
}
