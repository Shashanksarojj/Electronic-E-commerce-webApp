
  let products = JSON.parse(localStorage.getItem("cart"));

  function appendData(data) {
    let totalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      totalPrice += data[i].price * data[i].qty;
    }
    document.getElementById("cart-total").innerText = totalPrice;
    document.getElementById("cart-container").innerHTML = "";

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
      let inc = document.createElement("button");
      inc.innerText = "+";
      inc.addEventListener("click", () => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === el.id) {
            products[i].qty++;
            console.log(products[i]);
          }
        }
        localStorage.setItem("cart", JSON.stringify(products));
        appendData(products);

      })
      let span = document.createElement("span");
      span.innerText = el.qty;
      let dec = document.createElement("button");
      dec.innerText = "-";
      dec.addEventListener("click", () => {
        for (let i = 0; i < products.length; i++) {
          if (products[i].id === el.id) {
            products[i].qty--;
            console.log(products[i]);
          }
        }
        localStorage.setItem("cart", JSON.stringify(products));
        appendData(products);

      })

      let removeBtn = document.createElement("button");
      removeBtn.innerText = "Remove";
      removeBtn.addEventListener("click", () => {
        data = data.filter((element, i) => {
          return i !== index
        })
        localStorage.setItem("cart", JSON.stringify(data));
        appendData(data);
      })

      child.append(img, brand, price, desc, category, inc, span, dec, removeBtn);
      document.getElementById("cart-container").append(child);
    });

  }

  appendData(products);