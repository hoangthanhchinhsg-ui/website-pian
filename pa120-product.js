const pa120Products = {
  "white-4": {
    sku: "PA120-T4",
    name: "Bàn ăn gấp gọn 120cm Màu Trắng Giả Vân Đá - 4 ghế",
    salePrice: "3.890.000 VNĐ",
    originalPrice: "5.590.000 VNĐ",
    image: "assets/pian-hero-kitchen-table.png"
  },
  "black-4": {
    sku: "PA120-D4",
    name: "Bàn ăn gấp gọn 120cm Màu Đen Giả Vân Đá - 4 ghế",
    salePrice: "3.890.000 VNĐ",
    originalPrice: "5.590.000 VNĐ",
    image: "assets/bep-sang-trong-IMG_5947.png"
  },
  "wood-4": {
    sku: "PA120-G4",
    name: "Bàn ăn gấp gọn 120cm Màu Nâu Giả Vân Gỗ Tự Nhiên - 4 ghế",
    salePrice: "3.890.000 VNĐ",
    originalPrice: "5.590.000 VNĐ",
    image: "assets/hero-product-living-room.png"
  },
  "white-6": {
    sku: "PA120-T6",
    name: "Bàn ăn gấp gọn 120cm Màu Trắng Giả Vân Đá - 6 ghế",
    salePrice: "4.590.000 VNĐ",
    originalPrice: "6.590.000 VNĐ",
    image: "assets/pian-hero-kitchen-table.png"
  },
  "black-6": {
    sku: "PA120-D6",
    name: "Bàn ăn gấp gọn 120cm Màu Đen Giả Vân Đá - 6 ghế",
    salePrice: "4.590.000 VNĐ",
    originalPrice: "6.590.000 VNĐ",
    image: "assets/pian-folding-dining-table.png"
  },
  "wood-6": {
    sku: "PA120-G6",
    name: "Bàn ăn gấp gọn 120cm Màu Nâu Giả Vân Gỗ Tự Nhiên - 6 ghế",
    salePrice: "4.590.000 VNĐ",
    originalPrice: "6.590.000 VNĐ",
    image: "assets/hero-product-black-room.png"
  }
};

const variantKey = new URLSearchParams(window.location.search).get("variant") || "black-4";
const product = pa120Products[variantKey] || pa120Products["black-4"];

document.title = `${product.name} | PIAN`;
document.querySelector("#detail-product-name").textContent = product.name;
document.querySelector("#breadcrumb-product").textContent = product.name;
document.querySelector("#detail-sku").textContent = product.sku;
document.querySelector("#detail-sale-price").textContent = product.salePrice;
document.querySelector("#detail-original-price").textContent = product.originalPrice;
document.querySelector("#detail-main-image").src = product.image;
document.querySelector("#detail-main-image").alt = product.name;
document.querySelector("[data-gallery-image]").src = product.image;

function createProductCard(key) {
  const item = pa120Products[key];
  const article = document.createElement("article");
  const href = `pa120-product.html?variant=${encodeURIComponent(key)}`;
  article.innerHTML = `
    <a href="${href}"><img src="${item.image}" alt="${item.name}"></a>
    <h3><a href="${href}">${item.name}</a></h3>
    <p><strong>${item.salePrice}</strong><del>${item.originalPrice}</del></p>
  `;
  return article;
}

const similarProducts = document.querySelector("#similar-products");
Object.keys(pa120Products)
  .filter((key) => key !== variantKey)
  .forEach((key) => similarProducts.appendChild(createProductCard(key)));

const viewedStorageKey = "pian-viewed-pa120-products";
let viewedProductKeys = [];
try {
  viewedProductKeys = JSON.parse(localStorage.getItem(viewedStorageKey)) || [];
} catch {
  viewedProductKeys = [];
}
viewedProductKeys = [
  variantKey,
  ...viewedProductKeys.filter((key) => key !== variantKey && pa120Products[key])
].slice(0, 6);
localStorage.setItem(viewedStorageKey, JSON.stringify(viewedProductKeys));

const viewedProducts = document.querySelector("#viewed-products");
viewedProductKeys.forEach((key) => viewedProducts.appendChild(createProductCard(key)));

document.querySelectorAll(".cafa-thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    document.querySelectorAll(".cafa-thumb").forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
    const image = thumb.querySelector("img");
    const mainImage = document.querySelector("#detail-main-image");
    mainImage.src = image.src;
    mainImage.alt = image.alt || product.name;
  });
});

const quantityInput = document.querySelector("#product-quantity");

document.querySelectorAll("[data-quantity-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const currentValue = Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
    quantityInput.value = button.dataset.quantityAction === "increase"
      ? currentValue + 1
      : Math.max(1, currentValue - 1);
  });
});

quantityInput.addEventListener("change", () => {
  quantityInput.value = Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
});

document.querySelectorAll("[data-detail-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-detail-tab]").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".cafa-tab-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.detailTab}`).classList.add("active");
  });
});

document.querySelectorAll("[data-related-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-related-tab]").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".related-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");
    const activePanel = document.querySelector(`#${button.dataset.relatedTab}`);
    activePanel.classList.add("active");
    activePanel.scrollTo({ left: 0, behavior: "smooth" });
  });
});

document.querySelectorAll("[data-related-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const activePanel = document.querySelector(".related-panel.active");
    const direction = Number(button.dataset.relatedScroll);
    activePanel.scrollBy({
      left: activePanel.clientWidth * direction,
      behavior: "smooth"
    });
  });
});

document.querySelector("#open-order-form").addEventListener("click", () => {
  const quantity = Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
  window.location.href = `checkout.html?series=pa120&variant=${encodeURIComponent(variantKey)}&quantity=${quantity}`;
});

document.querySelector(".review-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".review-message").textContent =
    "PIAN chân thành cảm ơn đánh giá của bạn!";
  event.currentTarget.reset();
});
