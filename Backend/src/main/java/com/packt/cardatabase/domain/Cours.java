package com.packt.cardatabase.domain;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Cours {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String  codeCours ;
	private Date dateCours;
	private int heureDebut, heureFin, nombreEleve;
	
	public Cours(String codeCours, Date dateCours, int heureDebut, int heureFin, int nombreEleve, Professeur professeur) {
		super();
		this.codeCours = codeCours;
		this.dateCours = dateCours;
		this.heureDebut = heureDebut;
		this.heureFin = heureFin;
		this.nombreEleve = nombreEleve;
	}
	
	public Cours() {
	}
	
	
	public Long getId() {
		return id;
	}

	public String getCodeCours() {
		return codeCours;
	}

	public void setCodeCours(String codeCours) {
		this.codeCours = codeCours;
	}

	public Date getDateCours() {
		return dateCours;
	}

	public void setDateCours(Date dateCours) {
		this.dateCours = dateCours;
	}

	public int getHeureDebut() {
		return heureDebut;
	}

	public void setHeureDebut(int heureDebut) {
		this.heureDebut = heureDebut;
	}

	public int getHeureFin() {
		return heureFin;
	}

	public void setHeureFin(int heureFin) {
		this.heureFin = heureFin;
	}

	public int getNombreEleve() {
		return nombreEleve;
	}

	public void setNombreEleve(int nombreEleve) {
		this.nombreEleve = nombreEleve;
	}

	public void setId(Long id) {
		this.id = id;
	}


}
