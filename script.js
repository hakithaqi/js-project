
let allData = []
const htmlLista = document.getElementById("newsList")
const searching = document.getElementById("searching")
const details = document.getElementById("details")

const clearDetailsData = () => {
    details.innerHTML = ""
}


async function api() {
    searching.style.display = 'block'
    const categorySelector = document.getElementById("category")
    htmlLista.innerHTML = ""
    clearDetailsData()
    const response = await axios.get(`https://inshorts.deta.dev/news?category=${categorySelector.value}`)
    allData = response.data.data
    searching.style.display = 'none'


    allData.forEach(element => {
        const li = document.createElement("li")
        const liImg = document.createElement("img")
        liImg.src = element.imageUrl
        const liSpan = document.createElement("span")
        liSpan.innerHTML = element.title
        li.setAttribute('news-id', element.id)
        li.appendChild(liImg)
        li.appendChild(liSpan)
        htmlLista.appendChild(li)
    });
}

htmlLista.addEventListener('click', (event) => {
    const id = event.target.getAttribute('news-id')
    if (id) {
        const found = allData.find((elem) => {
            return elem.id == id
        })

        if (found) {
            clearDetailsData()
            const detailsImg = document.createElement("img")
            const authordatebox = document.createElement("div")
            authordatebox.setAttribute("class", "authorbox")
            const author = document.createElement("div")
            const date = document.createElement("div")
            const content = document.createElement("div")
            const time = document.createElement("div")
            time.setAttribute("class", "timer")
            detailsImg.src = found.imageUrl
            author.innerHTML = found.author
            date.innerHTML = found.date
            content.innerHTML = found.content
            time.innerHTML = found.time
            const clear = document.createElement("span")
            clear.setAttribute("id", "clearDetails")
            clear.innerHTML = "x"
            details.appendChild(clear)
            

            const clearDetails = document.getElementById("clearDetails")

            clearDetails.addEventListener('click', (event) => {
                clearDetailsData()
            })


            details.appendChild(detailsImg)
            authordatebox.appendChild(author)
            authordatebox.appendChild(date)
            details.appendChild(authordatebox)
            details.appendChild(content)
            details.appendChild(time)


        }
    }
})


const searchButton = document.getElementById("search")

searchButton.addEventListener('click', (event) => {
    api()
})

api()