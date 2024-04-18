package com.packt.cardatabase.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Employe {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(unique=true)
	private String email;
	private String  numEmploye, prenom, nom, adresse, telephone, fonction ;
	private int salaire ;
	
	public Employe() {
	}

	public Employe(String numEmploye, String prenom, String nom, String email, String adresse, String telephone,
			String fonction, int salaire) {
		super();
		this.numEmploye = numEmploye;
		this.prenom = prenom;
		this.nom = nom;
		this.email = email;
		this.adresse = adresse;
		this.telephone = telephone;
		this.fonction = fonction;
		this.salaire = salaire;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumEmploye() {
		return numEmploye;
	}

	public void setNumEmploye(String numEmploye) {
		this.numEmploye = numEmploye;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getFonction() {
		return fonction;
	}

	public void setFonction(String fonction) {
		this.fonction = fonction;
	}

	public int getSalaire() {
		return salaire;
	}

	public void setSalaire(int salaire) {
		this.salaire = salaire;
	}

	

}
