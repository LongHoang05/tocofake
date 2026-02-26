const toggleBtn = document.getElementById("toggle-menu");
const menuPanel = document.querySelector(".main__menu");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  const isOpen = menuPanel.classList.toggle("show");
  icon.className = isOpen ? "fa-regular fa-circle-xmark" : "fa-solid fa-bars";
});

// Ẩn menu khi click ra ngoài
document.addEventListener("click", (e) => {
  if (!menuPanel.contains(e.target) && !toggleBtn.contains(e.target)) {
    menuPanel.classList.remove("show");
    icon.className = "fa-solid fa-bars";
  }
});

//menu cart
const button = document.getElementById("button"); // Nút mở giỏ hàng
const carttop = document.getElementById("cart-top"); // Khối giỏ hàng
const closeBtn = document.getElementById("close-cart"); // Nút X để đóng

// Khi bấm vào nút mở giỏ hàng
button.addEventListener("click", () => {
  button.classList.toggle("active");
  carttop.classList.toggle("show");
});

// Khi bấm vào nút X để đóng giỏ hàng
closeBtn.addEventListener("click", () => {
  carttop.classList.remove("show");
  button.classList.remove("active"); // (tùy chọn) bỏ trạng thái active nếu cần
});

// Fixed: Nút không hoạt động (Cập nhật logic giỏ hàng)
const addBtns = document.querySelectorAll(".main__order--add");
const cartProduct = document.querySelector(".main__cart--product");
const cartCostAmount = document.querySelector(
  ".main__cart--cost span:nth-child(3)",
);
const cartCostTotal = document.querySelector(
  ".main__cart--cost span:nth-child(5)",
);
let cartCount = 0;
let cartTotal = 0;

addBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    cartCount++;
    const item = e.target.closest(".main__order--item");
    const name = item.querySelector(".main__order--item-name").innerText;
    let priceStr = item.querySelector(".main__order--price-sale").innerText;
    let price = parseInt(priceStr.replace(/[^0-9]/g, ""));
    cartTotal += price;

    if (cartCount === 1) {
      cartProduct.innerHTML = "";
    }
    const div = document.createElement("div");
    div.style.paddingBottom = "5px";
    div.innerText = name;
    cartProduct.appendChild(div);

    cartCostAmount.innerText = cartCount;
    cartCostTotal.innerText = cartTotal.toLocaleString("vi-VN") + "đ";
  });
});

// Fixed: Nút xóa tất cả giỏ hàng
const clearCartBtn = document.querySelector(".main__cart--title p");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cartCount = 0;
    cartTotal = 0;
    cartProduct.innerHTML = "Chưa có sản phẩm nào!";
    cartCostAmount.innerText = "0";
    cartCostTotal.innerText = "0đ";
  });
}
