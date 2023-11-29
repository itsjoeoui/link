CREATE TABLE IF NOT EXISTS "link" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "destination" varchar NOT NULL,
  "alias" varchar NOT NULL UNIQUE,
  "ownerId" varchar NOT NULL,
  "name" varchar NOT NULL,
  "visitCount" int DEFAULT 1
);
