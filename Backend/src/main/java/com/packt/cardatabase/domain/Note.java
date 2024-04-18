package com.packt.cardatabase.domain;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Note {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String name;
	private Date dateNote;

	public Note() {
	}


	public Note(String name, Date dateNote, Etudiant etudiant, Matiere matiere, Professeur professeur) {
		super();
		this.name = name;
		this.dateNote = dateNote;
		this.etudiant = etudiant;
		this.matiere = matiere;
		this.professeur = professeur;
	}

		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "etudiant")
		private Etudiant etudiant;
		
		public Etudiant getEtudiant() {
			return etudiant;
		}
		
		public void setEtudiant(Etudiant etudiant) {
			this.etudiant = etudiant;
		}
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "matiere")
		private Matiere matiere;
		
		public Matiere getMatiere() {
			return matiere;
		}
		
		public void setMatiere(Matiere matiere) {
			this.matiere = matiere;
		}
		
		@ManyToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "professeur")
		private Professeur professeur;
		
		public Professeur getProfesseur() {
			return professeur;
		}
		
		public void setProfesseur(Professeur professeur) {
			this.professeur = professeur;
		}

}
