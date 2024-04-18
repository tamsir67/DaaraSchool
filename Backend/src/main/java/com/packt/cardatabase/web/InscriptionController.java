package com.packt.cardatabase.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cardatabase.domain.Inscription;
import com.packt.cardatabase.domain.InscriptionRepository;

@RestController
public class InscriptionController {
	private final InscriptionRepository repository;

	public InscriptionController(InscriptionRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/inscriptions")
	public Iterable<Inscription> getInscriptions() {
		return repository.findAll();
	}
}
