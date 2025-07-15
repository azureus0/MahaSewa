// Ambil elemen
const kotaSelect = document.getElementById("select-kota");
const kategoriSelect = document.getElementById("select-kategori");
const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("btn-search");
const resultsContainer = document.getElementById("search-results");

// Fungsi baca query params
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    kota: params.get("kota") || "",
    kategori: params.get("kategori") || "",
    nama: params.get("nama") || "",
  };
}

// Isi form search dari URL (supaya form search terisi sesuai URL)
function populateSearchForm(params) {
  if (kotaSelect) kotaSelect.value = params.kota;
  if (kategoriSelect) kategoriSelect.value = params.kategori;
  if (inputSearch) inputSearch.value = params.nama;
}

// Fungsi tampilkan hasil pencarian (pakai style card seperti tampil-barang.js)
function tampilkanHasilPencarian(params) {
  if (!resultsContainer) return; // kalau elemen hasil pencarian ga ada (misal di halaman lain), skip

  const keyword = params.nama.toLowerCase();
  const kota = params.kota.toLowerCase();
  const kategori = params.kategori.toLowerCase();

  // Filter data barang global dari data-barang.js
  let filtered = barang.filter((item) =>
    item.nama.toLowerCase().includes(keyword)
  );

  if (kota)
    filtered = filtered.filter((item) => item.kota.toLowerCase() === kota);
  if (kategori)
    filtered = filtered.filter(
      (item) => item.kategori.toLowerCase() === kategori
    );

  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<p class="text-gray-600 col-span-full">Barang tidak ditemukan.</p>`;
    return;
  }

  resultsContainer.innerHTML = ""; // kosongkan container dulu

  filtered.forEach((item) => {
    const el = document.createElement("div");
    el.className =
      "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition";

    el.innerHTML = `
            <img src="${item.gambar}" alt="${
      item.nama
    }" class="w-full h-80 object-cover" />
            <div class="p-4">
                <h3 class="font-semibold text-lg text-gray-800">${
                  item.nama
                }</h3>
                <p class="text-sm text-gray-500 mt-1">${item.kota}</p>
                <p class="text-yellow-500 mt-2 text-sm">${"⭐️".repeat(
                  Math.round(item.rating)
                )}</p>
                <p class="text-blue-600 font-bold mt-1">Rp ${item.harga.toLocaleString()}/hari</p>
                <p class="text-gray-600 text-xs mt-1">Owner: ${item.pemilik}</p>
            </div>
        `;
    resultsContainer.appendChild(el);
  });
}

// Event listener tombol search
if (btnSearch) {
  btnSearch.addEventListener("click", () => {
    const kota = kotaSelect ? kotaSelect.value : "";
    const kategori = kategoriSelect ? kategoriSelect.value : "";
    const nama = inputSearch ? inputSearch.value.trim() : "";

    if (nama === "") {
      alert("Masukkan nama barang untuk mencari.");
      return;
    }

    const params = new URLSearchParams();
    if (kota) params.append("kota", kota);
    if (kategori) params.append("kategori", kategori);
    params.append("nama", nama);

    window.location.href = `search.html?${params.toString()}`;
  });
}

// Jalankan saat halaman load, jika di halaman search.html (ada form + container hasil)
window.addEventListener("DOMContentLoaded", () => {
  const params = getQueryParams();
  populateSearchForm(params);
  tampilkanHasilPencarian(params);
});
