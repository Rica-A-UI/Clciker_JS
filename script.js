const clicker = document.getElementById("click")
const cards = document.getElementById("cards")
const score = document.getElementById("score")
const assend_btn = document.getElementById("assend_btn")
const main_game = document.getElementById("main_game")
const assend = document.getElementById("assend")
const man_img = document.getElementById("man")
const fish_hp = document.getElementById("fish_hp")
const clicker_div = document.getElementsByClassName("not_srolable")[0]
const upgrades_div = document.getElementsByClassName("upgrades")[0]
const mini_game_div = document.getElementsByClassName("mini_game")[0]

let mini_game_active = false
let current_fish = null
let fish_health = 100
let hp_interval = null
let counter = 0
let click_power = 1
let afk = 0
let lvl = 1
let assend_status = false
let starter_assend_value = 1000000
let random_event = ["2x", "2less upgrade", "0.5 Taxes", "-all afk"]

let fishes = [
    {
        name: "",
        value: 10,
        rarity: 0.5,
    },
    {
        name: "",
        value: 50,
        rarity: 0.3,
    },
    {
        name: "",
        value: 150,
        rarity: 0.15,
    },
    {
        name: "",
        value: 800,
        rarity: 0.05,
    },
]

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
        name: "8",
        image: "",
        cost: 50000,
        value: 15,
        type: "auto",
    },
]

function random_fish() {
    const the_fish = Math.random()
    let saskaite = 0
    for(const fish of fishes) {
        saskaite += fish.rarity
        if (the_fish < saskaite) {
            return fish
        }
    }
    return fishes[0]
}

function start_fish() {
    if(!mini_game_active) {
        mini_game_active = true
        current_fish = random_fish()
        fish_health = 100
        fish_hp.value = 100
        man_img.src = "imgs/3.png"
        hp_interval = setInterval(() => {
            fish_health -= 5
            fish_hp.value = fish_health
            if (fish_health <= 0) {
                fish_escape()
            }
        }, 500)
    }
}

function fish_escape() {
    clearInterval(hp_interval)
    mini_game_active = false
    man_img.src = "imgs/2.png"
    fish_hp.value = 100
    setTimeout(() => {start_fish()}, 2000)
}

function cought() {
    clearInterval(hp_interval)
    mini_game_active = false
    counter += current_fish.value*lvl
    score.innerText = Math.floor(counter)
    man_img.src = "imgs/1.png"
    upgrades_update()
    setTimeout(() => {start_fish()}, 2000)
}

function events_giver() {
    let buff_debuff = random_event[Math.floor(Math.random()*random_event.length)]
    let previous_1 = afk
    let previous_2 = click_power
    if (buff_debuff == "2x") {
        afk *= 2
        click_power *= 2
        setTimeout(() => {
            afk = previous_1
            click_power = previous_2
        }, 10000)
    } else if (buff_debuff == "2less upgrade") {
        afk = afk / 2
        click_power = click_power / 2
        setTimeout(() => {
            afk = previous_1
            click_power = previous_2
        }, 10000)
    } else if (buff_debuff == "0.5 Taxes") {
        counter = Math.floor(counter / 2)
        score.innerText = counter
    } else {
        afk -= afk
    }
}

function upgrades_update () {
    cards.innerHTML = ''
    let sorted = upgrades.sort((a, b) => a.cost - b.cost)
    sorted.forEach((upgrade, i) => {
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
            click_power += item.value*lvl
        } else if (item.type === "auto") {
            afk += item.value*lvl
        }
        score.innerText = Math.floor(counter)
        button.innerHTML = `Cost: $${item.cost}`
        upgrades_update()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const clicker_div_height = clicker_div.offsetHeight
    upgrades_div.style.marginTop = `${clicker_div_height+3}px`
    score.innerText = Math.floor(counter)
    upgrades_update()
    start_fish()
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
    let crit = Math.random()
    clicker.style.transform = "scale(0.95)"
    setTimeout(() => {
        clicker.style.transform = "scale(1)"
    }, 50)
    if (crit < 0.05) {
        counter = click_power*2 + counter
        floating_num.classList.add("floarting_num_crit")
        floating_num.innerText = `+${click_power*2}`
    } else {
        counter = click_power + counter
        floating_num.classList.add("floating_num")
        floating_num.innerText = `+${click_power}`
    }
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
    if (counter >= starter_assend_value) {
        assend.style.display = "block"
        main_game.style.display = "none"
    } else {
        assend_btn.classList.add('error')
        setTimeout(() => {
            assend_btn.classList.remove('error')
        }, 150);
    }
})

mini_game_div.addEventListener("click", () => {
    if (mini_game_active) {
        fish_health -= 20
        fish_hp.value = fish_health
        if (fish_health <= 0) {
            cought()
        }
    }
})

setInterval(() => {
    if (afk > 0) {
        counter += afk
        let random_number = Math.random()
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
        if (random_number < 0.01) {
            events_giver()
        }
        score.innerText = Math.floor(counter)
        upgrades_update()
    }
}, 1000)
