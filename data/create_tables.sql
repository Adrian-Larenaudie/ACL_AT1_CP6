BEGIN;
DROP VIEW IF EXISTS "user_with_roles";
DROP FUNCTION IF EXISTS "get_permissions";
DROP TABLE IF EXISTS "user",
"role",
"permission",
"section",
"book",
"movie",
"music",
"user_role",
"role_permission_section";
CREATE TABLE "user" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "refresh_token" TEXT
);
CREATE TABLE "role" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL UNIQUE
);
CREATE TABLE "permission" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL UNIQUE
);
CREATE TABLE "section" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE
);
CREATE TABLE "book" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "author" TEXT NOT NULL
);
CREATE TABLE "movie" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "director" TEXT NOT NULL
);
CREATE TABLE "music" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" TEXT NOT NULL UNIQUE,
  "compositor" TEXT NOT NULL
);
CREATE TABLE "user_role" (
  "user_id" INTEGER REFERENCES "user"("id"),
  "role_id" INTEGER REFERENCES "role"("id"),
  PRIMARY KEY ("user_id", "role_id")
);
CREATE TABLE "role_permission_section" (
  "role_id" INTEGER REFERENCES "role"("id"),
  "permission_id" INTEGER REFERENCES "permission"("id"),
  "section_id" INTEGER REFERENCES "section"("id"),
  PRIMARY KEY ("role_id", "permission_id", "section_id")
);
CREATE VIEW "user_with_roles" AS
SELECT
  "user"."id",
  "user"."email",
  "user"."password",
  "user"."refresh_token",
  array_agg(role.label) AS "roles"
FROM
  "user"
  JOIN "user_role" ON (("user".id = "user_role"."user_id"))
  JOIN role ON ((role.id = "user_role"."role_id"))
GROUP BY
  "user"."id";
CREATE FUNCTION "get_permissions"(p_roles json)
  RETURNS TABLE (action text, section text)
AS $BODY$
BEGIN
  RETURN QUERY
    SELECT DISTINCT "permission"."label" AS "action", "section"."name" AS "section"
    FROM "role_permission_section"
    JOIN "permission" ON "permission"."id" = "role_permission_section"."permission_id"
    JOIN "section" ON "section"."id" = "role_permission_section"."section_id"
    WHERE "role_permission_section"."role_id" IN (
      SELECT "id" FROM "role"
      WHERE "role"."label" = ANY(SELECT json_array_elements_text(p_roles))
    );
END;
$BODY$ LANGUAGE plpgsql;

COMMIT;