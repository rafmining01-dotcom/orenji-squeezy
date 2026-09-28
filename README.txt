# Orenji Squeezy — Website Final

Website ini dibuat berdasarkan data Orenji yang diberikan:
- Nama: Orenji Squeezy
- Slogan: Sekali Coba Langsung Suka
- Warna utama: orange, kuning, hijau
- Jam: 11.00–21.00 WIB
- Pesan: Instagram Orenji
- Lokasi: Google Maps Orenji
- Menu/harga: mengikuti foto menu yang diberikan

## File
- index.html
- style.css
- script.js
- assets/logo.jpeg
- assets/product.jpeg
- assets/menu.jpeg

## Fitur
- Tampilan responsive HP/laptop
- Menu dan harga S/L
- Harga tanpa topping dan dengan topping sesuai daftar menu
- Keranjang
- Ringkasan pesanan otomatis disalin lalu Instagram Orenji dibuka
- Tombol lokasi langsung ke Google Maps
- Admin panel
- Tambah produk
- Upload foto produk
- Hapus produk
- Perubahan produk tersimpan di localStorage browser

## Catatan penting
Pesanan Instagram tidak otomatis masuk ke dashboard website karena transaksi dilakukan di DM Instagram. Website hanya mengarahkan pelanggan ke Instagram dan membantu menyalin ringkasan pesanan.

Untuk penyimpanan produk/foto yang benar-benar terpusat dan bisa dipakai lintas perangkat, tahap berikutnya adalah menghubungkan database/storage (misalnya Supabase) dan authentication admin.

## Alur publikasi sesuai panduan tugas
1. Prompt/detail website → Gemini untuk preview/kode.
2. Pisahkan HTML, JavaScript, CSS.
3. Upload file ke GitHub repository public.
4. Hubungkan repository ke Vercel.
5. Vercel menghasilkan link website.
6. Jika memakai penyimpanan foto terpusat, gunakan Supabase/Firebase.

Panduan tugas yang diberikan kelompok juga menjelaskan alur GitHub → Vercel serta opsi Supabase/Firebase untuk penyimpanan foto.
