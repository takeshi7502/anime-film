let listEp = document.querySelectorAll(".ep_item");
let video = document.querySelector(".anime__video__player");

link = "https://6288a9b610e93797c15d8515.mockapi.io/api/id";

fetch(link)
  .then(function (reponsive) {
    return reponsive.json();
  })
  .then((abcdcsc) => {
    console.log(abcdcsc);
    listVideo = abcdcsc;
    listEp.forEach((item, index) => {
      item.addEventListener("click", function () {
        let epActive = document.querySelector(".ep1");
        epActive.classList.remove("ep1");
        item.classList.add("ep1");
        video.innerHTML = listVideo[index].link;
      });
    });
  });
