const checkoutSeries = {
  pa150: { size: 150, price4: 4190000, price6: 4890000, listPage: "pa150.html", detailPage: "pa150-product.html" },
  pa140: { size: 140, price4: 4090000, price6: 4790000, listPage: "pa140.html", detailPage: "pa140-product.html" },
  pa120: { size: 120, price4: 3890000, price6: 4590000, listPage: "pa120.html", detailPage: "pa120-product.html" }
};

const checkoutVariants = {
  "white-4": { color: "Màu Trắng Giả Vân Đá", chairs: 4, image: "assets/pian-hero-kitchen-table.png" },
  "black-4": { color: "Màu Đen Giả Vân Đá", chairs: 4, image: "assets/bep-sang-trong-IMG_5947.png" },
  "wood-4": { color: "Màu Nâu Giả Vân Gỗ Tự Nhiên", chairs: 4, image: "assets/hero-product-living-room.png" },
  "white-6": { color: "Màu Trắng Giả Vân Đá", chairs: 6, image: "assets/pian-hero-kitchen-table.png" },
  "black-6": { color: "Màu Đen Giả Vân Đá", chairs: 6, image: "assets/pian-folding-dining-table.png" },
  "wood-6": { color: "Màu Nâu Giả Vân Gỗ Tự Nhiên", chairs: 6, image: "assets/hero-product-black-room.png" }
};

const params = new URLSearchParams(window.location.search);
const consultationMode = params.get("mode") === "consult";
const seriesKey = params.get("series") || "pa150";
const series = checkoutSeries[seriesKey] || checkoutSeries.pa150;
const variant = params.get("variant") || "black-4";
const selectedVariant = checkoutVariants[variant] || checkoutVariants["black-4"];
const product = {
  name: `Bàn ăn gấp gọn ${series.size}cm ${selectedVariant.color} - ${selectedVariant.chairs} ghế`,
  price: selectedVariant.chairs === 4 ? series.price4 : series.price6,
  image: selectedVariant.image
};
const quantityInput = document.querySelector("#checkout-quantity");
const currency = new Intl.NumberFormat("vi-VN");
let discount = 0;
let districtsByProvince = {
  "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Long Biên", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Hoàng Mai", "Thanh Xuân", "Nam Từ Liêm", "Bắc Từ Liêm", "Hà Đông", "Huyện/Thị xã khác"],
  "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Quận 11", "Quận 12", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Tân Bình", "Tân Phú", "Bình Tân", "TP. Thủ Đức", "Huyện khác"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ", "Hòa Vang"],
  "Hải Phòng": ["Hồng Bàng", "Lê Chân", "Ngô Quyền", "Hải An", "Kiến An", "Đồ Sơn", "Dương Kinh", "Huyện khác"],
  "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt", "Huyện khác"],
  "Tỉnh/Thành phố khác": ["Quận/Huyện/Thị xã khác"]
};

quantityInput.value = Math.max(1, Number.parseInt(params.get("quantity"), 10) || 1);

if (consultationMode) {
  document.body.classList.add("checkout-consult-mode");
  document.title = "Tư vấn mua hàng | PIAN";
  document.querySelector(".checkout-breadcrumb").innerHTML = `
    <a href="index.html">Trang chủ</a>
    <span>&gt;</span>
    <strong>Tư vấn mua hàng</strong>
  `;
}

document.querySelector("#checkout-name").textContent = product.name;
document.querySelector("#checkout-image").src = product.image;
document.querySelector("#checkout-image").alt = product.name;
const breadcrumbProduct = document.querySelector("#checkout-breadcrumb-product");
const breadcrumbSeries = document.querySelector("#checkout-breadcrumb-series");
if (breadcrumbProduct && breadcrumbSeries) {
  breadcrumbProduct.textContent = product.name;
  breadcrumbProduct.href = `${series.detailPage}?variant=${encodeURIComponent(variant)}`;
  breadcrumbSeries.textContent = `Bàn ăn gấp gọn ${series.size}cm`;
  breadcrumbSeries.href = series.listPage;
}

function updateCheckoutTotals() {
  const quantity = Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
  quantityInput.value = quantity;
  const lineTotal = product.price * quantity;
  const finalTotal = Math.max(0, lineTotal - discount);
  document.querySelector("#checkout-line-total").textContent = `${currency.format(lineTotal)} VNĐ`;
  document.querySelector("#checkout-discount").textContent = `${currency.format(discount)} VNĐ`;
  document.querySelector("#checkout-total").textContent = `${currency.format(finalTotal)} VNĐ`;
}

document.querySelectorAll("[data-checkout-quantity]").forEach((button) => {
  button.addEventListener("click", () => {
    const current = Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
    quantityInput.value = button.dataset.checkoutQuantity === "increase" ? current + 1 : Math.max(1, current - 1);
    updateCheckoutTotals();
  });
});

