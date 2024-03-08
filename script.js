document.addEventListener("DOMContentLoaded", function () {
  let cartUI = document.querySelector(".cartUI");
  let count = document.querySelector(".count");
  let countVal = Number(count.innerText);

  let allBtns = document.querySelectorAll(".btn");
  let allSelects = document.querySelectorAll(".adet");
  let deleteBtns = document.querySelectorAll(".delete");
  let cartSum = document.querySelector(".toplam");
  let adet = document.querySelector(".adet");
  const applyCart = document.querySelector(".onay");
  const table = document.querySelector("table");

  let cart = [];

  allBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let card = btn.closest(".card");
      let priceText = card.querySelector(".card-price").textContent;
      let title = card.querySelector(".card-title").textContent;
      let priceValue = parseFloat(priceText.slice(1));
      let imgSrc = card.querySelector("img").src;

      let itemValue = e.target.getAttribute("data-set");
      let id = e.target.getAttribute("data-id");
      let data = {
        id: id,
        title: title,
        price: priceValue,
        imgSrc: imgSrc,
        itemValue: itemValue,
      };
      cart.push(data);
      countVal += Number(itemValue);
      count.innerText = countVal;

      let tbody = cartUI.querySelector("tbody");
      let newRow = tbody.insertRow(-1);
      let imgCell = newRow.insertCell(0);
      let titleCell = newRow.insertCell(1);
      let countCell = newRow.insertCell(2);
      let priceCell = newRow.insertCell(3);
      let deleteCell = newRow.insertCell(4);

      let imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = title;
      imgElement.style.height = "50px";
      imgElement.style.width = "50px";

      imgCell.appendChild(imgElement);

      deleteCell.innerHTML = `<i class="fas fa-trash-can text-danger delete"></i>`;
      titleCell.textContent = title;
      countCell.textContent = itemValue;
      priceCell.textContent = "₺" + priceValue * itemValue;

      adet.textContent = cart.length;

      let sum = 0;
      cart.forEach((item) => {
        sum += item.price * item.itemValue;
      });
      cartSum.textContent = ` ₺ ${sum}`;
    });
  });

  allSelects.forEach((selectEl) => {
    selectEl.addEventListener("change", (e) => {
      const selectedValue = e.target.value;
      const btnElement = e.target.nextElementSibling;
      if (btnElement) {
        btnElement.setAttribute("data-set", selectedValue);
      }
    });
  });

  deleteBtns.forEach((deleteBtn, index) => {
    deleteBtn.addEventListener("click", () => {
      cart.splice(index, 1);//splice belirli bir indexteki elamanı siler. ilk değer index ikinci de kac tane silinecek cart =[] yaparsam hepsini silecektir.
      renderCart();
    });
  });

  function renderCart() {
    let tbody = cartUI.querySelector("tbody");
    tbody.innerHTML = "";

    cart.forEach((item) => { //yukarda eklediğimiz her şeyi burada döngüye alıyoruz 
      let newRow = tbody.insertRow(-1);
      let imgCell = newRow.insertCell(0);
      let titleCell = newRow.insertCell(1);
      let countCell = newRow.insertCell(2);
      let priceCell = newRow.insertCell(3);
      let deleteCell = newRow.insertCell(4);

      let imgElement = document.createElement("img");
      imgElement.src = item.imgSrc;
      imgElement.alt = item.title;
      imgElement.style.height = "50px";
      imgElement.style.width = "50px";

      imgCell.appendChild(imgElement);

      deleteCell.innerHTML = `<i class="fas fa-trash-can text-danger delete"></i>`;
      titleCell.textContent = item.title;
      countCell.textContent = item.itemValue;
      priceCell.textContent = "₺" + item.price * item.itemValue;
    });

    adet.textContent = cart.length;

    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.itemValue;
    });
    cartSum.textContent = ` ₺ ${sum}`;
  }

  const shopCartBtn = document.querySelector(".shopcart");

  shopCartBtn.addEventListener("click", () => {
    const currentDisplayStyle = window.getComputedStyle(table).display;
    table.style.display = currentDisplayStyle === "none" ? "block" : "none";
  });
});
