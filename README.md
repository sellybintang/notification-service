# Notification Service

## Deskripsi
Tugas ini bertujuan untuk mengembangkan layanan notifikasi dalam aplikasi kami. Layanan ini akan bertanggung jawab untuk mengelola dan mengirimkan berbagai jenis notifikasi kepada pengguna kami.

## Tugas-tugas Utama
- Membuat endpoint API untuk menyimpan notifikasi baru.
- Membuat endpoint API untuk mengambil daftar notifikasi pengguna.
- Memilih dan mengimplementasikan antrian pesan (message queue) untuk mengelola pengiriman notifikasi secara asinkron.
- Mengirim notifikasi dari antrian pesan ke pengguna sesuai preferensi mereka (email, pemberitahuan, dll.).
- Implementasi penjadwalan notifikasi pada waktu tertentu.
- Dokumentasi yang jelas tentang bagaimana layanan notifikasi berfungsi dan cara menggunakannya.

## Panduan Penggunaan
1. **Membuat Notifikasi Baru:** Menggunakan endpoint API `/notifications`, kirimkan data notifikasi dalam format JSON untuk menyimpan notifikasi baru.
```json
POST /notifications
Content-Type: application/json
{
"user_id": "user123",
"message": "Pesan notifikasi Anda disini."
}
```
2. **Mengambil Daftar Notifikasi:** Menggunakan endpoint API `/notifications/user/:user_id`, ambil daftar notifikasi pengguna tertentu.
```json
GET /notifications/user/user123
```
3. **Pengiriman Notifikasi:** Notifikasi akan diambil dari antrian pesan dan dikirim ke pengguna sesuai preferensi mereka.

4. **Penjadwalan Notifikasi:** Notifikasi yang dijadwalkan akan ditempatkan di antrian pesan sesuai dengan waktu yang diatur.

## Teknologi Wajib Yang Digunakan
- MongoDB
- Message Queue (contoh: RabbitMQ)