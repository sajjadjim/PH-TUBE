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
                                    <p>${video.authors[0].profile_name} <i
                                            class="fa-solid fa-certificate text-blue-600"></i></p>
                                    <p class="text-[#171717B3]">${video.others.views} views</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="btn btn-block">Show Details</button>
            </div>
    `
    addVideoWebsite.append(videoCard)
});
}

