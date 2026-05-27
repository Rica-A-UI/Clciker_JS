const clicker = document.getElementById("click")
const cards = document.getElementById("cards")
const score = document.getElementById("score")
const assend_btn = document.getElementById("assend_btn")
const cur_event = document.getElementById("curr_event")
const main_game = document.getElementById("main_game")
const assend = document.getElementById("assend")
const man_img = document.getElementById("man")
const fish_hp = document.getElementById("fish_hp")
const clicker_div = document.getElementsByClassName("not_srolable")[0]
const upgrades_div = document.getElementsByClassName("upgrades")[0]
const mini_game_div = document.getElementsByClassName("mini_game")[0]
const clicker_place = document.getElementsByClassName("clicker_place")[0]
const lvl2_btn = document.getElementById("lvl2")
const lvl3_btn = document.getElementById("lvl3")
const lvl4_btn = document.getElementById("lvl4")
const lvl5_btn = document.getElementById("lvl5")

let mini_game_active = false
let current_fish = null
let fish_health = 100
let hp_interval = null
let counter = 0
let click_power = 1
let afk = 0
let lvl = 1
let assend_status = false
let starter_assend_value = 1000000*lvl
let random_event = ["2x", "2less upgrade", "0.5 Taxes", "-all afk"]
let crit_giver = 2

let fishes = [
    {
        name: "",
        value: 10*click_power,
        rarity: 0.5,
    },
    {
        name: "",
        value: 50*click_power,
        rarity: 0.3,
    },
    {
        name: "",
        value: 150*click_power,
        rarity: 0.15,
    },
    {
        name: "",
        value: 800*click_power,
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
        bought: false,
    },
    {
        name: "2",
        image: "",
        cost: 100,
        value: 1,
        type: "auto",
        bought: false,
    },
    {
        name: "3",
        image: "",
        cost: 50,
        value: 5,
        type: "click",
        bought: false,
    },
    {
        name: "4",
        image: "",
        cost: 500,
        value: 5,
        type: "auto",
        bought: false,
    },
    {
        name: "5",
        image: "",
        cost: 1000,
        value: 10,
        type: "click",
        bought: false,
    },
    {
        name: "6",
        image: "",
        cost: 5000,
        value: 10,
        type: "auto",
        bought: false,
    },
    {
        name: "7",
        image: "",
        cost: 10000,
        value: 15,
        type: "click",
        bought: false,
    },
    {
        name: "8",
        image: "",
        cost: 50000,
        value: 15,
        type: "auto",
        bought: false,
    },
    {
        name: "Crit power",
        image: "",
        cost: 1000,
        value: 0.5,
        type: "crit",
        bought: false,
    },
    {
        name: "fishin game",
        image: "",
        bought: false,
        cost: 100000,
        type: "Fish_game",
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

function assending() {
    lvl += 1
}

function events_giver() {
    let buff_debuff = random_event[Math.floor(Math.random()*random_event.length)]
    let previous_1 = afk
    let previous_2 = click_power
    if (buff_debuff == "2x") {
        afk *= 2
        click_power *= 2
        cur_event.innerText = "Event: 2x all"
        setTimeout(() => {
            afk = previous_1
            click_power = previous_2
            cur_event.innerText = "Event: None"
        }, 10000)
    } else if (buff_debuff == "2less upgrade") {
        afk = Math.round(afk / 2)
        click_power = Math.round(click_power / 2)
        cur_event.innerText = "Event: half all power"
        setTimeout(() => {
            afk = previous_1
            click_power = previous_2
            cur_event.innerText = "Event: None"
        }, 10000)
    } else if (buff_debuff == "0.5 Taxes") {
        cur_event.innerText = "Event: half ur score"
        counter = Math.floor(counter / 2)
        score.innerText = counter
    } else {
        cur_event.innerText = "Event: take away all passiv income"
        afk -= afk
        setTimeout(() => {
            cur_event.innerText = "Event: None"
        }, 1000)
    }
}

function upgrades_update () {
    cards.innerHTML = ''
    let sorted = [...upgrades].sort((a, b) => a.cost - b.cost)
    sorted.forEach((upgrade) => {
    const cardHTML = `
        <div class="upgrade_card">
            <h1>${upgrade.name}</h1>
            <img src="${upgrade.image}" alt="${upgrade.name}">
            <button onclick="buyUpgrade('${upgrade.name}', event)">Cost: $${upgrade.cost}</button>
        </div>
    `
    if (upgrade.cost <= counter && upgrade.bought === false) {
        cards.innerHTML += cardHTML
    } 
    })
}

function buyUpgrade(name, event) {
    const item = upgrades.find(u => u.name === name)
    const button = event.target

    if (counter >= item.cost) {
        counter -= item.cost
        item.cost = Math.round(item.cost*1.5)
        
        if (item.type === "click") {
            click_power += item.value*lvl
        } else if (item.type === "auto") {
            afk += item.value*lvl
        } else if (item.type === "Fish_game") {
            item.bought = true
            mini_game_div.style.display = "block"
        } else if (item.type === "crit") {
            crit_giver += item.value
        }
        score.innerText = Math.floor(counter)
        button.innerHTML = `Cost: $${item.cost}`
        upgrades_update()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const clicker_div_height = clicker_div.offsetHeight
    upgrades_div.style.marginTop = `${clicker_div_height+3}px`
    mini_game_div.style.display = `none`
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
    let crit = Math.random()
    clicker.style.transform = "scale(0.95)"
    setTimeout(() => {
        clicker.style.transform = "scale(1)"
    }, 50)
    if (crit < 0.05) {
        counter = click_power*crit_giver + counter
        floating_num.classList.add("floarting_num_crit")
        floating_num.innerText = `+${click_power*crit_giver}`
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
