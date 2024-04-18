package com.packt.cardatabase.domain;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Inscription {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(unique=true)
	private String email;
	private String  numInscrit, prenom, nom, adresse, telephone,sexe, classe ;
	@DateTimeFormat(pattern = "dd/mm/yyyy")
	private Date dateNaissance;
	private Date dateInscription;
	private int montantInscrit, montantVerse;
		
	public Inscription() {
	}
	
	public Inscription(String email, String numInscrit, String prenom, String nom, String adresse, String telephone,
			String sexe, String classe, Date dateNaissance, Date dateInscription, int montantInscrit,
			int montantVerse) {
		super();
		this.email = email;
		this.numInscrit = numInscrit;
		this.prenom = prenom;
		this.nom = nom;
		this.adresse = adresse;
		this.telephone = telephone;
		this.sexe = sexe;
		this.classe = classe;
		this.dateNaissance = dateNaissance;
		this.dateInscription = dateInscription;
		this.montantInscrit = montantInscrit;
		this.montantVerse = montantVerse;
	}

	public Date getDateInscription() {
		return dateInscription;
	}

	public void setDateInscription(Date dateInscription) {
		this.dateInscription = dateInscription;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNumInscrit() {
		return numInscrit;
	}

	public void setNumInscrit(String numInscrit) {
		this.numInscrit = numInscrit;
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

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public int getMontantInscrit() {
		return montantInscrit;
	}

	public void setMontantInscrit(int montantInscrit) {
		this.montantInscrit = montantInscrit;
	}

	public int getMontantVerse() {
		return montantVerse;
	}

	public void setMontantVerse(int montantVerse) {
		this.montantVerse = montantVerse;
	}

	public String getClasse() {
		return classe;
	}

	public void setClasse(String classe) {
		this.classe = classe;
	}
	
}	
	
