BEGIN;

INSERT INTO
  "book" ("title", "author")
VALUES
  ('Le petit prince', 'Antoine de Saint-Exupéry'),
  (
    'Harry Potter et la pierre philosophale',
    'J.K. Rowling'
  ),
  (
    'Le Seigneur des anneaux : La Communauté de l''Anneau',
    'J.R.R. Tolkien'
  ),
  ('Le Nom de la rose', 'Umberto Eco'),
  ('1984', 'George Orwell'),
  ('Le Parfum', 'Patrick Süskind'),
  ('La Peste', 'Albert Camus'),
  ('Les Misérables', 'Victor Hugo'),
  ('Guerre et Paix', 'Léon Tolstoï'),
  ('Orgueil et Préjugés', 'Jane Austen');

INSERT INTO movie (title, director)
VALUES
  ('The Shawshank Redemption', 'Frank Darabont'),
  ('The Godfather', 'Francis Ford Coppola'),
  ('The Godfather: Part II', 'Francis Ford Coppola'),
  ('The Dark Knight', 'Christopher Nolan'),
  ('12 Angry Men', 'Sidney Lumet'),
  ('Schindler''s List', 'Steven Spielberg'),
  ('The Lord of the Rings: The Return of the King', 'Peter Jackson'),
  ('Pulp Fiction', 'Quentin Tarantino'),
  ('The Good, the Bad and the Ugly', 'Sergio Leone'),
  ('Fight Club', 'David Fincher');

INSERT INTO music (title, compositor)
VALUES
  ('Stairway to Heaven', 'Led Zeppelin'),
  ('Bohemian Rhapsody', 'Queen'),
  ('Imagine', 'John Lennon'),
  ('Billie Jean', 'Michael Jackson'),
  ('Hotel California', 'The Eagles'),
  ('Like a Rolling Stone', 'Bob Dylan'),
  ('I Will Always Love You', 'Dolly Parton'),
  ('Smells Like Teen Spirit', 'Nirvana'),
  ('My Heart Will Go On', 'James Horner'),
  ('Hey Jude', 'The Beatles');

INSERT INTO
  "permission" ("label")
VALUES
  ('create'),
  ('read'),
  ('update'),
  ('delete');

INSERT INTO
  "role" ("label")
VALUES
  ('admin'),
  ('member'),
  ('public');

INSERT INTO
  "section" ("name")
VALUES
  ('music'),
  ('book'),
  ('movie');

INSERT INTO
  "user" ("email", "password")
VALUES
  (
    'adrian@test.fr',
    '$2b$10$OmMUv/1irUSuGjrnXMaJf.eNWCNipfAx5FzRsj6jMjpn7XOa.C/YS'
  ),
  (
    'mathias@test.fr',
    '$2b$10$kgy2O1GVHTsm9LfC2N7yM.HNt/.HDkvymEYsaKMgyxDbdSs2AM.4q'
  ),
  (
    'stephane@test.fr',
    '$2b$10$zVlp/Q8reMWPlW5PosVT6OZpzcDYhvyT2LKjfewHnCHaPTOKuFuZS'
  );

INSERT INTO
  "role_permission_section" ("role_id", "permission_id", "section_id")
VALUES
  (1, 1, 1),
  (1, 2, 1),
  (1, 3, 1),
  (1, 4, 1),
  (1, 1, 2),
  (1, 2, 2),
  (1, 3, 2),
  (1, 4, 2),
  (1, 1, 3),
  (1, 2, 3),
  (1, 3, 3),
  (1, 4, 3),
  (2, 1, 1),
  (2, 2, 1),
  (2, 3, 1),
  (3, 2, 1),
  (3, 2, 2),
  (3, 2, 3);

INSERT INTO
  "user_role" ("user_id", "role_id")
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (2, 3);

COMMIT;