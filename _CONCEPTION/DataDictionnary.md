Section:

id_Section: Clé primaire auto-incrémentée (number).
name: Nom de la section (string).
id_Role_Permission_Section: Clé étrangère faisant référence à l'entité Role_Permission_Section (number).

Role_Permission_Section: (TABLE PIVOT)

id_Role: Clé primaire auto-incrémentée (number).
id_Role: Clé étrangère faisant référence à l'entité Role (number).
id_Permission: Clé étrangère faisant référence à l'entité Permission (number).
id_Section: Clé étrangère faisant référence à l'entité Section (number).

Permission:

id_Permission: Clé primaire auto-incrémentée (number).
name: Nom de la permission (string).
id_Role_Permission_Section: Clé étrangère faisant référence à l'entité Role_Permission_Section (number).

Role:

id_Role: Clé primaire auto-incrémentée (number).
name: Nom du rôle (string).
id_Role_Permission_Section: Clé étrangère faisant référence à l'entité Role_Permission_Section (number).

User_Role: (TABLE PIVOT)

id_User_Role: Clé primaire auto-incrémentée (number).
id_Role: Clé étrangère faisant référence à l'entité Role (number).
id_User: Clé étrangère faisant référence à l'entité User (number).

User:

id_User: Clé primaire auto-incrémentée (number).
name: Nom de l'utilisateur (string).
description: Description de l'utilisateur (string).

Book:

id_Book: Clé primaire auto-incrémentée (number).
name: Nom du livre (string).
author: Nom de l'auteur du livre (string).

Music:

id_Music: Clé primaire auto-incrémentée (number).
title: Titre de la musique (string).
compositor: Nom du compositeur de la musique (string).

Movie:

id_Movie: Clé primaire auto-incrémentée (number).
title: Titre du film (string).
director: Nom du réalisateur du film (string).