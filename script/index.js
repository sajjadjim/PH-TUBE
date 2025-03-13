//Remove button 
function removeActiveButton() {
    const removeActive = document.getElementsByClassName("active")
    for(let removeBTN of removeActive){
        removeBTN.classList.remove("active");
    }
}
//  Load Date Function Create Here 
const LoadData = () =>{
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then((data) => displayCategories(data.categories));
}
// load Function call here 
LoadData()
function displayCategories (categories){
    // console.log(categories)
 const categoryContainer = document.getElementById("category_container");

// loop start here 
for( let categorie of categories){
    // console.log(categorie)
    const newCategoryAdd = document.createElement('div');
    newCategoryAdd.innerHTML =`
    <button id="btn-${categorie.category_id}" onclick="loadCategoriesVideos(${categorie.category_id})" class="btn btn-md hover:bg-[#FF1F3D] hover:text-white">${categorie.category}</button>
    `;
    categoryContainer.append(newCategoryAdd);
    
}
}
// category wise video id send 
const loadCategoriesVideos = (id) => {
    const url =`
    https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then((date) =>{  
        removeActiveButton()
        // get Button By id Code  and add a new class by add by press key
        const clickButtonId = document.getElementById(`btn-${id}`);
        // console.log(getButtonId)
        clickButtonId.classList.add("active")
        showVideo(date.category);
        
    });
};


// video Details show here 
const loadVideoDetails =(videoId) =>{
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
    .then(res => res.json())
    .then((data) => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) =>{
console.log(video)
document.getElementById('video_details').showModal()
const detailsContainer = document.getElementById('details_container_modal')
detailsContainer.innerHTML =`
    <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <div class="card bg-base-100 image-full w-96 shadow-sm">
    <img class="w-full h-[230px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h3 class="text-lg font-bold">${video.title}</h3>
<p class="py-1"><span class="font-semibold">Author:</span> ${video.authors[0].profile_name}</p>
<p class="py-1">Views: ${video.others.views}</p
    <p class="py-1">Post Date: ${video.others.posted_date}</p>
    <p class=" text-md"> <span class="font-semibold">Description:</span> ${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
  <figure>
`
}


// {
//     "status": true,
//     "message": "Successfully fetched the video with video id 'aaac'",
//     "video": {
//     "category_id": "1003",
//     "video_id": "aaac",
//     "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
//     "title": "Laugh at My Pain",
//     "authors": [
//     {
//     "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
//     "profile_name": "Kevin Hart",
//     "verified": false
//     }
//     ],
//     "others": {
//     "views": "1.1K",
//     "posted_date": "13885"
//     },
//     "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
//     }
//     }
//Load Video javScript Part start From here -------------------------------------//
//------------------------------------------------------------------------------//
const loadVideo = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then((data) => {
        removeActiveButton()
        showVideo(data.videos)
        document.getElementById('btn-all').classList.add('active')
    }

)
}

function showVideo (videos){
const addVideoWebsite = document.getElementById('video-container')
// 
// Before Date empty from the webpage  //
//
addVideoWebsite.innerHTML = "";

//  console.log(data)
if(videos.length == 0){
const noVideo = document.getElementById('noVideoWebsite')
noVideo.style.display = "none"
    addVideoWebsite.innerHTML =`
    <div class="flex flex-col justify-center items-center py-20 gap-10 col-span-full">
                    <img class="w-[150px]" src="assets/Icon.png" alt="">
                    <p class="text-[25px] font-semibold text-center">Oops!! Sorry, There is no <br> content here</p>
                </div>
    `;
        return ;
    }
videos.forEach((video) => {
    //  console.log(video)

    // video card create one 
    const videoCard = document.createElement('div');
    videoCard.innerHTML= `
               <div class="card bg-base-100  shadow-sm">
                <figure class="relative">
                    <img  class="w-full h-[230px] object-cover"
                        src="${video.thumbnail}" />
                     <span class="absolute bottom-2 right-5 text-sm bg-white rounded-sm px-2">1hrs 20 min ago</span> 
                </figure>
                
                <div class="my-5">
                    <div>
                        <div class="flex gap-2 ml-3">
                            <p><img class="rounded-full w-11 h-11"
                                    src="${video.authors[0].profile_picture}"
                                    alt></p>
                            <div>
                                <p class="text-black font-semibold text-[16px]">
                                   ${video.title} </p>
                                <div
                                    class="card-actions justify-start grid grid-cols-1 mt-1">
                                    <p>${video.authors[0].profile_name} 
                                    ${video.authors[0].verified == true ? `<i class="fa-solid fa-certificate text-blue-600"></i>` : ` `}
                                    </p>
                                    <p class="text-[#171717B3]">${video.others.views} views</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
            </div>
    `
    addVideoWebsite.append(videoCard)
});
}

  