const clicker = document.getElementById("click")
const cards = document.getElementById("cards")
const score = document.getElementById("score")
const ascend_btn = document.getElementById("ascend_btn")
const cur_event = document.getElementById("curr_event")
const main_game = document.getElementById("main_game")
const ascend = document.getElementById("ascend")
const man_img = document.getElementById("man")
const fish_hp = document.getElementById("fish_hp")
const clicker_div = document.getElementsByClassName("not_srolable")[0]
const upgrades_div = document.getElementsByClassName("upgrades")[0]
const mini_game_div = document.getElementsByClassName("mini_game")[0]
const keep_crit = document.getElementById("keep_crit")
const keep_click_power = document.getElementById("keep_click_power")
const keep_afk = document.getElementById("keep_afk")
const ascend_tier2_btn = document.getElementById("ascend_tier2")
const ascend_tier3_btn = document.getElementById("ascend_tier3")
const ascend_tier4_btn = document.getElementById("ascend_tier4")
const ascend_tier5_btn = document.getElementById("ascend_tier5")

let preveous_ascend = [0, 0, 0]
let keep_a = 1
let keep_cl_pw = 1
let keep_cr = 1
let mini_game_active = false
let current_fish = null
let fish_health = 100
let hp_interval = null
let counter = 0
let click_power = 1
let afk = 0
let lvl = 1
let debuffer = lvl*1e3
let ascend_status = false
let starter_ascend_value = 1e6
let random_event = ["2x", "2less upgrade", "0.5 Taxes", "-all afk"]
let crit_giver = 2
let previous_1 = afk
let previous_2 = click_power
let crit_CPS = false
let keeper_cl = false
let keeper_cr = false
let keeper_a = false

let fishes = [
    {
        value: 10,
        rarity: 0.5,
    },
    {
        value: 50,
        rarity: 0.3,
    },
    {
        value: 150,
        rarity: 0.15,
    },
    {
        value: 800,
        rarity: 0.05,
    },
]

