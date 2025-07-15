const ITEMS_PER_PAGE = 8;
let currentPage = 1;

function tampilkanBarang() {
  const container = document.getElementById("rekomendasi-barang");
  container.innerHTML = "";

  const endIndex = currentPage * ITEMS_PER_PAGE;
  const itemsToShow = barang.slice(0, endIndex);

  itemsToShow.forEach((item) => {
    const el = document.createElement("div");
    el.className = "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer";

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

    el.addEventListener("click", () => {
      window.location.href = `detail-barang.html?id=${item.id}`;
    });

    container.appendChild(el);
  });

  const btnViewMore = document.getElementById("btn-view-more");
  if (endIndex >= barang.length) {
    btnViewMore.style.display = "none";
  } else {
    btnViewMore.style.display = "block";
  }
}

function loadMore() {
  currentPage++;
  tampilkanBarang();
}

document.addEventListener("DOMContentLoaded", () => {
  tampilkanBarang();
  document.getElementById("btn-view-more").addEventListener("click", loadMore);
});