quantityInput.addEventListener("change", updateCheckoutTotals);

const consultProductSelect = document.querySelector("#consult-product-select");
const consultQuantityInput = document.querySelector("#consult-quantity");
const consultTotal = document.querySelector("#consult-total");
const consultProducts = [];

Object.entries(checkoutSeries).forEach(([currentSeriesKey, currentSeries]) => {
  Object.entries(checkoutVariants).forEach(([currentVariantKey, currentVariant]) => {
    consultProducts.push({
      value: `${currentSeriesKey}:${currentVariantKey}`,
      name: `Bàn ăn gấp gọn ${currentSeries.size}cm ${currentVariant.color} - ${currentVariant.chairs} ghế`,
      price: currentVariant.chairs === 4 ? currentSeries.price4 : currentSeries.price6
    });
  });
});

consultProducts.forEach((item) => {
  const option = document.createElement("option");
  option.value = item.value;
  option.textContent = `${item.name} - ${currency.format(item.price)} VNĐ`;
  consultProductSelect.appendChild(option);
});

function updateConsultTotal() {
  const selectedProduct = consultProducts.find((item) => item.value === consultProductSelect.value) || consultProducts[0];
  const quantity = Math.max(1, Number.parseInt(consultQuantityInput.value, 10) || 1);
  consultQuantityInput.value = quantity;
  consultTotal.textContent = `${currency.format(selectedProduct.price * quantity)} VNĐ`;
}

document.querySelectorAll("[data-consult-quantity]").forEach((button) => {
  button.addEventListener("click", () => {
    const current = Math.max(1, Number.parseInt(consultQuantityInput.value, 10) || 1);
    consultQuantityInput.value = button.dataset.consultQuantity === "increase" ? current + 1 : Math.max(1, current - 1);
    updateConsultTotal();
  });
});

consultProductSelect.addEventListener("change", updateConsultTotal);
updateConsultTotal();

const provinceSelect = document.querySelector("#checkout-province");
const districtSelect = document.querySelector("#checkout-district");

function populateDistricts() {
  const districts = districtsByProvince[provinceSelect.value] || [];
  districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
  districts.forEach((district) => {
    const option = document.createElement("option");
    option.value = district;
    option.textContent = district;
    districtSelect.appendChild(option);
  });
  districtSelect.disabled = districts.length === 0;
}

provinceSelect.addEventListener("change", populateDistricts);

function populateProvinces(preferredProvince = "Đà Nẵng") {
  provinceSelect.innerHTML = '<option value="">Chọn Tỉnh/Thành phố</option>';
  Object.keys(districtsByProvince)
    .sort((a, b) => a.localeCompare(b, "vi"))
    .forEach((province) => {
      const option = document.createElement("option");
      option.value = province;
      option.textContent = province;
      provinceSelect.appendChild(option);
    });
  if (districtsByProvince[preferredProvince]) {
    provinceSelect.value = preferredProvince;
  }
  populateDistricts();
}

async function loadAdministrativeData() {
  const cacheKey = "pian-vietnam-provinces-v1";
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached && Object.keys(cached).length >= 63) {
      districtsByProvince = cached;
      populateProvinces();
      return;
    }
  } catch {
    localStorage.removeItem(cacheKey);
  }

  try {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=2");
    if (!response.ok) throw new Error("Không tải được dữ liệu địa chỉ");
    const provinces = await response.json();
    const completeData = {};
    provinces.forEach((province) => {
      completeData[province.name] = (province.districts || []).map((district) => district.name);
    });
    if (Object.keys(completeData).length < 63) throw new Error("Dữ liệu địa chỉ chưa đầy đủ");
    districtsByProvince = completeData;
    localStorage.setItem(cacheKey, JSON.stringify(completeData));
  } catch {
    // Giữ danh sách dự phòng nếu thiết bị đang không có Internet.
  }
  populateProvinces();
}

loadAdministrativeData();

document.querySelector("#apply-coupon").addEventListener("click", () => {
  const code = document.querySelector("#coupon-code").value.trim().toUpperCase();
  const message = document.querySelector("#coupon-message");
  if (code === "PIAN100") {
    discount = 100000;
    message.textContent = "Đã áp dụng ưu đãi 100.000 VNĐ.";
  } else {
    discount = 0;
    message.textContent = code ? "Mã giảm giá chưa hợp lệ." : "Vui lòng nhập mã giảm giá.";
  }
  updateCheckoutTotals();
});

document.querySelector("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector(".checkout-success").textContent =
    "PIAN đã nhận đơn hàng. Nhân viên sẽ liên hệ xác nhận trong thời gian sớm nhất.";
});

updateCheckoutTotals();