let upgrades = [
    {
        name: "Buy 1 line for rod",
        image: "data:image/png;base64,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",
        cost: 10,
        baseCost: 10,
        value: 1,
        type: "click",
        bought: false,
    },
    {
        name: "Buy 1 Fisherman",
        image: "https://i.redd.it/9wem8aukpwpx.png",
        cost: 100,
        baseCost: 100,
        value: 1,
        type: "auto",
        bought: false,
    },
    {
        name: "Buy 5 baits",
        image: "data:image/png;base64,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",
        cost: 50,
        baseCost: 50,
        value: 5,
        type: "click",
        bought: false,
    },
    {
        name: "Buy 5 Fisherman",
        image: "https://media.istockphoto.com/id/831712542/vector/vector-pixel-art-cartoon.jpg?s=1024x1024&w=is&k=20&c=ChySGEiLpj_QPdqPT8-jgqMI-KoTGqhZOGY5U78f89w=",
        cost: 500,
        baseCost: 500,
        value: 5,
        type: "auto",
        bought: false,
    },
    {
        name: "Buy 10 rods",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkb6P-9jQXSW-yHdevGX2Oxug8_yBGitUwHg&s",
        cost: 1000,
        baseCost: 1000,
        value: 10,
        type: "click",
        bought: false,
    },
    {
        name: "Buy 10 bait for Fisherman",
        image: "https://static.vecteezy.com/system/resources/previews/056/636/732/non_2x/pixel-art-illustration-worm-bait-pixelated-fishing-bait-earth-worm-fishing-bait-icon-pixelated-for-the-pixel-art-game-and-icon-for-website-and-game-free-vector.jpg",
        cost: 5000,
        baseCost: 5000,
        value: 10,
        type: "auto",
        bought: false,
    },
    {
        name: "Buy 15 Bait",
        image: "https://static.wikia.nocookie.net/portalworldsgame/images/9/9c/Striped_Spoon.png/revision/latest/smart/width/250/height/250?cb=20190611121804",
        cost: 10000,
        baseCost: 10000,
        value: 15,
        type: "click",
        bought: false,
    },
    {
        name: "Buy 15 Fisherman",
        image: "https://www.shutterstock.com/image-vector/pixel-art-fishing-paddle-boat-260nw-2444286589.jpg",
        cost: 50000,
        baseCost: 50000,
        value: 15,
        type: "auto",
        bought: false,
    },
    {
        name: "Give 0.5 crit power more",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvjRIy2yWiJyI1XY4ccblO0jGgpFv-uzMQg&s",
        cost: 1000,
        baseCost: 1000,
        value: 0.5,
        type: "crit",
        bought: false,
    },
    {
        name: "fishin game",
        image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/1e1d980cae1628971e175f45c72b31f9/pixel-fishing-logo.png",
        bought: false,
        cost: 1000,
        baseCost: 1000,
        type: "Fish_game",
    },
    {
        name: "add crit to CPS",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMvjRIy2yWiJyI1XY4ccblO0jGgpFv-uzMQg&s",
        bought: false,
        cost: 5000,
        baseCost: 5000,
        type: "CPS_crit",
    },
    {
        name: "lasis",
        image: "imgs/lasis-removebg-preview.png",
        bought: false,
        cost: 5000,
        baseCost: 5000,
        type: "lasis",
    },
    {
        name: "plicis",
        image: "imgs/plicis-removebg-preview.png",
        bought: false,
        cost: 10000,
        baseCost: 10000,
        type: "plicis",
    },
    {
        name: "akmeņgrauzis",
        image: "imgs/akmeņgrauzis-removebg-preview.png",
        bought: false,
        cost: 50000,
        baseCost: 50000,
        type: "akmeņgrauzis",
    },
    {
        name: "nigliņš",
        image: "imgs/niglins-removebg-preview.png",
        bought: false,
        cost: 100000,
        baseCost: 100000,
        type: "nigliņš",
    },
    {
        name: "sams",
        image: "imgs/sams-removebg-preview.png",
        bought: false,
        cost: 500000,
        baseCost: 500000,
        type: "sams",
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
    counter += current_fish.value*lvl*click_power*keep_cl_pw
    updateDisplay(counter)
    man_img.src = "imgs/1.png"
    upgrades_update()
    setTimeout(() => {start_fish()}, 2000)
}

function formatNumber(the_counter) {
    if (the_counter >= 1e24) {
        return (the_counter / 1e24).toFixed(1) + "Y"
    } else if (the_counter >= 1e21) {
        return (the_counter / 1e21).toFixed(1) + "Z"
    } else if (the_counter >= 1e18) {
        return (the_counter / 1e18).toFixed(1) + "E"
    } else if (the_counter >= 1e15) {
        return (the_counter / 1e15).toFixed(1) + "Q"
    } else if (the_counter >= 1e12) {
        return (the_counter / 1e12).toFixed(1) + "T"
    } else if (the_counter >= 1e9) {
        return (the_counter / 1e9).toFixed(1) + "B"
    } else if (the_counter >= 1e6) {
        return (the_counter / 1e6).toFixed(1) + "M"
    } else if (the_counter >= 1e3) {
        return (the_counter / 1e3).toFixed(1) + "K"
    } else {
        return Math.floor(the_counter).toString()
    }
}

function updateDisplay(number) {
    let floored_counter = Math.floor(number)
    score.innerText = formatNumber(floored_counter)
}

function ascension_process() {
    if (keeper_cl) {
        click_power = preveous_ascend[1]
        crit_giver = 2
        afk = 0
        keep_a = 0.5
        keep_cr = 0.5
    } else if (keeper_a) {
        click_power = 1
        afk = preveous_ascend[0]
        crit_giver = 2
        keep_cl_pw = 0.5
        keep_cr = 0.5
    } else if (keeper_cr) {
        crit_giver = preveous_ascend[2]
        afk = 0
        click_power = 1
        keep_cl_pw = 0.5
        keep_a = 0.5
    }
    keeper_cl = false
    keeper_a = false
    keeper_cr = false
    crit_CPS = false
    counter = 0
    starter_ascend_value = 1e6 * lvl * debuffer
    clicker.src = "https://res.cloudinary.com/teepublic/image/private/s--Mncu2r6i--/t_Preview/b_rgb:000000,c_lpad,f_jpg,h_630,q_90,w_1200/v1750944117/production/designs/76787070_0.jpg"
    updateDisplay(counter)
    upgrades.forEach(item => {
        item.bought = false
        item.cost = item.baseCost * debuffer
    })
    upgrades_update()

    clearInterval(hp_interval)
    mini_game_active = false
    mini_game_div.style.display = "none"
    man_img.src = "imgs/1.png"
    
    clicker_div_height = clicker_div.offsetHeight
    upgrades_div.style.marginTop = `${clicker_div_height + 3}px`

    ascend.style.display = "none"
    main_game.style.display = "block"
}

function events_giver() {
    let buff_debuff = random_event[Math.floor(Math.random()*random_event.length)]
    previous_1 = afk
    previous_2 = click_power
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
        updateDisplay(counter)
        setTimeout(() => {
            cur_event.innerText = "Event: None"
        }, 5000)
    } else {
        cur_event.innerText = "Event: take away all passiv income except 1"
        afk -= (afk-1)
        setTimeout(() => {
            cur_event.innerText = "Event: None"
        }, 5000)
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
            previous_2 += item.value*lvl
        } else if (item.type === "auto") {
            afk += item.value*lvl
            previous_1 += item.value*lvl
        } else if (item.type === "Fish_game") {
            item.bought = true
            mini_game_div.style.display = "flex"
            clicker_div_height = clicker_div.offsetHeight
            upgrades_div.style.marginTop = `${clicker_div_height+3}px`
            start_fish()
        } else if (item.type === "crit") {
            crit_giver += item.value
        } else if (item.type === "CPS_crit") {
            crit_CPS = true
            item.bought = true
        }else if (item.type === "lasis" || item.type === "plicis" || item.type === "akmeņgrauzis" || item.type === "nigliņš" || item.type === "sams") {
            item.bought = true
            click_power *= 2
            afk *= 2
            clicker.src = item.image
        }
        updateDisplay(counter)
        button.innerHTML = `Cost: $${item.cost}`
        upgrades_update()
    }
}

