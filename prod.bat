@echo on

call .\setup.bat
docker compose build
docker compose up -d
cd .\frontend
call pnpm build
call pnpm start