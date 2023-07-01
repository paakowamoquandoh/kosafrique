const placeOrder = document.querySelector("#placeOrderBtn");
placeOrder.addEventListener("click", () => {
  let address = getAddress();
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      item: [{ id: 1, quantity: 2 }],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((e) => {
      console.error(e.error);
    });
});

const getAddress = () => {
  //validate
  let address = document.querySelector("#address").value;
  let street = document.querySelector("#street").value;
  let city = document.querySelector("#city").value;
  let state = document.querySelector("#state").value;
  let zipcode = document.querySelector("#zipcode").value;
  let landmark = document.querySelector("#landmark").value;

  if (
    !address.length ||
    !street.length ||
    !city.length ||
    !state.length ||
    !zipcode.length ||
    !landmark.length
  ) {
    return showFormError("fill all inputs first");
  } else {
    return { address, street, city, state, zipcode, landmark };
  }
};

const showFormError = (err) => {
  let errorElement = document.querySelector(".error");
  errorElement.innerHTML = err;
  errorElement.classList.add("show");
};

const mobileMenu = document.getElementById("mobileMenu");
const navMenuItems = document.getElementById("navItems");
const navMenuClose = document.getElementById("mobileMenuClose");
const shopICon = document.querySelector(".mobileNav");
const shopBagde = document.querySelector(".cartBox");
const secondNav = document.querySelector(".secondHeader");
const logo = document.querySelector(".mobileLogo");

// Mobile and Tablet NAvbar implementation//
if (mobileMenu) {
  mobileMenu.addEventListener("click", () => {
    navMenuItems.classList.add("active");
    logo.classList.remove("hide");
    navMenuClose.style.display = "flex";
    mobileMenu.style.display = "none";
    shopICon.style.display = "none";
    shopBagde.style.display = "none";
  });
}

if (navMenuClose) {
  navMenuClose.addEventListener("click", () => {
    navMenuItems.classList.remove("active");
    mobileMenu.style.display = "flex";
    shopICon.style.display = "flex";
    logo.classList.add("hide");
  });
}

// else {
//   let popsy = document.querySelector("#popsy");
//   popsy.classList.add("open");
//   function closePopsy() {
//     popsy.classList.remove("open");
//   }
// }
