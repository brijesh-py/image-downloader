  // Wrap your code in a function to avoid global variables
(function () {
  const imageSearchBtn = document.querySelector("form");
  const imageContainer = document.querySelector(".image-container");

  // Query selectors for download and delete buttons
  const downloadBtnSelector = ".image-container > div .model .download-btn";
  const deleteBtnSelector = ".image-container > div .model .remove-btn";

  const imageDownloadBtn = () => {
    let btn = document.querySelector(downloadBtnSelector);
    btn.addEventListener("click", () => {
      const image = btn.parentElement.parentElement.querySelector(".image");
      downloadImage(image.src, image.alt);
    });
  };

  const imageDeleteBtn = () => {
    let btn = document.querySelector(deleteBtnSelector);
    btn.addEventListener("click", () => {
      imageContainer.removeChild(
        btn.parentElement.parentElement.parentElement
      );
    });
  };

  const downloadImage = (src, alt) => {
    let downloadImage = document.createElement("a");
    downloadImage.href = src;
    downloadImage.download = alt;
    downloadImage.click();
  };

  const createImagePreview = (src, alt) => {
    const imagStyleClasses = "img-fluid shadow image";
    return `<div class='rounded shadow image__parent p-1 bg-dark'>
      <img class='${imagStyleClasses}' src='${src}' alt='${alt}' />
      <div class='model btn-group'>
        <button class='btn btn-success btn-sm download-btn'>Download</button>
        <button class='btn btn-danger btn-sm remove-btn'>Remove</button>
      </div>
    </div>`;
  };

  const handleImageSearch = (e) => {
    e.preventDefault();
    let searchImageInput = document.querySelector(".search");
    if (searchImageInput.value) {
      const tempQuery = searchImageInput.value;
      searchImageInput.value = null;
      let imagePreviewContainer = document.createElement("div");
      imagePreviewContainer.setAttribute("class", "col p-2");
      imageContainer.prepend(imagePreviewContainer);
      imagePreviewContainer.innerHTML = createImagePreview(
        "./assets/loading.jpg",
        tempQuery
      );
      imageDownloadBtn();
      imageDeleteBtn();
      fetch(`https://source.unsplash.com/featured/2000x1350?${tempQuery}`)
        .then((res) => res.blob())
        .then((response) => {
          const newUrl = window.URL.createObjectURL(response);
          imagePreviewContainer.querySelector(".image").src = newUrl;
        });
    }
  };

  // Set up event listener
  imageSearchBtn.addEventListener("submit", handleImageSearch);
})();
