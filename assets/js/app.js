const productsAPI = "http://localhost:3000/products";
// const productsAPI = "https://6262611e327d3896e285b17d.mockapi.io/products";

function start() {
  getProducts(renderProducts);
  getProducts(renderPageProducts);
  getProducts(getLengthProducts);
  getProducts(getDetailProduct);
  renderCart();
}

function getProducts(callback) {
  fetch(productsAPI)
    .then((response) => response.json())
    .then(callback);
}
function renderPageProducts(products, value = 0) {
  if (value === 1) {
    products = [...products].sort(compareByName);
  } else if (value === 2) {
    products = [...products].sort(compareByName).reverse();
  } else if (value === 3) {
    products = [...products].sort(compareByPrice).reverse();
  } else if (value === 4) {
    products = [...products].sort(compareByPrice);
  }
  var tabContent = document.querySelector("#main-products-list");
  // const products = $$(".swiper-products__item");
  // console.log(products);
  if (tabContent) {
    var htmlsTabContent = products.map((product) => {
      // data sale
      let dataSale;
      if (!product.compare_at_price_varies) {
        dataSale = 100 - Math.floor((product.price_max / product.compare_at_price_max) * 100);
        dataSale = dataSale == 0 ? "" : `data-sale=\"${dataSale}%\"`;
        // console.log(dataSale);
      }
      // render option Watch image"],
      let htmlOptionWatch = product.images.map(function (image, index) {
        if (index < 4) {
          return `
            <div class="product-info-option-watch__item" onclick="handleImgProductOptionWatch(this)">
              <div class="color"
                style=" background-image: url(${image});
                background-size: 37px;
                background-repeat: no-repeat;
                background-position: center!important;"
              ></div>
            </div>
        `;
        }
      });
      htmlOptionWatch = htmlOptionWatch.join("");
      return `
      <div class="swiper-products__item col l-3 m-4 c-6">
        <div class="swiper-products_thubnail" ${product.compare_at_price_varies ? " " : dataSale}>
          <span class="new-tag"></span>
          <a href="detail.html?id=${product.id}" class="product-item__img">
            <img src="${product.featured_image}" alt="">
          </a>
          <a class="swiper-products_thubnail__favorite" onclick="handleWishList(this)">
            <img src="./assets/img/hearted_ico.svg" alt="" class="icon-heart icon-heart-fill">
            <img src="./assets/img/heart_ico.svg" alt="" class="icon-heart icon-heart-empty">
          </a>
        </div>
        <div class="product-item__info">
          <a href="" class="product-info-name">
            <h3>
              ${product.name}
            </h3>
          </a>
          <div class="product-info-price ${dataSale == 0 ? "" : "product-info-price-sale"} ">
            <span class="price-current">${product.price}đ</span>
            <span class="price-old">${product.compare_at_price_max}đ</span>
          </div>
          <div class="product-info-option-watch">
            ${htmlOptionWatch}
          </div>
        </div>
      </div>
      `;
    });
    // console.log(htmlsTabContent);
    tabContent.innerHTML = htmlsTabContent.join("");
  }
}
function renderProducts(products) {
  var tabContent = document.querySelector("#tab-content");
  // const products = $$(".swiper-products__item");
  // console.log(products);
  if (tabContent) {
    var htmlsTabContent = products.map((product) => {
      // data sale
      let dataSale;
      if (!product.compare_at_price_varies) {
        dataSale = 100 - Math.floor((product.price_max / product.compare_at_price_max) * 100);
        dataSale = dataSale == 0 ? "" : `data-sale=\"${dataSale}%\"`;
        // console.log(dataSale);
      }
      // render option Watch image"],
      let htmlOptionWatch = product.images.map(function (image, index) {
        if (index < 4) {
          return `
            <div class="product-info-option-watch__item" onclick="handleImgProductOptionWatch(this)">
              <div class="color"
                style=" background-image: url(${image});
                background-size: 37px;
                background-repeat: no-repeat;
                background-position: center!important;"
              ></div>
            </div>
        `;
        }
      });
      htmlOptionWatch = htmlOptionWatch.join("");
      return `
      <div class="swiper-products__item col l-2-4 m-3 c-6">
        <div class="swiper-products_thubnail" ${product.compare_at_price_varies ? " " : dataSale}>
          <span class="new-tag"></span>
          <a href="detail.html?id=${product.id}" class="product-item__img">
            <img src="${product.featured_image}" alt="">
          </a>
          <a class="swiper-products_thubnail__favorite" onclick="handleWishList(this)">
            <img src="./assets/img/hearted_ico.svg" alt="" class="icon-heart icon-heart-fill">
            <img src="./assets/img/heart_ico.svg" alt="" class="icon-heart icon-heart-empty">
          </a>
        </div>
        <div class="product-item__info">
          <a href="" class="product-info-name">
            <h3>
              ${product.name}
            </h3>
          </a>
          <div class="product-info-price ${dataSale == 0 ? "" : "product-info-price-sale"} ">
            <span class="price-current">${product.price}đ</span>
            <span class="price-old">${product.compare_at_price_max}đ</span>
          </div>
          <div class="product-info-option-watch">
            ${htmlOptionWatch}
          </div>
        </div>
      </div>
      `;
    });
    // console.log(htmlsTabContent);
    tabContent.innerHTML = htmlsTabContent.join("");
  }
}
function getDetailProduct(products) {
  const urlStr = window.location.href.toLowerCase();
  const url = new URL(urlStr);
  const id = url.searchParams.get("id");
  const product = id ? products.find((item) => item.id == id) : null;
  if (product) {
    // console.log(product.images);
    // handle path link
    const linkPath = document.querySelector(".title-path-link");
    linkPath.innerHTML = `
      <ul class="title-path-link__list">
        <li class="title-path-link__item">
            <a href="index.html">Trang chủ</a>
        </li>
        <li class="title-path-link__item">
            <a href="/">${product.product_type}</a>
        </li>
        <li class="title-path-link__item">
            <a href="detail.html?id=${product.id}">${product.name}</a>
        </li>
      </ul>
    `;
    // handle product details
    const productDetail = document.querySelector(".product-detail");
    // handle galleryImg
    const galleryImg = document.querySelector(".gallery-img");
    // galleryImg.innerHTML = `
    //   ${product.variants
    //     .map(function (variant, index) {
    //       return `
    //       <div class="gallery-img__item">
    //           <img src="${variant.featured_image.src}" alt="">
    //       </div>
    //     `;
    //     })
    //     .join("")}
    // `;
    const productIMGLarge = document.querySelector(".product-detail-lager-img img");
    productIMGLarge.src = product.featured_image;
    const productName = document.querySelector(".product-name");
    productName.innerHTML = `${product.name}`;
    const productPrice = document.querySelector(".product-body__price");
    if (product.price == product.compare_at_price_max) {
      productPrice.classList.add("product-body__price-not-sale");
      productPrice.innerHTML = `
        <span class="product-body__price-special">${product.price}đ</span>
        <span class="product-body__price-old">${product.price_max}đ</span>

      `;
    } else {
      productPrice.innerHTML = `
        <span class="product-body__price-special">${product.price}đ</span>
        <span class="product-body__price-old">${product.compare_at_price_max}đ</span>
      `;
    }
    // handle addto cart button
    const addToCartButton = document.querySelector(".product-body-btn__add-cart");
    addToCartButton.addEventListener("click", (e) => {
      e.preventDefault();
      const qtyNumber = document.querySelector("#qty");
      let cartProduct = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
      cartProduct.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.featured_image,
        qty: qtyNumber.value,
        subPrice: product.price * qtyNumber.value,
      });
      localStorage.setItem("cart", JSON.stringify(cartProduct));
      window.location.href = "cart.html";
    });
  }
}
function getLengthProducts(products) {
  const quantity = document.querySelector(".section-sort__count");
  if (quantity) {
    quantity.textContent = products.length + " sản phẩm";
  }
}
(function getQtyProductInCart() {
  const quantity = document.querySelector(".count-item-product");
  let cartProduct = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  const qty = cartProduct.reduce((sum, product) => sum + Number(product.qty), 0);
  if (qty && quantity) {
    quantity.textContent = "qty";
  }
})();

