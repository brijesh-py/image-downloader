const imageSearchBtn = document.querySelector("form");
const imageContainer = document.querySelector(".image-container");

// download image btn
const imageDownloadBtn = () => {
  let btn = document.querySelector(
    ".image-container > div .model .download-btn"
  );
  btn.addEventListener("click", () => {
    image = btn.parentElement.parentElement.querySelector(".image");
    let downloadImage = document.createElement("a");
    downloadImage.href = image.src;
    downloadImage.download = image.alt;
    downloadImage.click();
  });
};

const imageDeleteBtn = () => {
  let btn = document.querySelector(
    ".image-container > div .model .remove-btn"
  );
  btn.addEventListener("click", () => {
    imageContainer.removeChild(btn.parentElement.parentElement.parentElement);
  });
};

// image preview
const images = (imageSrc, imageAlt) => {
  const imagStyleClasses = "img-fluid shadow image";
  const image = `<div class='rounded shadow image__parent p-1 bg-dark'>
      <img class='${imagStyleClasses}' src='${imageSrc}' alt='${imageAlt}' />
      <div class='model btn-group'>
        <button class='btn btn-success btn-sm download-btn'>Download</button>
        <button class='btn btn-danger btn-sm remove-btn'>Remove</button>
      </div>
      </div>
  `;
  return image;
};

// image search btn
imageSearchBtn.addEventListener("submit", (e) => {
  e.preventDefault()
  let searchImageInput = document.querySelector(".search");
  if (searchImageInput.value) {
    url = `https://source.unsplash.com/featured/2000x1350?${searchImageInput.value}`;
    const tempQuery = searchImageInput.value;
    searchImageInput.value = null;
    let imagePreviewContainer = document.createElement("div");
    imagePreviewContainer.setAttribute("class", "col p-2");
    imageContainer.prepend(imagePreviewContainer);
    imagePreviewContainer.innerHTML = images("./assets/loading.jpg", tempQuery);
    imageDownloadBtn();
    imageDeleteBtn();
    fetch(url)
      .then((res) => res.blob())
      .then((response) => {
        newUrl = window.URL.createObjectURL(response);
        imagePreviewContainer.querySelector(".image").src = newUrl;
      });
  }
});
