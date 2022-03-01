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
    let searchBox = document.getElementById("search-box").value;
    searchBox = "";
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    data.slice(0, 20).forEach(element => {
        // console.log(element);
        const card = document.createElement("div");
        card.classList.add("col");
        card.classList.add("shadow");
        card.classList.add("bg-body");
        card.classList.add("rounded");
        card.innerHTML = `
        <div class="card h-100">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title text-success">${element.brand}</h3>
                <h5 class="card-title text-success">${element.phone_name}</h5>
            </div>
            <div class="card-footer">
                <button id="details-btn" type="button"
                    class="btn btn-outline-success bg-success text-white fw-bold w-100">Details</button>
            </div>
        </div>
        `
        searchResult.appendChild(card);
    });

}