function sort(element, value) {
  getProducts((products) => {
    renderPageProducts(products, value);
  });
}

function compareByName(objFirst, objSecond) {
  // if (removeVietkey(objFist.name) > removeVietkey(objSecond.name)) {
  //   return 1;
  // } else if (removeVietkey(objFist.name) < removeVietkey(objSecond.name)) {
  //   return -1;
  // }
  // return 0;
  return objFirst.name.localeCompare(objSecond.name);
}
function compareByPrice(objFirst, objSecond) {
  if (objFirst.price > objSecond.price) {
    return 1;
  } else if (objFirst.price < objSecond.price) {
    return -1;
  }
  return 0;
}

function renderCart() {
  let cartProduct = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  console.log(cartProduct);
  const listCart = document.querySelector(".form-cart__cart-body");
  const countCart = document.querySelector(".count-item-product");
  const headerCountCart = document.querySelector(".header-cart__count-item");
  let subTotalPrice = 0;
  const htmlCart = cartProduct.map(function (item, index) {
    subTotalPrice += item.price * item.qty;
    return `
        <div class="form-cart__cart-product">
            <a href="" class="form-cart__cart-product-img">
                <img src="${item.img}" alt="">
            </a>
            <div class="form-cart__cart-product-info">
                <div class="form-cart__cart-name">
                    <a href="" class="form-cart__cart-product-name">${item.name}</a>
                    <div class="form-cart__mobile-price hide-on-pc">
                        <span class="form-cart__cart-price">${item.price}đ</span>
                    </div>
                    <span class="form-cart__cart-product-color-size">
                        Đỏ đô / 5XL
                    </span>
                    <div class="form-cart__remove-cart">
                        <div class="form-cart__mobile-group-btn-qty hide-on-pc" style="display:flex">
                            <div class="qty-group-btn">
                                <button class="qty-minus" onclick="decrementCount(event,${index})"> - </button>
                                <input type="text" class="qty-number" value="${
                                  item.qty
                                }" onchange="editCart(this,${index})">
                                <button class="qty-plus" onclick="incrementCount(event,${index})"> + </button>
                              </div>
                        </div>
                        <a href="javascript:;" class="cart-remove" onclick="deleteCart(${index})">Xóa</a>
                        <span class="cart-like hide-on-mobile-tablet">
                            <a href="javascript:;" class="setWishList">
                                <img src="	https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/heart_ico.svg?1648736343537" alt="">
                                <span>Lưu trong danh sách yêu thích</span>
                            </a>
                        </span>
                    </div>
                </div>
                <div class="form-cart__body-item hide-on-mobile-tablet">
                    <span class="form-cart__cart-price">${item.price.toLocaleString(
                      "de-DE"
                    )}đ</span>
                </div>
                <div class="form-cart__body-item group-btn-qty hide-on-mobile-tablet">
                    <div class="qty-group-btn">
                        <button class="qty-minus" onclick="decrementCount(event,${index})"> - </button>
                        <input type="text" class="qty-number" value="${
                          item.qty
                        }" onchange="editCart(this,${index})">
                        <button class="qty-plus" onclick="incrementCount(event,${index})" > + </button>
                      </div>
                </div>
                <div class="form-cart__body-item hide-on-mobile-tablet">
                    <span class="form-cart__cart-price">
                      ${(item.price * item.qty).toLocaleString("de-DE")}đ
                    </span>
                </div>
            </div>
        </div>
      `;
  });
  if (listCart) {
    listCart.innerHTML = htmlCart.join("");
    subTotalCart(subTotalPrice);
  }
  if (cartProduct.length) {
    const qty = cartProduct.reduce((sum, product) => sum + Number(product.qty), 0);
    if (qty) {
      if (qty !== 0) {
        headerCountCart.innerHTML = qty;
      } else {
        headerCountCart.style.display = "none";
      }
      countCart.innerHTML = qty;
    }
  } else {
    headerCountCart.style.display = "none";
    countCart.innerHTML = 0;
    renderCart();
  }
}

function subTotalCart(subPrice) {
  const subTotal = document.querySelector(".form-cart-payment__subtotal-price");
  subTotal.textContent = subPrice.toLocaleString("de-DE") + "đ";
}

function editCart(element, index) {
  let cartProduct = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  cartProduct[index].qty = element.value;
  localStorage.setItem("cart", JSON.stringify(cartProduct));
  renderCart();
}

function deleteCart(index) {
  let cartProduct = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  cartProduct.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartProduct));
  renderCart();
}

function decrementCount(event, index) {
  event.preventDefault();
  if (event.target.nextElementSibling.value < 2) {
    event.target.nextElementSibling.value;
  } else {
    event.target.nextElementSibling.value--;
  }
  editCart(event.target.nextElementSibling, index);
  renderCart();
  // console.log(event.target.nextElementSibling);
}
function incrementCount(event, index) {
  event.preventDefault();
  event.target.previousElementSibling.value++;
  editCart(event.target.previousElementSibling, index);
  renderCart();
}

start();