document.addEventListener("DOMContentLoaded", () => {
    mini_game_div.style.display = `none`
    let clicker_div_height = clicker_div.offsetHeight
    upgrades_div.style.marginTop = `${clicker_div_height+3}px`
    ascend_btn.innerText = `Ascension: ${starter_ascend_value}`
    updateDisplay(counter)
    upgrades_update()
    if (ascend_status==false) {
    ascend.style.display = "none"
    main_game.style.display = "block"
    } else {
        ascend.style.display = "flex"
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
        counter = click_power*crit_giver*keep_cr + counter
        floating_num.classList.add("floarting_num_crit")
        floating_num.innerText = `+${formatNumber(click_power*crit_giver*keep_cl_pw*keep_cr)}`
    } else {
        counter = click_power + counter
        floating_num.classList.add("floating_num")
        floating_num.innerText = `+${formatNumber(click_power*keep_cl_pw)}`
    }
    floating_num.style.left = `${event.clientX-Math.random()*20}px`
    floating_num.style.top = `${event.clientY-Math.random()*10}px`
    document.body.appendChild(floating_num)
    setTimeout(() => {
        floating_num.remove()
    }, 500)
    upgrades_update()
    updateDisplay(counter)
})

ascend_btn.addEventListener("click", (event) => {
    if (counter >= starter_ascend_value) {
        ascend.style.display = "flex"
        main_game.style.display = "none"
        ascend_btn.innerText = `Ascension: ${starter_ascend_value}`
        preveous_ascend[0] = afk
        preveous_ascend[1] = click_power
        preveous_ascend[2] = crit_giver
        afk = 0
        lvl += 1
    } else {
        event.target.classList.add('error')
        setTimeout(() => {
            event.target.classList.remove('error')
        }, 150)
    }
})
ascend_tier2_btn.addEventListener("click", (event) => {
    if (lvl == ascend_tier2_btn.value && (keeper_a === true || keeper_cl === true || keeper_cr === true)) {
        ascension_process()
    } else {
        event.target.classList.add('error_1')
        setTimeout(() => {
            event.target.classList.remove('error_1')
        }, 150)
    }
})
ascend_tier3_btn.addEventListener("click", (event) => {
    if (lvl == ascend_tier3_btn.value && (keeper_a === true || keeper_cl === true || keeper_cr === true)) {
        ascension_process()
    } else {
        event.target.classList.add('error_1')
        setTimeout(() => {
            event.target.classList.remove('error_1')
        }, 150)
    }
})
ascend_tier4_btn.addEventListener("click", (event) => {
    if (lvl == ascend_tier4_btn.value && (keeper_a === true || keeper_cl === true || keeper_cr === true)) {
        ascension_process()
    } else {
        event.target.classList.add('error_1')
        setTimeout(() => {
            event.target.classList.remove('error_1')
        }, 150)
    }
})
ascend_tier5_btn.addEventListener("click", (event) => {
    if (lvl == ascend_tier5_btn.value && (keeper_a === true || keeper_cl === true || keeper_cr === true)) {
        ascension_process()
    } else {
        event.target.classList.add('error_1')
        setTimeout(() => {
            event.target.classList.remove('error_1')
        }, 150)
    }
})
keep_click_power.addEventListener("click", () => {
    keeper_cl = true
    keeper_cr = false
    keeper_a = false
})
keep_crit.addEventListener("click", () => {
    keeper_cr = true
    keeper_a = false
    keeper_cl = false
})
keep_afk.addEventListener("click", () => {
    keeper_a = true
    keeper_cl = false
    keeper_cr = false
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
        let crit = Math.random()
        let random_number = Math.random()
        const spawn = score.getBoundingClientRect()
        const floating_down = document.createElement("div")
        if (crit < 0.05 && crit_CPS) {
            counter += Math.floor(counter*crit_giver*keep_a*keep_cr)
            floating_down.classList.add("floating_down_crit")
            floating_down.innerText = `+${formatNumber(Math.floor(counter*crit_giver*keep_a*keep_cr))}`
        } else {
            counter += Math.floor(afk*keep_a)
            floating_down.classList.add("floating_down")
            floating_down.innerText = `+${formatNumber(Math.floor(afk*keep_a))}`
        }
        floating_down.style.left = `${spawn.left+(Math.random()-0.5)*spawn.width}px`
        floating_down.style.top = `${spawn.bottom}px`
        document.body.appendChild(floating_down)
        setTimeout(() => {
            floating_down.remove()
        }, 500)
        if (random_number < 0.01) {
            events_giver()
        }
        updateDisplay(counter)
        upgrades_update()
    }
}, 1000)
