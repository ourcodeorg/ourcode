@echo on

echo DATABASE_URL="postgres://postgres:password@localhost:5432/ourcode?schema=public" > .\backend\.env
cd .\backend
start /b pnpm start:dev
cd ..
cd .\frontend
call pnpm dev 