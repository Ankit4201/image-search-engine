const accessKey = "xII37OaFhH0zfOrV75dlEM0JIrkyog2fMWXOhxf3Pww";

const searchForm = document.querySelector('#search-form');
const searchBox = document.querySelector('#search-box');
const searchResult = document.querySelector('#search-result');
const showMoreBtn = document.querySelector('#show-more-btn');




let keyword = "";
let page = 1;
async function searchImages(){
  keyword = searchBox.value;
  const url =`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch (url,{
    method : 'GET',
  });
  const data = await response.json();
  if(page === 1){
    searchResult.innerHTML = "";
  }
  if(data && data.results){
    displayImages(data.results);

  }
  console.log(data);
}

searchForm.addEventListener("submit",(e)=>{
  e.preventDefault();
  page = 1;
  searchImages();
})

function displayImages(results){
   results.map((result)=>{
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  }).join(" ");
  showMoreBtn.style.display = "block";
}

showMoreBtn.addEventListener('click', ()=>{
   page++;
   searchImages();
})