const productSeries = [
  {
    code: "pa150",
    size: "150cm",
    page: "pa150-product.html",
    prices: { 4: ["4.190.000 VNĐ", "5.990.000 VNĐ"], 6: ["4.890.000 VNĐ", "6.990.000 VNĐ"] }
  },
  {
    code: "pa140",
    size: "140cm",
    page: "pa140-product.html",
    prices: { 4: ["4.090.000 VNĐ", "5.890.000 VNĐ"], 6: ["4.790.000 VNĐ", "6.890.000 VNĐ"] }
  },
  {
    code: "pa120",
    size: "120cm",
    page: "pa120-product.html",
    prices: { 4: ["3.890.000 VNĐ", "5.590.000 VNĐ"], 6: ["4.590.000 VNĐ", "6.590.000 VNĐ"] }
  }
];

const productFinishes = [
  {
    key: "white",
    label: "Màu Trắng Giả Vân Đá",
    fourImage: "assets/pian-hero-kitchen-table.png",
    sixImage: "assets/pian-hero-kitchen-table.png"
  },
  {
    key: "black",
    label: "Màu Đen Giả Vân Đá",
    fourImage: "assets/bep-sang-trong-IMG_5947.png",
    sixImage: "assets/pian-folding-dining-table.png"
  },
  {
    key: "wood",
    label: "Màu Nâu Giả Vân Gỗ Tự Nhiên",
    fourImage: "assets/hero-product-living-room.png",
    sixImage: "assets/hero-product-black-room.png"
  }
];

const allProducts = productSeries.flatMap((series) =>
  [4, 6].flatMap((chairs) =>
    productFinishes.map((finish) => ({
      series: series.code,
      name: `Bàn ăn gấp gọn ${series.size} ${finish.label} - ${chairs} ghế`,
      image: chairs === 4 ? finish.fourImage : finish.sixImage,
      price: series.prices[chairs][0],
      originalPrice: series.prices[chairs][1],
      url: `${series.page}?variant=${finish.key}-${chairs}`
    }))
  )
);

const productGrid = document.querySelector("#all-products-grid");
const seriesFilter = document.querySelector("#product-series-filter");

function renderProducts(series = "all") {
  if (!productGrid) return;

  const products = series === "all"
    ? allProducts
    : allProducts.filter((product) => product.series === series);

  productGrid.innerHTML = products.map((product) => `
    <article class="all-product-card">
      <a class="all-product-image" href="${product.url}">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span>-30%</span>
      </a>
      <div class="all-product-content">
        <h2><a href="${product.url}">${product.name}</a></h2>
        <div class="all-product-price">
          <strong>${product.price}</strong>
          <del>${product.originalPrice}</del>
        </div>
        <a class="all-product-action" href="${product.url}">Xem chi tiết</a>
      </div>
    </article>
  `).join("");

}

seriesFilter?.addEventListener("change", (event) => {
  renderProducts(event.target.value);
});

renderProducts();
