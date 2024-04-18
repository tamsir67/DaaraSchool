package com.packt.cardatabase.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cardatabase.domain.Etudiant;
import com.packt.cardatabase.domain.EtudiantRepository;

@RestController
public class EtudiantController {
	private final EtudiantRepository repository;

	public EtudiantController(EtudiantRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/etudiants")
	public Iterable<Etudiant> getEtudiants() {
		return repository.findAll();
	}
}
