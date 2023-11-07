/*
Le design pattern Factory est un patron de conception de création 
qui permet de déléguer la création d'objets à des classes spécialisées 
appelées "usines" (factories). Au lieu de créer des objets directement
à partir d'une classe, le client demande simplement à l'usine de créer
l'objet souhaité en lui passant des paramètres pertinents.

L'usine est responsable de la création de l'objet et peut retourner
une instance d'une sous-classe appropriée en fonction des
paramètres fournis. Le pattern Factory est souvent utilisé pour encapsuler
la logique de création d'objets dans une seule classe,
ce qui facilite la maintenance et l'évolutivité du code.
*/

class Admin {
  constructor() {
    this.name = 'user A';
  }
}

class Member {
  constructor() {
    this.name = 'user B';
  }
}

class Factory {
  createUser(type) {
    switch (type) {
      case 'admin':
        return new Admin();
      case 'member':
        return new Member();
      default:
        throw new Error(`type d'utilisateur inconnu ${type}`);
    }
  }
}

const factory = new factory();
const user1 = factory.createUser('admin');
const user2 = factory.createUser('member');
