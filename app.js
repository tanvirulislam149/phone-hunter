document.getElementById("search-btn").addEventListener("click", function () {
    loadData();
})
const loadData = () => {
    const searchBox = document.getElementById("search-box").value;
    if (searchBox === "") {

    }
    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchBox}`)
            .then(response => response.json())
            .then(data => displayData(data.data))
    }
}
const displayData = (data) => {
    const detailsContainer = document.getElementById("details");
    detailsContainer.textContent = "";
    let searchBox = document.getElementById("search-box").value;
    searchBox = "";
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    const noResultContainer = document.getElementById("no-result-container");
    noResultContainer.textContent = "";
    if (data.length === 0) {
        const noResult = document.createElement("div");
        noResult.classList.add("fs-3");
        noResult.classList.add("fw-bold");
        noResult.classList.add("text-center");
        noResult.classList.add("my-5");
        noResult.innerHTML = `
            <h1>Sorry!!!There is no phone with this name </h1>
        `
        noResultContainer.appendChild(noResult);
    }
    else {
        data.slice(0, 20).forEach(element => {
            // console.log(element);
            const card = document.createElement("div");
            card.classList.add("col");
            card.innerHTML = `
            <div class="card h-100">
                <img src="${element.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-success">${element.brand}</h3>
                    <h5 class="card-title text-success">${element.phone_name}</h5>
                </div>
                <div class="card-footer">
                    <button onclick="detailsData('${element.slug}')" id="details-btn" type="button"
                        class="btn btn-outline-success bg-success text-white fw-bold w-100">Details</button>
                </div>
            </div>
            `
            searchResult.appendChild(card);
        });
    }
}
const detailsData = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(response => response.json())
        .then(data => displayDetails(data.data))
}
const displayDetails = (data) => {
    console.log(data);
    const detailsContainer = document.getElementById("details");
    detailsContainer.textContent = "";
    detailsContainer.innerHTML = `
        <div class="card mb-5" style="width: 18rem;">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title fs-6 fw-bold"> Name: </h5>
                <p> ${data.name}</p>
                <h5 class="card-title fs-6 fw-bold">Release Date: </h5>
                <p> ${data.releaseDate}</p>
                <h5 class="card-title fs-6 fw-bold"> Chipset: </h5>
                <p> ${data.mainFeatures.chipSet}</p>
                <h5 class="card-title fs-6 fw-bold">Display Size: </h5>
                <p> ${data.mainFeatures.displaySize}</p>
                <h5 class="card-title fs-6 fw-bold">Memory: </h5>
                <p> ${data.mainFeatures.memory}</p>
                <h5 class="card-title fs-6 fw-bold">Sensors: </h5>
                <p> ${data.mainFeatures.sensors}</p>
                <h5 class="card-title fs-6 fw-bold">Storage: </h5>
                <p> ${data.mainFeatures.storage}</p>
                <h5 class="card-title fs-4 fw-bold text-center">Others: </h5>
                <h5 class="card-title fs-6 fw-bold">Bluetooth: </h5>
                <p> ${data.others?.Bluetooth ?? "Nothing Found"}</p>
                <h5 class="card-title fs-6 fw-bold">GPS: </h5>
                <p> ${data.others?.GPS ?? "Nothing Found"}</p>
                <h5 class="card-title fs-6 fw-bold">NFC: </h5>
                <p> ${data.others?.NFC ?? "Nothing Found"}</p>
                <h5 class="card-title fs-6 fw-bold">Radio: </h5>
                <p> ${data.others?.Radio ?? "Nothing Found"}</p>
                <h5 class="card-title fs-6 fw-bold">USB: </h5>
                <p> ${data.others?.USB ?? "Nothing Found"}</p>
                <h5 class="card-title fs-6 fw-bold">WLAN: </h5>
                <p> ${data.others?.WLAN ?? "Nothing Found"}</p>
            </div>
        </div>
    `
}