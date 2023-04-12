@echo on

copy .\.env.example .\.env
echo DATABASE_URL="postgres://postgres:password@localhost:5432/ourcode?schema=public" > .\backend\.env
docker-compose up -d ourcode-db
cd .\backend
call pnpm install
cd ..\frontend
call pnpm install
cd ..\backend
call npx prisma migrate dev
del .env
cd ..
docker-compose stop ourcode-db