# Billing ISP & RADIUS Manager

Sistem Billing ISP berskala produksi yang dibangun menggunakan Next.js 15, Prisma ORM, PostgreSQL, Redis, dan terintegrasi langsung dengan FreeRADIUS serta RouterOS MikroTik.

Sistem ini didesain agar sangat mudah untuk di-deploy baik di lingkungan server produksi (VPS, VM, Proxmox LXC) maupun untuk pengembangan lokal.

## 🌟 Fitur Utama
- **Manajemen Pelanggan & Paket:** Mengatur data pelanggan dan paket internet (bandwidth) dengan efisien.
- **Sinkronisasi FreeRADIUS:** Akun langsung tersinkronisasi ke tabel standar FreeRADIUS (`radcheck`, `radreply`) dan terhubung ke NAS MikroTik.
- **Billing Engine:** Pembuatan tagihan (*invoice*) bulanan secara otomatis menggunakan *scheduler* di latar belakang.
- **Dashboard UI Premium:** Menggunakan arsitektur `shadcn/ui` dan Tailwind CSS untuk tampilan yang elegan dan responsif.
- **One-Click Deployment:** Disertai script auto-install Docker untuk deployment yang praktis.

---

## 🚀 Cara Instalasi di VPS / VM / LXC

Aplikasi ini sudah dipaketkan sepenuhnya menggunakan **Docker Compose** sehingga proses deployment sangat mudah dan bersih (tanpa mengotori OS host). Cara ini sangat disarankan untuk instalasi pada **VPS Cloud (DigitalOcean, AWS, dll)**, **Virtual Machine (VMware/VirtualBox)**, maupun **LXC Container di Proxmox**.

### Prasyarat Server
- **Sistem Operasi**: Ubuntu 20.04 / 22.04 / 24.04 atau Debian 11/12
- **Hardware**: Minimal RAM 2GB (Disarankan 4GB) & CPU 2 Core
- **Akses**: Login sebagai `root` atau *user* dengan akses `sudo`

### Langkah-Langkah Instalasi

1. **Masuk ke server via SSH:**
   ```bash
   ssh root@<IP_SERVER_ANDA>
   ```

2. **Clone *source code* ini ke server:**
   ```bash
   git clone https://github.com/sendycrys/Billing_Radius_New.git
   cd Billing_Radius_New
   ```

3. **Jalankan *Auto-Install Script*:**
   ```bash
   sudo bash install.sh
   ```
   *Script ini akan secara otomatis:*
   - Mengupdate paket OS
   - Mendownload dan menginstal Docker & Docker Compose
   - Membuat file konfigurasi `.env`
   - Membangun (*build*) Image Next.js
   - Menjalankan kontainer Database (PostgreSQL), Cache (Redis), dan Web Server (Next.js)
   - Mengeksekusi migrasi tabel database (Prisma).

4. **Selesai!** Anda dapat mengakses aplikasi Billing ISP melalui browser di:
   ```text
   http://<IP_SERVER_ANDA>:3000
   ```

---

## 🛠️ Pengembangan Lokal (Local Development Windows/Mac)

Jika Anda ingin mengedit atau memodifikasi *source code* ini di komputer lokal Anda:

1. **Pastikan sudah terinstal**:
   - [Node.js](https://nodejs.org) (v18+)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop) (untuk menjalankan database lokal tanpa instalasi manual)

2. **Install Dependensi NPM**:
   ```bash
   npm install
   ```

3. **Jalankan Database PostgreSQL dan Redis**:
   ```bash
   docker compose up -d postgres redis
   ```
   *(Perintah ini hanya menyalakan database dan redis saja tanpa aplikasi Next.js)*

4. **Konfigurasi Environment dan Database**:
   ```bash
   cp .env.example .env
   # Buka file .env dan hapus comment (#) pada baris 'Prisma Local DB URL'
   # Pastikan DATABASE_URL mengarah ke localhost, bukan 'postgres' (nama kontainer)
   
   npx prisma migrate dev --name init
   ```

5. **Jalankan Aplikasi Mode Development**:
   ```bash
   npm run dev
   ```
   Akses `http://localhost:3000` di browser.
