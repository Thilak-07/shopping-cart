if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeButtons = document.getElementsByClassName("btn-remove");
  for (var i = 0; i < removeButtons.length; i++) {
    var btn = removeButtons[i];
    btn.addEventListener("click", removefunction);
  }

  var inputCells = document.getElementsByClassName("quantity-input");
  for (var i = 0; i < inputCells.length; i++) {
    var input = inputCells[i];
    input.addEventListener("change", quantityChanged);
  }

  var addButtons = document.getElementsByClassName("add-button");
  for (var i = 0; i < addButtons.length; i++) {
    var btn = addButtons[i];
    btn.addEventListener("click", addfuction);
  }

  var purchaseBtn = document.getElementsByClassName("purchase-button")[0];
  purchaseBtn.addEventListener("click", purchasefunction);
}

//Change events
function removefunction(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function purchasefunction(event) {
  alert("Thankyou for your purchase!");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.firstChild.remove();
  }
  updateCartTotal();
}

function addfuction(event) {
  var addbtn = event.target;
  var playlistElement = addbtn.parentElement.parentElement;
  var itemName =
    playlistElement.getElementsByClassName("album-name")[0].innerText;
  var price = playlistElement.getElementsByClassName("cost-tag")[0].innerText;
  var imgSrc = playlistElement.getElementsByClassName("item-img")[0].src;
  console.log(itemName, price, imgSrc);
  addToCart(itemName, price, imgSrc);
  updateCartTotal();
}

function addToCart(itemName, price, imgSrc) {
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var block = document.createElement("div");
  block.classList.add("row");

  var cartItemNames = cartItems.getElementsByClassName("cart-item-name");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (itemName == cartItemNames[i].innerText) {
      var theParent = cartItemNames[i].parentElement.parentElement;
      var quantity = theParent.getElementsByClassName("quantity-input")[0];
      quantity.value = parseInt(quantity.value) + 1;
      return;
    }
  }

  var rowContent = `
            <div class="cart-item cart-column">
                <img src="${imgSrc}" />
                <span class="cart-item-name">${itemName}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input type="number" value="1" class="quantity-input" />
                <button type="button" class="btn-remove">REMOVE</button>
            </div>`;
  block.innerHTML = rowContent;
  cartItems.append(block);
  block
    .getElementsByClassName("btn-remove")[0]
    .addEventListener("click", removefunction);
  block
    .getElementsByClassName("quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  } else {
    input.value = parseInt(input.value);
  }
  updateCartTotal();
}

function updateCartTotal() {
  var rows = document.getElementsByClassName("cart-items")[0];
  var row = rows.getElementsByClassName("row");
  var totalamt = 0;
  for (var i = 0; i < row.length; i++) {
    item = row[i];
    priceElement = item.getElementsByClassName("cart-price")[0];
    price = parseFloat(priceElement.innerText.replace("$", ""));
    quantityElement = item.getElementsByClassName("quantity-input")[0];
    quantity = quantityElement.value;
    totalamt += price * quantity;
    totalamt = Math.round(totalamt * 100) / 100;
  }

  var totalCell = document.getElementsByClassName("total-price")[0];
  totalCell.innerText = "$" + totalamt;
}
