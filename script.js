const clicker = document.getElementById("click")
const cards = document.getElementById("cards")
const score = document.getElementById("score")
const manual_click = document.getElementById("click_power")
const auto_click = document.getElementById("afk")

let counter = 0
let click_power = 1
let afk = 0

let upgrades = [
    {
        name: "Papildus darbarīks",
        image: "https://th.bing.com/th/id/OIP.EGeDo7TK7J_qRSbJHJM4TAHaEP?w=283&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        cost: "5",
        value: 1,
        type: "click",
    },
    {
        name: "Automātiskā lauksaimniecība",
        image: "https://tse4.mm.bing.net/th/id/OIP.oqXiyrYVrHJBBh70e9cm7gHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
        cost: "20",
        value: 4,
        type: "auto",
    },
    {
        name: "Traktors",
        image: "https://th.bing.com/th/id/OIP.WPi0Bq9hdNsP9gc1433H6gHaEK?w=317&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        cost: "100",
        value: 20,
        type: "click",
    },
    {
        name: "Labs politiķis",
        image: "https://th.bing.com/th/id/OIP.M-9NfKx7tC_3T7H9fkeaewHaJS?w=186&h=233&c=7&r=0&o=7&pid=1.7&rm=3",
        cost: "200",
        value: 40,
        type: "auto",
    },
]

document.addEventListener("DOMContentLoaded", () => {
    updateUI() 
    upgrades_update()
})

function upgrades_update () {
    cards.innerHTML = ''
    upgrades.forEach((upgrade, index) => {
    const cardHTML = `
        <div class="upgrade_card">
            <h1>${upgrade.name}</h1>
            <img src="${upgrade.image}" alt="${upgrade.name}">
            <button onclick="buyUpgrade(${index})">Cost: $${upgrade.cost}</button>
        </div>
    `
    cards.innerHTML += cardHTML
})
}

function updateUI() {
    score.innerText = Math.floor(counter)
    manual_click.innerText = `Click power: ${click_power}`
    auto_click.innerText = `Afk power: ${afk}`
}


clicker.addEventListener("click", () => {
    counter = click_power + counter
    score.innerHTML = counter
    clicker.style.transform = "scale(0.95)"
    setTimeout(() => {
        clicker.style.transform = "scale(1)"
    }, 50)
    updateUI()

})

setInterval(() => {
    if (afk > 0) {
        counter += afk
        score.innerHTML = counter
    }
}, 1000)

function buyUpgrade(index) {
    const item = upgrades[index]
    const button = event.target

    if (counter >= item.cost) {
        counter -= item.cost
        item.cost = Math.round(item.cost*1.2)

        if (item.type === "click") {
            click_power += item.value
        } else if (item.type === "auto") {
            afk += item.value
        }
        updateUI()
        button.innerHTML = `Cost: $${item.cost}`
    } else {
        button.classList.add('error')
        setTimeout(() => {
            button.classList.remove('error')
        }, 150);
    }
}