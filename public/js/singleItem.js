const imagesOfItems = document.querySelectorAll(".productImages img");
const itemsSlider = document.querySelector(".imageSlider");

let activeSliderImage = 0;

imagesOfItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    imagesOfItems[activeSliderImage].classList.remove("active");
    item.classList.add("active");
    itemsSlider.style.backgroundImage = `url("${item.src}")`;
    activeSliderImage = i;
  });
});

// Selecting sizes

const sizeButtons = document.querySelectorAll(".sizeRadioBtn");
let checkedButton = 0;

sizeButtons.forEach((item, i) => {
  item.addEventListener("click", () => {
    sizeButtons[checkedButton].classList.remove("check");
    item.classList.add("check");
    checkedButton = i;
  });
});

let ratingsInput = [...document.querySelectorAll(".star")];

ratingsInput.map((star, index) => {
  star.addEventListener("click", () => {
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        ratingsInput[i].src = `/img/star-filled.png`;
      } else {
        ratingsInput[i].src = `/img/star.png`;
      }
    }
  });
});
