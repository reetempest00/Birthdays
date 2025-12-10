📦 Birthday Surprise — Interactive Gift Web

Project ini adalah website ucapan ulang tahun interaktif yang dibuat dengan HTML, CSS, dan JavaScript.
Di dalamnya ada beberapa scene seperti prank error, animasi hadiah yang berjalan dari samping,
dialog bubble, efek emoji, hingga slide-show foto.

Semua flow dibuat step-by-step supaya pengalaman pengguna terasa menyenangkan dan penuh kejutan.

🚀 Fitur Utama
1. Fake Error Prank
Saat tombol pertama diklik, muncul error palsu beberapa kali.
Setelah batas tertentu, scene error akan hilang dan masuk ke animasi hadiah.

2. Gift Entrance Animation
Kado muncul dari kiri, bergerak dalam 3 tahap:
    -Muncul setengah + bubble “haloo 👋”
    -Maju sedikit + bubble “kamu yang ultah?? 🎂”
    -Ke tengah + bubble “aku hadiah dari Ree 😎”
Semua timing diatur lewat setTimeout().

3. Emoji Interrupt
Sebelum kado meledak, ada emoji 🥳 yang muncul dengan bubble kecil.

4. Gift Explosion
Tutup kado terbuka, efek partikel/ledakan animasi berjalan.
Lanjut otomatis ke scene slide-show.

5. Slide Show Foto
Auto-play, ada tombol navigasi, dan bullet indicator.

6. Responsive
Layout disesuaikan untuk mobile dan desktop.
Gerakan kado sudah dikalibrasi agar tidak loncat kanan-kiri di mobile.

🗂 Struktur Folder (Rekomendasi)
>Project
    >assets
        >images  
        >sound
    >src 
        >index.html 
        >script.js 
        >style.css
    >README.md

🔧 Cara Pakai / Run Project
    Clone repo ini atau download zip

    git clone <repo-link>

    Buka file index.html di browser
    Tidak perlu server, cukup double-click.
    Untuk hasil terbaik, buka di Chrome / Edge / Firefox terbaru.

🛠 Teknologi yang Dipakai
    HTML 5
    CSS 3 (flexbox, custom animation)
    Vanilla JavaScript
    Tidak memakai library eksternal agar ringan dan mudah dipahami.

🎨 Kustomisasi
    Ubah Waktu Animasi
    Semua timing ada di main.js bagian startGiftFlow():

    setTimeout(() => {
    // step 1
    }, 220);

    setTimeout(() => {
    // step 2
    }, 1200);

    Ganti angka-angknya sesuai tempo yang kamu mau.

    Ganti Kado ke PNG
    Ganti HTML bagian <div class="gift-card"> dengan <img src="assets/img/gift.png">
        Di CSS cukup atur .gift dan ukuran gambar.
        Flow JS tidak perlu diubah karena yang berpindah hanyalah node gift.

📌 Catatan Penting
    Jangan klik kado sebelum dia sampai ke tengah — nanti flow bisa skip.
    Semua animasi bisa kamu atur sendiri kalau mau dibuat lebih “nakal” atau lebih kalem.
    Jika muncul bug tampilan ganjil di mobile, fokus di CSS bagian .gift-stage dan .gift.

👤 Author
    Project dibuat oleh Ree sebagai latihan kreativitas, sentuhan personal, dan media buat ngasih kejutan spesial.