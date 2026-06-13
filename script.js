const siteHeader = document.querySelector(".site-header");
const marketMenu = document.querySelector(".market-menu");

if (siteHeader) {
  siteHeader.setAttribute("aria-label", "Thanh điều hướng");
  siteHeader.innerHTML = `
    <a class="brand" href="index.html" aria-label="PIAN">
      <img class="brand-logo" src="assets/pian-logo-transparent.png" alt="">
      <img class="brand-wordmark" src="assets/pian-wordmark-clean.svg" alt="PIAN">
    </a>
  `;
}

if (marketMenu) {
  marketMenu.setAttribute("aria-label", "Điều hướng chính");
  marketMenu.innerHTML = `
    <div class="menu-links">
      <a href="index.html">Trang chủ</a>
      <a href="about.html">Giới thiệu</a>
      <a href="products.html">Sản phẩm</a>
      <a href="news.html">Tin tức</a>
    </div>
    <div class="menu-category">
      <button type="button" aria-expanded="false">
        <span class="category-icon"></span>
        Danh mục sản phẩm
      </button>
      <div class="menu-category-list"></div>
    </div>
    <div class="menu-contact">
      <a class="menu-hotline" href="tel:0913011863">Hotline: 0913 011 863</a>
      <a class="menu-consult" href="checkout.html?mode=consult">Tư vấn mua hàng</a>
    </div>
  `;
}

const contactForm = document.querySelector(".contact-form");

document.querySelectorAll(".menu-category-list").forEach((list) => {
  list.innerHTML = `
    <a href="products.html">
      <img src="assets/pian-folding-dining-table.png" alt="">
      <span>Tất Cả Sản Phẩm</span>
    </a>
    <a href="pa150.html">
      <img src="assets/bep-sang-trong-IMG_5947.png" alt="">
      <span>Bàn Ăn Gấp Gọn 150CM</span>
    </a>
    <a href="pa140.html">
      <img src="assets/pian-folding-dining-table.png" alt="">
      <span>Bàn Ăn Gấp Gọn 140CM</span>
    </a>
    <a href="pa120.html">
      <img src="assets/hero-product-living-room.png" alt="">
      <span>Bàn Ăn Gấp Gọn 120CM</span>
    </a>
  `;
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#form-note").textContent = "Đã nhận thông tin. PIAN sẽ liên hệ tư vấn sớm.";
    event.currentTarget.reset();
  });
}

document.querySelectorAll(".small-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.tagName === "A") return;
    button.textContent = "Đã thêm";
    window.setTimeout(() => {
      button.textContent = "Thêm giỏ hàng";
    }, 1400);
  });
});

const mainPhoto = document.querySelector(".main-photo img");

document.querySelectorAll(".thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    document.querySelectorAll(".thumb").forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
    if (mainPhoto) {
      mainPhoto.style.objectPosition = getComputedStyle(thumb.querySelector("img")).objectPosition;
    }
  });
});

document.querySelectorAll(".menu-category button").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const category = button.closest(".menu-category");
    const wasOpen = category.classList.contains("open");

    document.querySelectorAll(".menu-category.open").forEach((item) => {
      item.classList.remove("open");
      item.querySelector("button")?.setAttribute("aria-expanded", "false");
    });

    if (!wasOpen) {
      category.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".menu-category.open").forEach((category) => {
    category.classList.remove("open");
    category.querySelector("button")?.setAttribute("aria-expanded", "false");
  });
});

const sharedFooter = document.querySelector(".site-footer");

if (sharedFooter) {
  sharedFooter.innerHTML = `
    <div>
      <strong>PIAN HOME</strong>
      <span>Địa chỉ: 791 An Hạ, Tân Vĩnh Lộc, Thành Phố Hồ Chí Minh</span>
      <a href="mailto:info@pian.vn">Email: info@pian.vn</a>
      <a href="tel:0913011863">Hotline: 0913 011 863</a>
    </div>
    <div>
      <strong>HỖ TRỢ KHÁCH HÀNG</strong>
      <a href="payment-policy.html">Chính sách thanh toán</a>
      <a href="privacy-policy.html">Chính sách bảo mật</a>
      <a href="warranty-policy.html">Chính sách bảo hành</a>
      <a href="shipping-inspection-policy.html">Chính sách vận chuyển, kiểm hàng</a>
    </div>
    <div>
      <strong>GIỚI THIỆU</strong>
      <a href="about.html">Giới thiệu PIAN</a>
      <a href="news.html">Tin tức</a>
      <a href="pa150-product.html#detail-review">Hướng dẫn mua hàng</a>
      <a href="products.html">Tất cả sản phẩm</a>
    </div>
    <div class="footer-map-column">
      <iframe
        class="footer-map"
        title="Bản đồ showroom PIAN"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps?q=791%20An%20H%E1%BA%A1%2C%20T%C3%A2n%20V%C4%A9nh%20L%E1%BB%99c%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh&output=embed"
      ></iframe>
    </div>
  `;

  const oldFooterBottom = document.querySelector(".footer-bottom");
  if (oldFooterBottom) oldFooterBottom.remove();

  sharedFooter.insertAdjacentHTML(
    "afterend",
    '<div class="footer-bottom">© 2026 Công ty TNHH PIAN. Bảo lưu mọi quyền.</div>'
  );
}

if (sharedFooter) {
  const allProductsFooterLink = sharedFooter.querySelector('a[href="products.html"]');
  const purchaseGuideFooterLink = sharedFooter.querySelector('a[href*="#detail-review"]');

  if (allProductsFooterLink && purchaseGuideFooterLink) {
    purchaseGuideFooterLink.href = "purchase-guide.html";
    allProductsFooterLink.insertAdjacentElement("afterend", purchaseGuideFooterLink);
  }
}

const phonePattern = /0913[\s.-]*011[\s.-]*863/g;
const phoneWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const phoneTextNodes = [];

while (phoneWalker.nextNode()) {
  const node = phoneWalker.currentNode;
  const parent = node.parentElement;

  if (
    parent &&
    !parent.closest("a, button, input, textarea, select, option, script, style") &&
    phonePattern.test(node.nodeValue)
  ) {
    phoneTextNodes.push(node);
  }

  phonePattern.lastIndex = 0;
}

phoneTextNodes.forEach((node) => {
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;

  node.nodeValue.replace(phonePattern, (match, offset) => {
    fragment.append(node.nodeValue.slice(lastIndex, offset));

    const link = document.createElement("a");
    link.className = "phone-link";
    link.href = "tel:0913011863";
    link.textContent = match;
    link.setAttribute("aria-label", "Gọi 0913 011 863");
    fragment.append(link);

    lastIndex = offset + match.length;
    return match;
  });

  fragment.append(node.nodeValue.slice(lastIndex));
  node.replaceWith(fragment);
});
