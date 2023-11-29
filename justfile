set dotenv-load := true
set dotenv-path := '.env.local'

migrateup:
  migrate -database ${POSTGRES_URL}?sslmode=verify-full -path migrations up

migratedown:
  migrate -database ${POSTGRES_URL}?sslmode=verify-full -path migrations down
