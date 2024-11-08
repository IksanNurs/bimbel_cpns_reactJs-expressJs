# Sistem Bimbel CPNS Berbasis Web dengan React JS & Express JS

Sistem Bimbel CPNS adalah aplikasi berbasis web yang menyediakan layanan untuk pendaftaran dan manajemen bimbel CPNS secara online. Aplikasi ini dibangun dengan **React JS** di frontend dan **Express JS** di backend. Sistem ini menggunakan autentikasi berbasis **JWT** dan **RBAC (Role-Based Access Control)** untuk pengelolaan pengguna dan transaksi yang aman.

## Table of Contents

1. [Overview](#overview)
2. [Spesifikasi & Third-Party Libraries](#spesifikasi--third-party-libraries)
   - [Frontend](#frontend)
   - [Backend](#backend)
3. [Fitur Aplikasi](#fitur-aplikasi)
4. [Instalasi dan Setup](#instalasi-dan-setup)
   - [Frontend](#frontend-setup)
   - [Backend](#backend-setup)
5. [Router Backend](#router-backend)
6. [Link Postman Collection](#link-postman-collection)
7. [Pengujian dan Troubleshooting](#pengujian-dan-troubleshooting)

## Overview

Sistem Bimbel CPNS ini bertujuan untuk menyediakan platform bagi calon peserta CPNS untuk mencari paket bimbel yang sesuai dengan kebutuhan mereka, mendaftar untuk paket bimbel, serta melakukan pembayaran melalui **Midtrans** untuk memastikan transaksi yang aman dan terverifikasi.

Aplikasi ini dibangun menggunakan **React JS** di frontend dan **Express JS** di backend dengan sistem autentikasi berbasis **JWT** untuk melindungi rute-rute yang memerlukan otorisasi.

## Spesifikasi & Third-Party Libraries

### Frontend

- **React JS**: Framework JavaScript untuk membangun antarmuka pengguna yang interaktif.
- **Metronic 8**: Template UI premium yang digunakan untuk desain antarmuka pengguna (UI).
- **PWA (Progressive Web App)**: Aplikasi dapat diakses secara offline dan berfungsi seperti aplikasi native.
- **Axios**: Library untuk melakukan HTTP request ke backend API.

### Backend

- **Express JS**: Framework web untuk Node.js yang digunakan untuk membangun API backend.
- **JWT (JSON Web Token)**: Sistem autentikasi untuk mengamankan endpoint dan memastikan hanya pengguna yang sah yang dapat mengaksesnya.
- **RBAC (Role-Based Access Control)**: Pengelolaan hak akses pengguna berdasarkan peran (roles).
- **Nodemon**: Alat pengembangan untuk Node.js yang secara otomatis me-restart server saat file diubah.
- **Sequelize**: ORM untuk mengelola interaksi dengan database SQL (misalnya MySQL atau PostgreSQL).
- **CORS**: Middleware untuk mengizinkan permintaan lintas sumber (cross-origin requests).
- **Bcrypt**: Library untuk mengenkripsi password pengguna.

## Fitur Aplikasi

- **Autentikasi Pengguna (Login & Register)**: Pengguna dapat membuat akun dan melakukan login menggunakan JWT untuk akses aman.
- **Cari Paket**: Pengguna dapat mencari paket bimbel yang tersedia.
- **Paket Saya**: Menampilkan daftar paket bimbel yang telah dibeli oleh pengguna.
- **Pembayaran Midtrans**: Pembayaran menggunakan **Midtrans** dengan **Signature Key** yang aman.
- **Notifikasi Pembayaran**: Menangani status pembayaran dari Midtrans (success, error, cancel, unfinish).
- **CRUD**: Manajemen data untuk pengguna, produk, dan transaksi (order) di backend.

## Instalasi dan Setup

### Frontend Setup

1. **Clone repository**:

   ```bash
   git clone [URL FE]
   cd [nama-folder-fe]
Ganti nama file .env.example menjadi .env dan isi credential Anda

Install dependencies

bash
Copy code
npm install
Jalankan aplikasi frontend

bash
Copy code
npm run start
Frontend akan berjalan pada http://localhost:3000.

Backend Setup
Clone repository backend

bash
Copy code
git clone [URL BE]
cd [nama-folder-be]
Ganti nama file .env.example menjadi .env dan isi credential Anda

Install dependencies

bash
Copy code
npm install
Jalankan aplikasi backend

bash
Copy code
npm start
Backend akan berjalan pada http://localhost:5000.

Router Backend
API backend menyediakan beberapa route utama yang dikelompokkan sebagai berikut:

Users: Menyediakan fitur CRUD untuk pengguna.

POST /api/users/register
POST /api/users/login
GET /api/users/profile
PUT /api/users/update
Product: Menyediakan fitur CRUD untuk produk (paket bimbel).

GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
Orders: Menyediakan fitur CRUD untuk transaksi pembelian produk.

POST /api/orders
GET /api/orders
GET /api/orders/:id
Midtrans: Menangani notifikasi status pembayaran dari Midtrans.

POST /api/midtrans/notification
POST /api/midtrans/finish
POST /api/midtrans/unfinish
POST /api/midtrans/cancel
GET /api/midtrans/status/:order_id
Link Postman Collection
Untuk dokumentasi API dan contoh penggunaan rute-rute yang tersedia, Anda dapat mengunduh Postman Collection melalui link berikut. File postman-collection.js dapat ditemukan di folder root.

Pengujian dan Troubleshooting
Untuk pengujian, kami menggunakan Mocha dan Chai. Jalankan perintah berikut untuk menguji aplikasi:

bash
Copy code
npm test
Jika mengalami masalah, pastikan Anda telah mengonfigurasi file .env dengan benar dan semua dependensi sudah terinstal.

Cek dokumentasi atau buka isu di repository GitHub jika ada masalah yang tidak dapat diselesaikan.

```
