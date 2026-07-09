#!/bin/bash

echo "======================================"
echo "  Auto Install Billing ISP RADIUS     "
echo "======================================"

# Pastikan script dijalankan sebagai root
if [ "$EUID" -ne 0 ]; then
  echo "Harap jalankan script ini sebagai root (Gunakan sudo)"
  exit
fi

echo "1. Memperbarui sistem..."
apt update && apt upgrade -y

# Instal Docker & Docker Compose jika belum ada
if ! command -v docker &> /dev/null; then
    echo "2. Menginstal Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
else
    echo "2. Docker sudah terinstal."
fi

# Copy file .env
if [ ! -f .env ]; then
    echo "3. Membuat file .env dari .env.example..."
    cp .env.example .env
else
    echo "3. File .env sudah ada."
fi

echo "4. Membangun dan menjalankan layanan (Next.js, PostgreSQL, Redis)..."
docker compose up -d --build

echo "5. Menunggu database PostgreSQL siap..."
sleep 10

echo "6. Menjalankan migrasi database..."
docker compose exec -T app npx prisma migrate deploy

echo "======================================"
echo "Instalasi Selesai!"
echo "Aplikasi dapat diakses di http://<IP-VPS>:3000"
echo "======================================"
