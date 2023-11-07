/*
Le design pattern Observable est un patron de conception comportemental
qui permet de créer une relation de dépendance un-à-plusieurs entre objets, 
de sorte que lorsqu'un objet change d'état, tous les objets qui en dépendent
sont notifiés automatiquement.

Il est composé d'un objet observable (sujet)et d'objets observateurs (observateurs)
qui s'inscrivent auprès de l'objet observable pour recevoir des notifications
en cas de changement d'état. Lorsqu'un objet observable change d'état,
il notifie tous les observateurs en invoquant une méthode de notification appropriée.
Les observateurs peuvent alors effectuer des actions en réponse à la notification,
telles que mettre à jour leur état ou effectuer des calculs. Le pattern Observable est
souvent utilisé pour implémenter des événements et des notifications dans les applications,
ce qui facilite la communication et la synchronisation entre les différents composants de l'application.
*/

class Observable {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notifyObservers() {
    this.observers.forEach((o) => observer.update(this));
  }
}

class Observer {
  update(observable) {
    console.log(observable.name);
  }
}

class User extends Observable {
  #name;
  constructor(name) {
    super();
    this.#name = name;
  }
  get name() {
    return this.#name;
  }
  set name(newName) {
    this.#name = newName;
    this.notifyObservers();
  }
}

const nib = new User('Benoît');

const friend1 = new Observer();
const friend2 = new Observer();

nib.addObserver(friend1);
nib.addObserver(friend2);

nib.name = 'Joe';
