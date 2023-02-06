DEV_COMPOSE=docker-compose.dev.yml
c=

all: env

env:
	cp ./.env.example ./.env
	echo DATABASE_URL=\"postgres://postgres:password@localhost:5432/ourcode?schema=public\" > ./backend/.env
	docker compose up -d ourcode-db
	cd ./backend && pnpm install
	cd ./backend && npx prisma migrate dev
	rm ./backend/.env
	docker compose stop ourcode-db

down:
	docker compose down

logs:
	docker compose logs $(c)