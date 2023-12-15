const imageSearchBtn = document.querySelector(".btn");
const imageDownloadBtn = document.querySelector(".download-btn");
const previewImage = document.querySelector(".img-fluid");

// image search btn
imageSearchBtn.addEventListener("click", () => {
  let searchImageInput = document.querySelector(".search");
  if (searchImageInput.value) {
    url = `https://source.unsplash.com/featured/2000x1350?${searchImageInput.value}`;
    searchImageInput.value = null;
    if(navigator.onLine){
      previewImage.src = "./assets/loading.jpg";
    fetch(url)
    .then((res) => res.blob())
    .then((response) => {
      let newUrl = window.URL.createObjectURL(response);
      setTimeout(() => {
        previewImage.src = newUrl;
      }, Math.floor(Math.random()*3))
    })
  }else{
    previewImage.src = "./assets/error.png"
  }
  }
});

imageDownloadBtn.addEventListener("click", () => {
  let url = previewImage.src;
  if(navigator.onLine){
  fetch(url)
    .then((res) => res.blob())
    .then((response) => {
      let newUrl = window.URL.createObjectURL(response);
      let anchor = document.createElement("a");
      document.body.appendChild(anchor);
      anchor.href = newUrl;
      anchor.download = new URL(url).search.slice(1,);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(response);
    });
  }else{
    previewImage.src = "./assets/error.png"
  }
});
