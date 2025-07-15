// Ambil parameter dari URL
const params = new URLSearchParams(window.location.search);
const kategori = params.get("kategori");

// Tampilkan judul
document.getElementById("judul-kategori").textContent = "Kategori: " + kategori;

// Filter data
const hasil = barang.filter(item => item.kategori === kategori);

// DOM elemen target
const container = document.getElementById("list-kategori-barang");

if (hasil.length === 0) {
  container.innerHTML = `<p class="text-gray-600 col-span-full text-center">Tidak ada barang dalam kategori ini.</p>`;
} else {
  hasil.forEach(item => {
    const el = document.createElement("div");
    el.className = "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition";
    el.innerHTML = `
      <img src="${item.gambar}" alt="${item.nama}" class="w-full h-80 object-cover" />
      <div class="p-4">
        <h3 class="font-semibold text-lg text-gray-800">${item.nama}</h3>
        <p class="text-sm text-gray-500 mt-1">${item.kota}</p>
        <p class="text-yellow-500 mt-2 text-sm">${'⭐️'.repeat(Math.round(item.rating))}</p>
        <p class="text-blue-600 font-bold mt-1">Rp ${item.harga.toLocaleString()}/hari</p>
        <p class="text-gray-600 text-xs mt-1">Owner: ${item.pemilik}</p>
      </div>
    `;
    container.appendChild(el);
  });
}
