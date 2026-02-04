# 🤖 AI & Engineering Handbook

> **SYSTEM INSTRUCTION FOR AI ASSISTANT**:
> Setiap kali Anda (AI) menghasilkan kode, melakukan refactoring, atau menjawab pertanyaan teknis untuk proyek ini, Anda **WAJIB** membaca dan mematuhi panduan dalam dokumen ini sebagai "Single Source of Truth".
>
> 1. **Analisis Konteks**: Periksa bagian "Project Identity" di bawah untuk mengetahui stack yang aktif.
> 2. **Patuhi Prinsip**: Terapkan "Universal Principles" pada setiap baris kode.
> 3. **Gunakan Stack Spesifik**: Abaikan bagian stack yang tidak relevan dengan proyek saat ini.
> 4. **Validasi**: Pastikan kode yang dihasilkan lolos kriteria "Code Quality" yang didefinisikan.

---

## 1. 🏗️ Project Identity (Active Configuration)

_Silakan sesuaikan bagian ini saat menyalin file ke proyek baru._

| Parameter      | Value (Current Project)       | Options / Notes                        |
| :------------- | :---------------------------- | :------------------------------------- |
| **Language**   | **TypeScript**                | `TypeScript`, `PHP 8.3+`               |
| **Inertia**    | **Laravel Starter Kit React** |                                        |
| **Styling**    | **Tailwind CSS v4**           | `Tailwind`, `CSS Modules`, `Bootstrap` |
| **Components** | **Shadcn/UI**                 | `Shadcn`, `Blade UI Kit`, `None`       |
| **State/Data** | **TanStack Query v5**         | `TanStack Query`, `Redux`, `Eloquent`, |
| **Reporting**  | **Please Reporting System**   | `language :indonesia`                  |

---

## 2. 💎 Universal Principles (All Projects)

Prinsip ini berlaku untuk **semua** bahasa pemrograman dan framework (Next.js, Laravel, Go, Astro).

### General Philosophy

1.  **KISS (Keep It Simple, Stupid)**: Solusi sederhana lebih baik daripada solusi cerdas yang rumit.
2.  **DRY (Don't Repeat Yourself)**: Ekstrak logika yang berulang ke dalam fungsi/helper/komponen.
3.  **YAGNI (You Aren't Gonna Need It)**: Jangan buat fitur "untuk jaga-jaga". Buat apa yang dibutuhkan sekarang.
4.  **Self-Documenting Code**: Nama variabel dan fungsi harus menjelaskan tujuannya. Komentar hanya untuk menjelaskan "MENGAPA", bukan "APA".

### Security First

- **Never Trust User Input**: Selalu validasi input di sisi server (Zod untuk TS, FormRequest untuk Laravel).
- **No Secrets in Code**: Jangan pernah hardcode API Key, Token, atau Password. Gunakan `.env`.
- **Authorization**: Selalu cek permission user sebelum melakukan aksi sensitif (Middleware/Policies).

### Git Conventions

Format pesan commit: `type(scope): description`

- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `refactor`: Perubahan kode tanpa mengubah fitur (bersih-bersih)
- `docs`: Perubahan dokumentasi
- `style`: Formatting (spasi, titik koma)

---

## 3. 🛠️ Stack-Specific Guidelines

_AI harus memilih panduan yang sesuai berdasarkan "Project Identity" di atas._

### 🟦 Next.js & React (Frontend/Fullstack)

_Berlaku jika Framework = Next.js / Astro / React_

1.  **App Router Structure**:
    - Gunakan `page.tsx` hanya untuk menerima data dan menyusun komponen.
    - Logika bisnis kompleks harus ada di `hooks/` atau `lib/`.
2.  **Server vs Client**:
    - Default ke **Server Component**.
    - Gunakan `"use client"` hanya jika butuh `useState`, `useEffect`, atau event handler (`onClick`).
3.  **Styling (Tailwind)**:
    - Gunakan helper `cn()` untuk conditional class.
    - Hindari string concatenation manual (`className={"btn " + variant}`).
4.  **Data Fetching**:
    - Gunakan **TanStack Query** untuk data klien.
    - Gunakan `fetch` atau ORM langsung di Server Component.

### 🟥 Laravel (Backend/Monolith)

_Berlaku jika Framework = Laravel_

1.  **Architecture**:
    - **Fat Models, Skinny Controllers**: Pindahkan logika query ke Scope atau Service Class.
    - Gunakan **Service Pattern** untuk logika bisnis yang kompleks (lebih dari sekadar CRUD).
2.  **Type Hinting**:
    - Selalu gunakan Return Type Declarations (`: string`, `: void`, `: View`).
3.  **Eloquent**:
    - Hindari N+1 query. Selalu gunakan `with()` untuk eager loading relasi.
    - Gunakan `FormRequest` untuk validasi, jangan validasi di Controller.

## 4. 📝 Development Workflow

### Standard Commands

Sesuaikan dengan `package.json` atau `Makefile` proyek:

- **Dev**: `npm run dev` / `php artisan serve` / `go run cmd/main.go`
- **Build**: `npm run build` / `go build -o bin/app`
- **Lint/Format**: `npm run lint` / `pint` / `golangci-lint run`

### Definition of Done (DoD)

Sebuah fitur dianggap selesai jika:

1.  [ ] Kode berjalan sesuai spesifikasi.
2.  [ ] Tidak ada error linting/formatting.
3.  [ ] Tidak ada `console.log` atau kode debug yang tertinggal.
4.  [ ] Responsif di mobile (untuk UI).
5.  [ ] Telah divalidasi dengan input data yang beragam (happy path & edge cases).
