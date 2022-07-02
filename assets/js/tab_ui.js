const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Menu mobile cấp 1
const tabs = $$(".tab-item");
const panes = $$(".tab-pane");
const tabActive = $(".tab-item.active");
const line = $(".line");
line.style.left = tabActive.offsetLeft + "px";
line.style.width = tabActive.offsetWidth + "px";
handleMenuMobile();
tabs.forEach((tab, index) => {
  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");
    this.classList.add("active");
    panes[index].classList.add("active");
    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";
    handleMenuMobile();
  };
});

// Menu mobile cấp 2
function handleMenuMobile() {
  const list_menu_has_child = $$(".tab-pane.active .list-parent__has-child");
  list_menu_has_child.forEach((menu_child, index) => {
    menu_child.onclick = function () {
      menu_child.classList.add("active");
    };
    const close_menu_child = menu_child
      .querySelector(".list-child-of-list-parent")
      .querySelector(".list-child__title-and-close");
    close_menu_child.onclick = (event) => {
      event.stopPropagation();
      menu_child.classList.remove("active");
    };
  });
}
// Handle action cuộn gọn title
const aside_title = $$(".aside-title");
aside_title.forEach((aside_title, index) => {
  const aside_content = aside_title.nextSibling.nextSibling;
  aside_title.onclick = function () {
    aside_content.classList.toggle("active");
  };
});
// handle action Xem thêm, Thu gọn trong menu/
const array_asideContent = $$(".aside-content");
array_asideContent.forEach((aside_content) => {
  const maxHeight = aside_content.firstElementChild;
  const show_more = aside_content.firstElementChild.nextElementSibling;
  const show_less = aside_content.lastElementChild;
  show_more.onclick = () => {
    maxHeight.classList.remove("max-height");
    show_more.classList.add("d-none");
    show_less.classList.remove("d-none");
  };
  show_less.onclick = () => {
    maxHeight.classList.add("max-height");
    show_less.classList.add("d-none");
    show_more.classList.remove("d-none");
  };
});

// handle action Xem thêm, Thu gọn trong product detail/
const product_content_bottom = $(".product-content-bottom__main");
const show_more_div = $(".show-more");
const btn_show_more = $(".show-more__btn-action-more");
const btn_show_less = $(".show-more__btn-action-less");
if (btn_show_more) {
  btn_show_more.onclick = () => {
    product_content_bottom.classList.add("expanded");
    show_more_div.classList.add("active");
  };
  btn_show_less.onclick = () => {
    product_content_bottom.classList.remove("expanded");
    show_more_div.classList.remove("active");
  };
}

// Handle click filer sorting
const showTextSort = $(".section-sort__selected-sort__title .text span");
const btn_quick_sort = $$(".btn-quick-sort");
btn_quick_sort.forEach((sort_item) => {
  sort_item.onclick = () => {
    $(".btn-quick-sort.active").classList.remove("active");
    sort_item.classList.add("active");
    showTextSort.innerHTML = `${sort_item.innerText}`;
  };
});

// handle click heart (wishlist products)
function handleWishList(element) {
  element.classList.toggle("swiper-products_thubnail__favorite-liked");
}
var heartList = $$(".swiper-products_thubnail__favorite");
Array.from(heartList).forEach(function (heart) {
  heart.onclick = (e) => {
    e.preventDefault();
    heart.classList.toggle("swiper-products_thubnail__favorite-liked");
  };
});

// handle click product option watch image
function getParent(element, selector) {
  while (element.parentElement) {
    if (element.parentElement.matches(selector)) {
      return element.parentElement;
    }
    element = element.parentElement;
  }
}
function handleImgProductOptionWatch(optionImage) {
  const product = getParent(optionImage, ".swiper-products__item");
  const imgThumbnail = product.querySelector(".product-item__img").firstElementChild;
  const urlImg = optionImage.firstElementChild.style.backgroundImage.split(/"/)[1];
  imgThumbnail.src = urlImg;
}
(function handleProductsOptionWatch() {
  const products = $$(".swiper-products__item");
  // console.log(products);
  Array.from(products).forEach(function (product) {
    const imgThumbnail = product.querySelector(".product-item__img").firstElementChild;
    const optionsImage = product.querySelectorAll(".product-info-option-watch__item");
    Array.from(optionsImage).forEach(function (option) {
      option.onclick = (e) => {
        const urlImg = option.firstElementChild.style.backgroundImage.split(/"/)[1];
        imgThumbnail.src = urlImg;
        console.log(1);
        console.log(urlImg);
      };
    });
  });
})();

// handle hover image product detail
(function handleProductDetailImage() {
  const groupImage = $$(".gallery-img__item");
  if ($(".product-detail-lager-img")) {
    const productMainImage = $(".product-detail-lager-img").firstElementChild;
    groupImage.forEach(function (galleryItem) {
      galleryItem.onmouseover = () => {
        const urlImg = galleryItem.firstElementChild.getAttribute("src");
        productMainImage.src = urlImg;
      };
    });
  }
})();

// Hanlde button back to top
btnBackToTop = document.querySelector(".back-to-top");
if (btnBackToTop) {
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btnBackToTop.style.display = "block";
    } else {
      btnBackToTop.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function backToTop() {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
    });
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
