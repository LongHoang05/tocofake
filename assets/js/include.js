async function loadComponent(id, file) {
  const container = document.getElementById(id);
  if (container) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Không tìm thấy file ${file}`);
      const html = await response.text();
      container.innerHTML = html;
    } catch (error) {
      console.error("Lỗi tải Component:", error);
      container.innerHTML = `<div style="padding: 20px; color: red; text-align: center; border: 1px solid red;"><b>LỖI HIỂN THỊ TRANG:</b> Trình duyệt chặn tải Header/Footer do bạn đang mở trực tiếp file HTML (giao thức file://). Vui lòng dùng <b>Live Server</b> (VSCode) hoặc chạy <b>python -m http.server</b> để xem được đầy đủ giao diện.</div>`;
    }
  }
}

// Khi trang tải xong thì chèn header và footer
window.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra nếu đang ở trong thư mục "pages"
  const basePath = window.location.pathname.includes("/pages/") ? "../" : "";

  loadComponent("header", `${basePath}components/header.html`);
  loadComponent("footer", `${basePath}components/footer.html`);
});

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
