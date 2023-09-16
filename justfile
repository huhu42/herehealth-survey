setup-dep:
	yarn install

setup-db:
	[ -x "$(command -v docker)" ] || (echo "Docker is not installed, please install it" && exit 1)
	supabase login

# first time local development setup
setup: setup-dep setup-db

db-start:
	yarn supabase start

db-stop:
	yarn supabase stop --backup

# update migrations and remote db specified in .env.POSTGRES_URL
# from prisma.schema definition
db-migrate:
    prisma migrate dev

# drop data and re-seed the database from seed.ts
db-reset-hard:
   prisma migrate reset

start:
	yarn dev

stop:
    db-stop

generate-prisma:
    prisma generate