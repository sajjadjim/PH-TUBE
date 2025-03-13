const loadVideo = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then((data) => showVideo(data.videos))
}
loadVideo()

function showVideo (videos){
const addVideoWebsite = document.getElementById('video-container')
//  console.log(data)
videos.forEach((video) => {
     console.log(video)

    // video card create one 
    const videoCard = document.createElement('div');
    videoCard.innerHTML= `
               <div class="card bg-base-100  shadow-sm">
                <figure>
                    <img  class="w-[400px] h-[240px]"
                        src="${video.thumbnail}" />
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
            </div>
    `
    addVideoWebsite.append(videoCard)
});
}

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }