# Panduan Deployment MTS Offshore (Next.js) ke Hostinger VPS KVM 2

Dokumen ini berisi panduan praktis step-by-step untuk mendeploy website **MTS Offshore** berbasis **Next.js 15 (App Router)** ke **Hostinger VPS KVM 2** (Ubuntu 22.04 / 24.04 LTS).

---

## Spesifikasi VPS Anda (Hostinger KVM 2)
- **CPU**: 2 vCPU
- **RAM**: 8 GB
- **Penyimpanan**: NVMe Disk
- **OS**: Ubuntu 22.04 / 24.04 LTS
- **Kapasitas**: Sangat lebih dari cukup untuk menjalankan Next.js dengan PM2 Cluster Mode (mampu menangani puluhan ribu pengunjung bersamaan tanpa kendala).

---

## 1. Persiapan Awal di VPS (SSH & Package)

1. Login via SSH dari terminal komputer Anda:
```bash
ssh root@<IP_VPS_ANDA>
```

2. Update sistem dan instal paket pendukung:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx ufw rsync
```

3. Instal **Node.js 20 LTS** & **PM2**:
```bash
# Pasang NodeSource repository untuk Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verifikasi versi Node & NPM
node -v   # v20.x.x
npm -v

# Pasang PM2 (Process Manager) secara global
sudo npm install -g pm2
```

4. Aktifkan firewall UFW:
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 2. Hubungkan Domain ke VPS

1. Buka DNS Management domain Anda di Hostinger / Cloudflare / registrar domain Anda.
2. Tambahkan **A Record**:
   - Host: `@` ➔ Points to: `<IP_VPS_ANDA>`
   - Host: `www` ➔ Points to: `<IP_VPS_ANDA>`
3. Tunggu propagasi DNS (biasanya 5–15 menit).

---

## 3. Siapkan Direktori & Kode Aplikasi di VPS

1. Buat direktori project di VPS:
```bash
sudo mkdir -p /var/www/mtsoffshore
sudo chown -R $USER:$USER /var/www/mtsoffshore
```

2. Pilihan transfer kode ke VPS:

### Opsi A: Menggunakan Git (Paling Direkomendasikan)
Jika project Anda sudah di-push ke GitHub / GitLab:
```bash
cd /var/www
git clone <URL_REPO_ANDA> mtsoffshore
cd mtsoffshore
npm install --production=false
npm run build
```

### Opsi B: Transfer Langsung dari Komputer Lokal (Powershell)
Dari folder project di laptop Anda (`d:\Portofolio\Website\tnmoffshore`):
```powershell
# Jalankan build terlebih dahulu di lokal
npm run build

# Salin source code & build ke VPS
rsync -avz --exclude 'node_modules' --exclude '.git' ./ root@<IP_VPS_ANDA>:/var/www/mtsoffshore/
```
Kemudian di terminal VPS:
```bash
cd /var/www/mtsoffshore
npm install --omit=dev
```

---

## 4. Jalankan Next.js Menggunakan PM2

File konfigurasi PM2 sudah kami sediakan di `deploy/ecosystem.config.js`.

1. Jalankan aplikasi menggunakan file konfigurasi tersebut di VPS:
```bash
cd /var/www/mtsoffshore
pm2 start deploy/ecosystem.config.js
```

2. Simpan proses agar otomatis berjalan saat VPS restart:
```bash
pm2 save
pm2 startup
# (Salin dan jalankan perintah yang dicetak oleh pm2 startup jika ada)
```

3. Periksa status aplikasi:
```bash
pm2 status
pm2 logs mtsoffshore
```
Aplikasi Next.js sekarang berjalan di latar belakang pada port `3000`.

---

## 5. Konfigurasi Nginx Reverse Proxy

Konfigurasi Nginx lengkap sudah tersedia di `deploy/nginx-nextjs.conf`.

1. Salin konfigurasi ke Nginx:
```bash
sudo cp /var/www/mtsoffshore/deploy/nginx-nextjs.conf /etc/nginx/sites-available/mtsoffshore
```
*(Atau buat manual via `sudo nano /etc/nginx/sites-available/mtsoffshore` lalu paste isinya)*.

2. Ganti `mtsoffshore.com` dengan nama domain asli Anda jika berbeda.

3. Aktifkan situs dan reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/mtsoffshore /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Uji konfigurasi
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 6. Pasang SSL Gratis (HTTPS) dengan Let's Encrypt

Jalankan perintah Certbot:
```bash
sudo certbot --nginx -d mtsoffshore.com -d www.mtsoffshore.com
```
Certbot akan otomatis mendeteksi konfigurasi Nginx, mengunduh sertifikat SSL gratis, dan mengonfigurasi auto-renewal.

---

## 7. Pemeliharaan & Update Rutin

Ketika ada pembaruan kode di kemudian hari:
```bash
cd /var/www/mtsoffshore
git pull origin main
npm install
npm run build
pm2 reload mtsoffshore
```
Reload dengan PM2 berjalan tanpa downtime (*zero-downtime reload*).
