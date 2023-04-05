.PHONY: frontend backend
DEV_COMPOSE=docker-compose.dev.yml
c=

all: env

env:
	cp ./.env.example ./.env
	echo DATABASE_URL=\"postgres://postgres:password@localhost:5432/ourcode?schema=public\" > ./backend/.env
	docker compose up -d ourcode-db
	cd ./backend && pnpm install
	cd ./frontend && pnpm install
	cd ./backend && npx prisma migrate dev
	rm ./backend/.env
	docker compose stop ourcode-db

down:
	docker compose down

clean:
	docker compose down -v

logs:
	docker compose logs -f $(c)

backend:
	cp ./.env.example ./.env
	docker compose -f $(DEV_COMPOSE) build
	docker compose -f $(DEV_COMPOSE) up -d $(c)

frontend:
	cd ./frontend && pnpm dev

dev:
	make backend
	make frontend

reload:
	make stop
	make dev

stop:
	docker-compose stop $(c)

prod:
	make
	docker compose build
	docker compose up -d
	cd ./frontend && pnpm build && pnpm start