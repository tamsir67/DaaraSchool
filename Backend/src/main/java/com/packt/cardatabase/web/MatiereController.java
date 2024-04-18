package com.packt.cardatabase.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cardatabase.domain.Matiere;
import com.packt.cardatabase.domain.MatiereRepository;

@RestController
public class MatiereController {
	private final MatiereRepository repository;

	public MatiereController(MatiereRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/matieres")
	public Iterable<Matiere> getMatieres() {
		return repository.findAll();
	}
}
