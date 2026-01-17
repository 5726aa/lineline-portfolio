document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('m-menu-btn');
  const nav = document.getElementById('m-nav');
  btn.onclick = () => {
    btn.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
  };
});
const header = document.querySelector('#header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  const visibleEntries = entries.filter(entry => entry.isIntersecting);
  const allFadeElements = Array.from(document.querySelectorAll('.fade-in'));
  visibleEntries.sort((a, b) => {
    return allFadeElements.indexOf(a.target) - allFadeElements.indexOf(b.target);
  });
  visibleEntries.forEach((entry, index) => {
    const el = entry.target;
    if (el.classList.contains('active')) return;
    el.style.transitionDelay = `${index * 0.3}s`;
    el.classList.add('active');
    observer.unobserve(el);
  });
}, observerOptions);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
const lineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      lineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.line-animation-container').forEach(container => {
  lineObserver.observe(container);
});
const filterBtns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filterValue = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    items.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('active');
      item.style.transitionDelay = '0s';
    });
    const targetItems = filterValue === 'all'
      ? Array.from(items)
      : Array.from(items).filter(item => item.classList.contains(filterValue));
    targetItems.forEach((item, index) => {
      item.classList.remove('hide');
      setTimeout(() => {
        item.style.transitionDelay = `${index * 0.15}s`;
        item.classList.add('active');
      }, 50);
    });
  });
});
const buyBtn = document.querySelector('.btn-black');
const cartBtn = document.querySelector('.btn-white');
if (buyBtn && cartBtn) {
  buyBtn.addEventListener('click', () => {
    const product = {
      name: document.querySelector('.product-name').innerText,
      price: document.querySelector('.price').innerText
    };
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push(product);
    localStorage.setItem('myCart', JSON.stringify(cart));
    location.href = 'mypage.html';
  });
  cartBtn.addEventListener('click', () => {
    const product = {
      name: document.querySelector('.product-name').innerText,
      price: document.querySelector('.price').innerText
    };
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push(product);
    localStorage.setItem('myCart', JSON.stringify(cart));
    const goToCart = confirm("상품이 장바구니에 담겼습니다.\n장바구니(마이페이지)로 이동하시겠습니까?");
    if (goToCart) {
      location.href = 'mypage.html';
    } else {
      console.log("쇼핑 계속하기");
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit-btn');
  const contactForm = document.getElementById('contact-form');
  if (submitBtn && contactForm) {
    submitBtn.addEventListener('click', function () {
      const name = document.getElementById('user-name').value;
      const email = document.getElementById('user-email').value;
      const message = document.getElementById('user-message').value;
      if (name === "" || email === "" || message === "") {
        alert("내용을 모두 입력해 주세요.");
        return;
      }
      const container = contactForm.parentElement;
      showCompleteMessage(
        container,
        "SUCCESS",
        "문의가 정상적으로 접수되었습니다.<br>답변은 입력하신 이메일로 발송됩니다."
      );
    });
  }
  function showCompleteMessage(container, title, sub, isCart = false) {
    container.innerHTML = `
            <div class="complete-msg fade-in active">
                <h3>${title}</h3>
                <p>${sub}</p>
                <div class="buy-btns" style="margin-top:20px;">
                    <button onclick="location.reload()" class="btn-white">BACK</button>
                    ${isCart ? `<button onclick="location.href='mypage.html'" class="btn-black">GO TO CART</button>` : ''}
                </div>
            </div>
        `;
  }
});
const topBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});
topBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
const currentPathName = window.location.pathname.split("/").pop();
const mobileLinks = document.querySelectorAll('.m-nav a');
mobileLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (currentPathName === linkPath || (currentPathName === "" && linkPath === "index.html")) {
    link.classList.add('active');
  }
});
const activePath = window.location.pathname.split("/").pop();
const allMenuLinks = document.querySelectorAll('.nav a, .m-nav a');
allMenuLinks.forEach(link => {
  const linkHref = link.getAttribute('href');
  if (activePath === linkHref || (activePath === "" && linkHref === "index.html")) {
    link.classList.add('active');
  }
});