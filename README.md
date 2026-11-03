# Glimmora

Glimmora adalah aplikasi manajemen konten untuk membantu tim mengelola channel, merencanakan konten, memantau pipeline produksi, dan mencatat metrik performa. Aplikasi ini memiliki frontend dan backend terpisah.

> Catatan: repository ini memiliki dua aplikasi, yaitu `FE` (frontend) dan `BE` (backend). Jalankan instalasi dan perintah development dari folder masing-masing.

## Daftar Isi

- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Struktur Repository](#struktur-repository)
- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Database dan Prisma](#database-dan-prisma)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Modul Backend](#modul-backend)
- [Role Pengguna](#role-pengguna)
- [Catatan Pengembangan](#catatan-pengembangan)

## Fitur

Fitur yang tersedia di repository ini mencakup:

- **Autentikasi**: registrasi dan login pengguna.
- **Role pengguna**: pemisahan akses untuk `admin`, `editor`, dan `creator` sesuai implementasi route dan frontend.
- **Manajemen channel**: melihat, membuat, dan menghapus channel.
- **Manajemen content**: membuat, melihat, memperbarui, menghapus, memfilter, dan mengubah status konten.
- **Content checklist / task**: menambahkan task dan memperbarui status penyelesaiannya.
- **Pipeline content**: pengelolaan alur dan status produksi konten.
- **Metric**: pencatatan dan penghapusan metrik konten.
- **User management**: melihat daftar pengguna dan menghapus pengguna melalui area admin.
- **Tema antarmuka**: frontend memiliki styling tema yang dikelola di sisi aplikasi.

Ketersediaan aksi pada setiap fitur mengikuti role dan aturan otorisasi backend.

## Teknologi

### Frontend (`FE`)

- React
- Vite
- JavaScript / JSX
- React Router
- Tailwind CSS
- Komponen UI bergaya shadcn/ui
- Axios untuk komunikasi API
- Lucide React untuk ikon

### Backend (`BE`)

- Node.js
- TypeScript
- Express
- Prisma ORM
- Database yang dikonfigurasi melalui Prisma
- Zod untuk validasi request
- JWT untuk autentikasi
- Pino untuk logging

## Struktur Repository

```text
.
├── BE/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── core/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── channel/
│   │   │   ├── content/
│   │   │   ├── metric/
│   │   │   ├── shared/
│   │   │   ├── task/
│   │   │   └── user/
│   │   ├── routes/
│   │   └── app.ts
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── FE/
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── src/
│   │   ├── adminPages/
│   │   ├── creatorPages/
│   │   ├── editorPages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── Dialog/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Persyaratan

Pastikan perangkat sudah memiliki:

- Node.js dan npm
- Database yang didukung oleh konfigurasi Prisma project
- Git (jika melakukan clone repository)

## Instalasi

### 1. Clone repository

```bash
git clone <URL_REPOSITORY>
cd <NAMA_FOLDER_REPOSITORY>
```

### 2. Install backend

```bash
cd BE
npm install
```

### 3. Install frontend

Buka terminal baru dari root repository:

```bash
cd FE
npm install
```

## Konfigurasi Environment

Backend memerlukan file environment untuk konfigurasi server, koneksi database, autentikasi, dan integrasi frontend.

1. Buat atau gunakan file `.env` di folder `BE`.
2. Isi nilainya sesuai konfigurasi lokal dan kebutuhan project.
3. Pastikan nama variabel environment yang digunakan sama dengan yang dibaca oleh kode backend dan `schema.prisma`.
4. Jangan commit file `.env` atau secret ke repository.

Contoh kategori konfigurasi yang perlu diperiksa:

- URL koneksi database (`DATABASE_URL` atau nama variabel yang digunakan Prisma).
- Port server.
- Secret dan masa berlaku token autentikasi, jika dikonfigurasi melalui environment.
- Origin frontend untuk konfigurasi CORS, jika digunakan.

Untuk frontend, periksa konfigurasi Axios pada `FE/src/services/api.js`. Atur base URL API sesuai alamat backend lokal. Jangan menaruh secret backend di frontend karena nilai frontend dapat diakses oleh browser.

## Database dan Prisma

Semua schema database berada di:

```text
BE/prisma/schema.prisma
```

Migration berada di:

```text
BE/prisma/migrations/
```

Setelah environment database dikonfigurasi, jalankan perintah Prisma dari folder `BE`:

```bash
npx prisma generate
npx prisma migrate dev
```

Jika ingin mengisi data awal, periksa konfigurasi seed pada `BE/prisma/seed.ts` dan script seed di `BE/package.json`, kemudian jalankan script yang disediakan project.

Untuk membuka Prisma Studio:

```bash
npx prisma studio
```

> Jalankan migration hanya pada database development yang benar. Untuk database bersama atau production, tinjau migration terlebih dahulu dan gunakan prosedur deployment migration yang sesuai.

## Menjalankan Aplikasi

Frontend dan backend dijalankan pada terminal terpisah.

### Backend

```bash
cd BE
npm run dev
```

### Frontend

```bash
cd FE
npm run dev
```

Jika nama script pada `package.json` berbeda, gunakan script yang tersedia. Daftar script dapat dilihat dengan:

```bash
npm run
```

Setelah kedua server berjalan, buka alamat frontend yang ditampilkan oleh Vite di terminal. Pastikan base URL Axios frontend mengarah ke backend yang sedang berjalan.

## Modul Backend

Backend dikelompokkan berdasarkan domain fitur:

| Modul | Tanggung jawab |
|---|---|
| `auth` | Registrasi dan login |
| `user` | Daftar dan pengelolaan pengguna |
| `channel` | Pengelolaan channel |
| `content` | CRUD konten, filter, status, dan relasi channel |
| `task` | Checklist konten |
| `metric` | Pencatatan metrik |
| `shared` | Middleware, exception, dan service bersama |

Route API didefinisikan terpisah di `BE/src/routes/`:

- `authRouter.ts`
- `userRouter.ts`
- `channelRouter.ts`
- `contentRouter.ts`
- `taskRouter.ts`
- `metricRouter.ts`

Prefix API dan detail endpoint mengikuti konfigurasi router di `BE/src/app.ts` serta masing-masing file route. Periksa file tersebut untuk daftar endpoint dan middleware terbaru.

## Role Pengguna

Aplikasi menggunakan pembagian role untuk mengatur akses halaman dan operasi:

- **Admin**: pengelolaan pengguna dan area administrasi.
- **Editor**: pengelolaan konten sesuai izin yang diberikan.
- **Creator**: pengelolaan channel dan konten sesuai izin yang diberikan.

Aturan akses yang sebenarnya ditentukan oleh middleware dan use case backend. Jangan hanya mengandalkan pembatasan tampilan di frontend sebagai mekanisme keamanan.

## Catatan Pengembangan

- Gunakan service frontend di `FE/src/services/` untuk komunikasi API agar pemanggilan endpoint tidak tersebar di banyak komponen.
- Gunakan instance Axios yang sudah disediakan di `FE/src/services/api.js`.
- Validasi request dan otorisasi harus tetap dilakukan di backend.
- Setelah mengubah schema Prisma, buat migration yang sesuai dan generate ulang Prisma Client.
- Jangan mengunggah `.env`, token, password, atau credential ke Git.
- Periksa `package.json` pada folder `FE` dan `BE` untuk mengetahui script yang tersedia.

## Kontribusi

1. Buat branch untuk perubahan yang dikerjakan.
2. Kerjakan perubahan sesuai modul terkait.
3. Jalankan aplikasi dan lakukan pengujian pada fitur yang terdampak.
4. Pastikan tidak ada secret atau file hasil build yang ikut di-commit.
5. Buat pull request dengan ringkasan perubahan yang jelas.
