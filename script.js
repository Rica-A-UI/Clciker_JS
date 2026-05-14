const clicker = document.getElementById("clicker")
const cards = document.getElementById("cards")
const score = document.getElementById("score")
const manual_click = document.getElementById("click_power")
const auto_click = document.getElementById("afk")

let counter = 0
let click_power = 1
let afk = 0

let upgrades = [
    {
        name: "test",
        cost: "10",
        value: 1,
        type: "click",
    },
]

function UpgradesUI () {
    cards.innerHTML = ""
}

function updateUI() {
    score.innerText = Math.floor(score)
    manual_click.innerText = `Click power: ${clickPower}`
    auto_click.innerText = `Afk power: ${afkPower}`
}

clicker.addEventListener("click", () => {
    counter += click_power
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