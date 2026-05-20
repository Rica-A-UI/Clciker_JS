const clicker = document.getElementById("click")
const cards = document.getElementById("cards")
const score = document.getElementById("score")
const assend_btn = document.getElementById("assend_btn")
const main_game = document.getElementById("main_game")
const assend = document.getElementById("assend")

let counter = 0
let click_power = 1
let afk = 0
let assend_status = false
let starter_assend_value = 1000000

let upgrades = [
    {
        name: "1",
        image: "",
        cost: 10,
        value: 1,
        type: "click",
    },
    {
        name: "2",
        image: "",
        cost: 100,
        value: 1,
        type: "auto",
    },
    {
        name: "3",
        image: "",
        cost: 50,
        value: 5,
        type: "click",
    },
    {
        name: "4",
        image: "",
        cost: 500,
        value: 5,
        type: "auto",
    },
    {
        name: "5",
        image: "",
        cost: 1000,
        value: 10,
        type: "click",
    },
    {
        name: "6",
        image: "",
        cost: 5000,
        value: 10,
        type: "auto",
    },
    {
        name: "7",
        image: "",
        cost: 10000,
        value: 15,
        type: "click",
    },
    {
        name: "5",
        image: "",
        cost: 50000,
        value: 15,
        type: "auto",
    },
]

function upgrades_update () {
    cards.innerHTML = ''
    upgrades.forEach((upgrade, i) => {
    const cardHTML = `
        <div class="upgrade_card">
            <h1>${upgrade.name}</h1>
            <img src="${upgrade.image}" alt="${upgrade.name}">
            <button onclick="buyUpgrade(${i}, event)">Cost: $${upgrade.cost}</button>
        </div>
    `
    if (upgrade.cost <= counter) {
        cards.innerHTML += cardHTML
    } 
})
}

function buyUpgrade(i, event) {
    const item = upgrades[i]
    const button = event.target

    if (counter >= item.cost) {
        counter -= item.cost
        item.cost = Math.round(item.cost*1.5)

        if (item.type === "click") {
            click_power += item.value
        } else if (item.type === "auto") {
            afk += item.value
        }
        score.innerText = Math.floor(counter)
        button.innerHTML = `Cost: $${item.cost}`
        upgrades_update()
    } else {
        button.classList.add('error')
        setTimeout(() => {
            button.classList.remove('error')
        }, 150);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    score.innerText = Math.floor(counter) 
    upgrades_update()
    if (assend_status==false) {
    assend.style.display = "none"
    main_game.style.display = "block"
    } else {
        assend.style.display = "block"
        main_game.style.display = "none"
    }
})

clicker.addEventListener("click", (event) => {
    const floating_num = document.createElement("div")
    counter = click_power + counter
    clicker.style.transform = "scale(0.95)"
    setTimeout(() => {
        clicker.style.transform = "scale(1)"
    }, 50)
    floating_num.classList.add("floating_num")
    floating_num.innerText = `+${click_power}`
    floating_num.style.left = `${event.clientX-Math.random()*20}px`
    floating_num.style.top = `${event.clientY-Math.random()*10}px`
    document.body.appendChild(floating_num)
    setTimeout(() => {
        floating_num.remove()
    }, 500)
    upgrades_update()
    score.innerText = Math.floor(counter)
})

assend_btn.addEventListener("click", () => {
    if (counter == starter_assend_value) {
        assend.style.display = "block"
        main_game.style.display = "none"
    } else {
        assend_btn.classList.add('error')
        setTimeout(() => {
            assend_btn.classList.remove('error')
        }, 150);
    }
})

setInterval(() => {
    if (afk > 0) {
        counter += afk
        const spawn = score.getBoundingClientRect()
        const floating_down = document.createElement("div")
        floating_down.classList.add("floating_down")
        floating_down.innerText = `+${afk}`
        floating_down.style.left = `${spawn.left+(Math.random()-0.5)*spawn.width}px`
        floating_down.style.top = `${spawn.bottom}px`
        document.body.appendChild(floating_down)
        setTimeout(() => {
            floating_down.remove()
        }, 500)
        score.innerText = Math.floor(counter)
        upgrades_update()
    }
}, 1000)