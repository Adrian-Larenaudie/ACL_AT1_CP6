# ACL et JWT

## Installation

1. créer un nouvelle db 'acl'

```bash
psql -U postgres
```

```sql
CREATE DATABASE "acl";
```

2. remplir la base de données

```bash
npm run resetDB
```

3. installer les dépendances

```bash
npm install
```

4. Fichier .env

renommer le fichier `.env.example` en `.env`et ajuster si besoin les variables d'environement

5. Lancer le serveur

```bash
npm run dev
```

## JWT

### structure d'un JWT

un JWT est constitué de 3 parties distinctes

1. le header qui contient les informations sur l'encodage utilisé
2. la charge utile, ie, les données que vous avez stockées dans le token
3. la signature qui permet de vérifier que le token est valide, ie, que c'est bien notre serveur qui l'a créé et que les données qu'il contient n'ont pas été modifié

Les données contenues dans un token ne sont pas sécurisées, il ne faut donc pas y stocker de données sensible dedans.
