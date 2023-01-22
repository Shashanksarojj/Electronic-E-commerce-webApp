let products = JSON.parse(localStorage.getItem("cart")) || [];

let searchForm = document.querySelector("form");

let allData = [];

function getData() {

  fetch("./products_data/product.json")
    .then((res) => {
      return res.json();

    }).then((res) => {
      console.log(res.data);
      allData = [...res.data];
      console.log("allData:", allData)
      appendData(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
}

function appendData(data) {
  document.getElementById("product-container").innerHTML = "";

  data.forEach((el, index) => {
    let child = document.createElement("div");
    let img = document.createElement("img");
    img.src = el.img;
    let brand = document.createElement("h2");
    brand.innerText = el.brand;
    let price = document.createElement("h3");
    price.innerText = `₹${el.price}`;
    let desc = document.createElement("p");
    desc.innerText = el.details;
    let category = document.createElement("p");
    category.innerText = el.category;
    let btn = document.createElement("button");
    btn.innerText = "Add To Cart";
    btn.addEventListener("click", () => {
      let flag = false;
      for (let i = 0; i < products.length; i++) {
        if (products[i].id === el.id) {
          flag = true;
        }
      }
      if (flag === false) {
        let payload = { ...el, qty: 1 }
        products.push(payload);
        localStorage.setItem("cart", JSON.stringify(products));
        alert("Product Added To Cart");
      } else {
        alert("Product Already in Cart");
      }
    })

    child.append(img, brand, price, desc, category, btn);
    document.getElementById("product-container").append(child);
  });

}



// document.getElementById("filter").addEventListener("change", async (e) => {

//   let filterBy = e.target.value;

//   // if(filterBy == ""){
//   //   return appendData(arr);
//   // }else{
//   //   let arr = allData.filter((el, index) => {
//   //   return el.category === filterBy;
//   // })
//   // }


//   let arr = allData.filter((el, index) => {
//     return el.category === filterBy;
//   })

//   appendData(arr);
// })

getData();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchParams = searchForm.search.value;

  let filtered = allData.filter((element) => {
    if (
      element.category.toUpperCase().includes(searchParams.toUpperCase()) ===
      true
    ) {
      return true;
    } else {
      return false;
    }
  });
  appendData(filtered);
});

