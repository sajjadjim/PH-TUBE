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
    // console.log(categories)\
 const categoryContainer = document.getElementById("category_container");

// loop start here 
for( let categorie of categories){
    // console.log(categorie)
    const newCategoryAdd = document.createElement('div');
    newCategoryAdd.innerHTML =`
    <button class="btn btn-md hover:bg-[#FF1F3D] hover:text-white">${categorie.category}</button>
    `;
    categoryContainer.append(newCategoryAdd);
    
}
}

