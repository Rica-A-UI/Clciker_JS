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

let upgrades = [
    {
        name: "Papildus darbarīks",
        image: "https://th.bing.com/th/id/OIP.EGeDo7TK7J_qRSbJHJM4TAHaEP?w=283&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        cost: 5,
        value: 1,
        type: "click",
    },
    {
        name: "Automātiskā lauksaimniecība",
        image: "https://tse4.mm.bing.net/th/id/OIP.oqXiyrYVrHJBBh70e9cm7gHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
        cost: 20,
        value: 4,
        type: "auto",
    },
    {
        name: "Traktors",
        image: "https://th.bing.com/th/id/OIP.WPi0Bq9hdNsP9gc1433H6gHaEK?w=317&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
        cost: 100,
        value: 20,
        type: "click",
    },
    {
        name: "Labs politiķis",
        image: "https://th.bing.com/th/id/OIP.M-9NfKx7tC_3T7H9fkeaewHaJS?w=186&h=233&c=7&r=0&o=7&pid=1.7&rm=3",
        cost: 200,
        value: 40,
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
    cards.innerHTML += cardHTML
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
    score.innerHTML = counter
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
    score.innerText = Math.floor(counter)
})

assend_btn.addEventListener("click", () => {
    if (counter == 1000000) {
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
        score.innerHTML = Math.floor(counter)
    }
}, 1000)