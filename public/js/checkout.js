window.onload = () => {
  if (!sessionStorage.user) {
    location.replace("/login");
  }
};

const placeOrder = document.querySelector("#placeOrderBtn");
placeOrder.addEventListener("click", () => {
  let address = getAddress();
  let popsy = document.querySelector("#popsy");
  //send to backend
  if (address) {
    alert("moda");
  }
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
    let popsy = document.querySelector("#popsy");
    popsy.classList.add("open");
    function closePopsy() {
      popsy.classList.remove("open");
    }
  }
};

const showFormError = (err) => {
  let errorElement = document.querySelector(".error");
  errorElement.innerHTML = err;
  errorElement.classList.add("show");
};

const userPlace = document.querySelector("#loginArea");
// const userPlaceMobile = document.querySelector("#userMobile");
const showOptions = document.querySelector(".loginPopUp");
const popUpText = document.querySelector(".accountInfo");
const loginActionBtn = document.querySelector("#userBtn");

userPlace.addEventListener("click", () => {
  showOptions.classList.toggle("hide");
});

window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user != null) {
    //already logged in
    popUpText.innerHTML = `User, <b><i>${user.name}!</i></b>`;
    loginActionBtn.innerHTML = "log out";
    loginActionBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    //user logged out
    popUpText.innerHTML = "Log in to place order";
    loginActionBtn.innerHTML = "Log in";
    loginActionBtn.addEventListener("click", () => {
      location.href = "/login";
    });
  }
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
