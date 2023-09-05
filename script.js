const accessKey = //Get API Key from upslash

const formElement = document.querySelector("form")
const inputElement = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const displayButton = document.getElementById("display-button")

let inputData = ""
let page = 1

async function searchImages() {
    inputData = inputElement.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(page === 1) {
        searchResults.innerHTML = ""
    }
    results.map((result) => {
        const imageContainer = document.createElement("div")
        imageContainer.classList.add("search-result")

        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageTagLink = document.createElement("a")
        imageTagLink.href = result.links.html
        imageTagLink.target = "_blank"
        imageTagLink.textContent = result.alt_description

        searchResults.appendChild(imageContainer)
        imageTagLink.appendChild(image)
        imageContainer.appendChild(imageTagLink)
    });

    page++
    if(page > 1) {
        displayButton.style.display = "block"
    }
}

formElement.addEventListener("submit", (event) => {
    event.preventDefault
    page = 1
    searchImages()
})

displayButton.addEventListener("click", ()=> {
    searchImages()
})