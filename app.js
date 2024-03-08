let cartUI = document.querySelector(".cartUI");
console.log(cartUI);
let count = document.querySelector(".count");
let countVal = Number(count.innerText);

let allBtns = document.querySelectorAll(".btn");

console.log(allBtns);
let allSelects = document.querySelectorAll(".adet");

//Sepet son hali onay, toplam ürün, toplam fiyat ve silme butonu
let deleteBtns = document.querySelectorAll(".delete");

let cartSum = document.querySelector(".toplam");

let sepet = document.querySelector(".sepet");

let adet = document.querySelector(".adet");

const applyCart = document.querySelector(".onay");

const table = document.getElementsByName("table");//sepete tıklanınca table açılıp kapanması event ı ekleyebiliriz



//! const shopCartBtn = document.querySelector(".shopcart");
// console.log(shopCartBtn);


const shopCartBtn = document.querySelector(".shopcart");


shopCartBtn.addEventListener("click", () => {
  const currentDisplayStyle = window.getComputedStyle(table).display;
  table.style.display = currentDisplayStyle === "none" ? "block" : "none";
});


let cart = [];

allBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    


    let card = btn.closest(".card"); //kendi parentını buluyor
    let priceText = card.querySelector(".card-price").textContent; // fiyatını bulup içeriğini alıyor
    let title = card.querySelector(".card-title").textContent; //ürün ismini alıyor
    let priceValue = parseFloat(priceText.slice(1)); //priceText; //fiyatı sayıya çeviriyor
    let imgSrc = card.querySelector("img").src; //resmi alıyor

    // console.log(title, priceValue, imgSrc);
    let itemValue = e.target.getAttribute("data-set"); // buy butonuna her basıldığında 1 tane sepete eklemek icin
    let id = e.target.getAttribute("data-id");
    let data = {
      id: id,
      title: title,
      price: priceValue,
      imgSrc: imgSrc,
      itemValue: itemValue,
    };
    cart.push(data); //başlangıçta oluşturduğumuz diziye data objesini ekliyoruz
    countVal += Number(itemValue);
    count.innerText = countVal;

    // ----
    let tbody = cartUI.querySelector("tbody");
    let newRow = tbody.insertRow(-1); //içeriklerin en altına ekleme
    let imgCell = newRow.insertCell(0); //ihtiyacımız olan hücreleri oluşturuyoruz. başlıktakilere uygun yerleştiriyoruz.
    let titleCell = newRow.insertCell(1);
    let countCell = newRow.insertCell(2);
    let priceCell = newRow.insertCell(3);
    let deleteCell = newRow.insertCell(4);

    let imgElement = document.createElement("img"); //
    imgElement.src = imgSrc;
    imgElement.alt = title;
    imgElement.style.height = "50px";
    imgElement.style.width = "50px";

    imgCell.appendChild(imgElement);

    deleteCell.innerHTML = `<i class="fas fa-trash-can text-danger delete"></i>`;
    titleCell.textContent = title;
    countCell.textContent = itemValue;
    priceCell.textContent = "₺" + priceValue * itemValue;

    // adet toplamı

    adet.textContent = cart.length;

    //sepet toplamı
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.itemValue;
    });
    cartSum.textContent = ` ₺ ${sum}`;

    
  });
});

allSelects.forEach((selectEl) => {
  //kaç tane seçersek o kadar eklenmesi için select içinde forEach ile tüm selectleri döngüye alıyoruz
  selectEl.addEventListener("change", (e) => {
    const selectedValue = e.target.value;
    const btnElement = e.target.nextElementSibling;
    if (btnElement) {
      // eğer btnElement true ise yani change olduysa nextSiblinge data set olarak bunu atıyoruz. yani seçilen degerin data set ine ki buy yaptığımızda bu data set i göndersin.
      btnElement.setAttribute("data-set", selectedValue);
    }
  });
});

//  //sepet toplamı
//  let sepetToplam = "0";
//  cart.forEach((item) => {
//    sepetToplam += item.itemValue;
//  });
//  sepet.textContent = `Cart: ${sepetToplam}`


//silme butonu
