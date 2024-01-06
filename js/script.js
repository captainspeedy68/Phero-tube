let categories = [];

const loadTube = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    categories = data.data;
    displayCategories(categories);
}
loadTube();

function displayCategories(categories) {
    const btnContainer = document.getElementById("btn-container");

    categories.forEach(category => {
        const btn = document.createElement("div");
        btn.innerHTML = `
        <button onclick="btnClicked(${category.category_id})" class="btn btn-error text-white bg-[#FF1F3D]">${category.category}</button>
        `
        btnContainer.appendChild(btn);
    });
}

// loadTube();

const btnClicked = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    categories = data.data;
    // console.log(categories)
    display(categories);
}

function display(categories) {
    

    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";
    if(categories.length === 0){
        cardContainer.classList = "flex justify-center";
        const noContent = document.createElement("div");
        noContent.innerHTML = `
        <div class="no-content gap-10">
            <img src="images/Icon.png" alt="">
            <h1 class="text-center text-3xl font-bold">Oops!! Sorry, There is no content here</h1>
        </div>
        `;
        
        cardContainer.appendChild(noContent);

    }
    else cardContainer.classList = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10";
    categories.forEach(category => {
        const card = document.createElement("div");
        card.classList = "card card-compact bg-base-100 mx-5";
        card.innerHTML = `
            <figure id = "upload-section" class="flex flex-col">
                <div class="">
                    <img src="${category.thumbnail}" alt="Shoes" class="image" />
                </div>
            </figure>

            <div class="card-body gap-5 flex flex-row p-0 ">
                <div class= "justify-center align-middle gap-3 h-auto">
                    <div class = "align-middle flex gap-3"> 
                        <div class="w-2/12 h-full rounded">
                        <img class = "rounded-full" src="${category.authors[0].profile_picture}" />
                        </div>
                        <h2 class="card-title justify-center align-middle">${category.title}</h2>
                    </div>
                    <div class= "mx-14">
                        <div id="profile-container" class= "flex">
                            <p>${category.authors[0].profile_name}</p>
                        </div>
                        <p>${category.others.views} views</p>
                        
                    </div>
                </div>
            </div>
        `;
        if (category.others.posted_date.length > 0){
            const minutes = parseFloat(category.others.posted_date) / 60;
            const flooredminutes = Math.floor(minutes);
            // console.log(flooredminutes);
            const hrs = flooredminutes / 60;
            let flooredHrs = Math.floor(hrs);
            const minLeft = (hrs - flooredHrs) * 60;
            // if (flooredHrs >= 24) {
            //     flooredHrs /= 24;

            // }
                
            const finalOut = flooredHrs.toFixed(0) + " hrs " + minLeft.toFixed(0) + " mins ago"
            // console.log(flooredHrs + " hrs " + minLeft.toFixed(0) + " mins ");
            const uploadTime = document.createElement("div");
            uploadTime.classList = "btn btn-xs p-0 py-0 min-h-0 h-auto lowercase sm:btn-sm md:btn-md lg:btn-lg bg-black text-white  text-sm relative border-none left-20 bottom-7";
            uploadTime.innerText = finalOut;
            const uploadSection = card.querySelector("#upload-section");
            uploadSection.appendChild(uploadTime);
            // console.log(hrs);
        }

        if (category.authors[0].verified) {
            const img = document.createElement("img");
            img.src = "images/fi_10629607.svg";
            
            const profileContainer = card.querySelector("#profile-container");
            
            profileContainer.appendChild(img);
        }
        
        cardContainer.appendChild(card);
    })
}
function sortByViews() {
    categories.sort((a, b) => {
        const viewsA = parseInt(a.others.views);
        const viewsB = parseInt(b.others.views);
        return viewsB - viewsA;
    });

    // console.log(categories);
    display(categories);
}