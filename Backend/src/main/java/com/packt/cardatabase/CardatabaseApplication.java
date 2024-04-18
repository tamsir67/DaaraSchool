package com.packt.cardatabase;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.packt.cardatabase.domain.AppUser;
import com.packt.cardatabase.domain.AppUserRepository;
import com.packt.cardatabase.domain.Car;
import com.packt.cardatabase.domain.CarRepository;
import com.packt.cardatabase.domain.Employe;
import com.packt.cardatabase.domain.EmployeRepository;
import com.packt.cardatabase.domain.Owner;
import com.packt.cardatabase.domain.OwnerRepository;
import com.packt.cardatabase.domain.Professeur;
import com.packt.cardatabase.domain.ProfesseurRepository;
import com.packt.cardatabase.domain.Etudiant;
import com.packt.cardatabase.domain.EtudiantRepository;
import com.packt.cardatabase.domain.Inscription;
import com.packt.cardatabase.domain.InscriptionRepository;

@SpringBootApplication
public class CardatabaseApplication implements CommandLineRunner {
	private static final Logger logger = LoggerFactory.getLogger(CardatabaseApplication.class);
	private final AppUserRepository urepository;
	private final EtudiantRepository erepository;
	private final ProfesseurRepository prepository;
	private final InscriptionRepository irepository;
	private final EmployeRepository emrepository;


	public CardatabaseApplication(AppUserRepository urepository, EtudiantRepository erepository, ProfesseurRepository prepository, InscriptionRepository irepository, EmployeRepository emrepository) {
		this.urepository = urepository;
		this.erepository = erepository;
		this.prepository = prepository;
		this.irepository = irepository;
		this.emrepository = emrepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(CardatabaseApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		Etudiant etudiant1 = new Etudiant("003","Youssoupha", "Diouf","aaa", "bbb", "ccc");
		erepository.save(etudiant1);
		
		Professeur professeur1 = new Professeur("Moussa", "Cissokho","ciss@gmail.com", "Dakar", "78 987 89 90");
		prepository.save(professeur1);
		
		Employe employe1 = new Employe("123", "Fatou","BA", "fatou@gmail.com", "Dakar", "78 987 89 90", "Secrétaire", 150000);
		emrepository.save(employe1);
		
		// Username: user, password: user
		urepository.save(new AppUser("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));
		// Username: admin, password: admin
		urepository.save(new AppUser("admin","$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
		
	}
}
