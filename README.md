# lestarin-be

Backend API untuk aplikasi pelaporan dan katalog tanaman endemik Indonesia.

## Fitur Utama

- Manajemen data tanaman endemik (CRUD)
- Pelaporan penemuan tanaman (sightings)
- Autentikasi pengguna (register, login, profile)
- Filter dan pencarian tanaman berdasarkan region, nama, dan status konservasi
- Seeder data tanaman endemik Indonesia
- API untuk dropdown dan filter region

## Teknologi

- Node.js + Express
- Prisma ORM (PostgreSQL)
- JWT untuk autentikasi
- Multer untuk upload gambar
- Husky, ESLint, Prettier untuk pengembangan

## Instalasi

1. Clone repo:
   ```
   git clone https://github.com/adibnajwan/lestarin-be.git
   cd lestarin-be
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Copy file `.env.example` ke `.env` dan sesuaikan konfigurasi database.
4. Setup database:
   ```
   npm run db:deploy
   npm run db:seed
   ```
5. Jalankan server:
   ```
   npm run dev
   ```

## Struktur Folder

- `src/controllers/` — Logic API (auth, plants, sightings)
- `src/models/` — Model Prisma
- `prisma/schema.prisma` — Definisi skema database
- `prisma/seeds/seed.js` — Seeder data tanaman
- `src/app.js` — Entry point aplikasi

## API Endpoints

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/plants` — List & search tanaman
- `GET /api/plants/region/:region` — List tanaman berdasarkan region
- `GET /api/plants/:id` — Detail tanaman
- `POST /api/plants` — Tambah tanaman (admin)
- `GET /api/regions` — List region unik

## Scripts

- `npm run dev` — Jalankan server development
- `npm run db:deploy` — Deploy migrasi database
- `npm run db:seed` — Isi data tanaman
- `npm run lint` — Cek kode dengan ESLint
- `npm run format` — Format kode dengan Prettier

## Kontribusi

1. Fork repo
2. Buat branch fitur
3. Pull request ke main

## Lisensi

MIT
