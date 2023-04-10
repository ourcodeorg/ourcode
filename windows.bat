@echo off

copy .\.env.example .\.env
echo DATABASE_URL="postgres://postgres:password@localhost:5432/ourcode?schema=public" > .\backend\.env
docker-compose up -d ourcode-db
cd .\backend
pnpm install
cd ..\frontend
pnpm install
cd ..\backend
npx prisma migrate dev
del .\backend\.env
docker-compose stop ourcode-db
cd ..