
// USER
export type AppUserResponse = {
  username: string;
  password: string;
  role: string;
  _links: {
    self: {
      href: string;
    },
    user: {
      href: string;
    },
  };
}

export type AppUser = {
  username: string;
  password: string;
  role: string;
}

export type AppUserEntry = {
  user: AppUser;
  url: string;
}

// Inscrit
export type InscriptionResponse = {
  numInscrit: string;
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
  sexe: string;
  dateNaissance: Date;
  dateInscription: Date;
  classe: string;
  montantInscrit: number;
  montantVerse: number;
  _links: {
    self: {
      href: string;
    },
     inscription: {
      href: string;
    }
  };
}


export type Inscription = {
  numInscrit: string;
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
  sexe: string;
  classe: string;
  dateNaissance: Date;
  dateInscription: Date;
  montantInscrit: number;
  montantVerse: number;
}

export type InscriptionEntry = {
  inscription: Inscription;
  url: string;
}

// Etudiant
export type EtudiantResponse = {
  numEtudiant: string;
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
  _links: {
    self: {
      href: string;
    },
     etudiant: {
      href: string;
    }
  };
}


export type Etudiant = {
  numEtudiant: string;
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
}

export type EtudiantEntry = {
  etudiant: Etudiant;
  url: string;
}


// Professeur
export type ProfesseurResponse = {
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
  _links: {
    self: {
      href: string;
    },
     professeur: {
      href: string;
    }
  };
}


export type Professeur = {
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
}

export type ProfesseurEntry = {
  professeur: Professeur;
  url: string;
}

// Matières
export type MatiereResponse = {
  name: string;
  coefficient: string;
  
  _links: {
    self: {
      href: string;
    },
     matiere: {
      href: string;
    }
  };
}


export type Matiere = {
  name: string;
  coefficient: string;
  
}
export type MatiereEntry = {
  matiere: Matiere;
  url: string;
}

// Classe
export type ClasseResponse = {
  name: string;  
  _links: {
    self: {
      href: string;
    },
     classe: {
      href: string;
    }
  };
}


export type Classe = {
  name: string;
  
}
export type ClasseEntry = {
  classe: Classe;
  url: string;
}

// Employe

export type EmployeResponse = {
  numEmploye: string;
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
  fonction : string;
  salaire: string;
  _links: {
    self: {
      href: string;
    },
     employe: {
      href: string;
    }
  };
}


export type Employe = {
  numEmploye: string;
  prenom: string;
  nom: string;
  email: string;
  adresse : string;
  telephone: string;
  fonction: string;
  salaire: string;
}

export type EmployeEntry = {
  employe: Employe;
  url: string;
}