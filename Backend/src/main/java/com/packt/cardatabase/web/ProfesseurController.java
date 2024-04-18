package com.packt.cardatabase.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.packt.cardatabase.domain.Etudiant;
import com.packt.cardatabase.domain.EtudiantRepository;
import com.packt.cardatabase.domain.Professeur;
import com.packt.cardatabase.domain.ProfesseurRepository;

@RestController
public class ProfesseurController {
	private final ProfesseurRepository repository;

	public ProfesseurController(ProfesseurRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/professeurs")
	public Iterable<Professeur> getProfesseurs() {
		return repository.findAll();
	}
}
