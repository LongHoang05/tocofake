(() => {
  // Utility: Xác định đường dẫn tương đối dựa trên vị trí trang hiện tại
  const getPathPrefix = () =>
    window.location.pathname.includes("/pages/") ? "../" : "./";

  /**
   * Tải nội dung HTML từ một file và chèn vào container
   * @param {string} id - ID của phần tử chứa
   * @param {string} file - Đường dẫn tới file HTML
   */
  const loadComponent = async (id, file) => {
    const container = document.getElementById(id);
    if (!container) return;

    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Không tìm thấy file ${file}`);

      let html = await response.text();
      const pathPrefix = getPathPrefix();

      // Xử lý linh động đường dẫn thư mục cho ảnh và thẻ a
      html = html.replace(/href="\.\.\//g, `href="${pathPrefix}`);
      html = html.replace(/src="\.\.\//g, `src="${pathPrefix}`);

      // Tối ưu hoá (Lazy Loading): Footer chứa nhiều ảnh ko ở màn hình đầu tiên
      if (file.includes("footer.html")) {
        html = html.replace(/<img /g, '<img loading="lazy" ');
      }

      container.innerHTML = html;
    } catch (error) {
      console.error("Lỗi tải Component:", error);
      container.innerHTML = `<div style="padding: 20px; color: red; text-align: center; border: 1px solid red;">
        <b>LỖI HIỂN THỊ TRANG:</b> Trình duyệt chặn tải Header/Footer do bạn đang mở trực tiếp file HTML (giao thức file://). 
        Vui lòng dùng <b>Live Server</b> (VSCode) hoặc chạy <b>python -m http.server</b> để xem được đầy đủ giao diện.
        </div>`;
    }
  };

  // Khởi tạo chèn header và footer
  window.addEventListener("DOMContentLoaded", () => {
    const prefix = getPathPrefix();
    loadComponent("header", `${prefix}components/header.html`);
    loadComponent("footer", `${prefix}components/footer.html`);
  });
})();

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});
