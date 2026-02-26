/**
 * Utility function: Throttle để giới hạn số lần gọi hàm trong 1 khoảng thời gian
 * @param {Function} func - Hàm cần chạy
 * @param {number} limit - Thời gian delay (ms)
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const handleScroll = () => {
  const navbar = document.getElementById("header");
  if (!navbar) return;

  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", throttle(handleScroll, 150));
