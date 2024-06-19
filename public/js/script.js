let score = 0;
let energy = 1000;
let maxEnergy = 1000;
let energyRegenRate = 1000; 

const scoreElement = document.getElementById('score');
const energyLabel = document.getElementById('energy-label');
const energyBar = document.getElementById('energy-bar');
const rankElement = document.getElementById('rank');
const coin = document.getElementById('coin');

const shopBtn = document.getElementById('shop-btn');
const statsBtn = document.getElementById('stats-btn');
const shopModal = document.getElementById('shop-modal');
const statsModal = document.getElementById('stats-modal');
const shopClose = document.getElementById('shop-close');
const statsClose = document.getElementById('stats-close');

const shopItemsElement = document.getElementById('shop-items');
const statsItemsElement = document.getElementById('stats-items');



let clickUpgrades = [
    { cost: 30, value: 4 },

];
let energyUpgrades = [
    { cost: 200, value: 500 },
    { cost: 1000, value: 1000 },
    { cost: 2000, value: 2000 }
];
let regenUpgrades = [
    { cost: 300, value: 500 },
    { cost: 1500, value: 1000 },
    { cost: 3000, value: 2000 }
];

let currentClickUpgrade = 0;
let currentEnergyUpgrade = 0;
let currentRegenUpgrade = 0;

function updateUI() {
    scoreElement.textContent = score;
    energyLabel.textContent = `${energy}/${maxEnergy}`;
    energyBar.style.width = `${(energy / maxEnergy) * 100}%`;

    // Update rank based on score
    if (score >= 10000) {
        rankElement.textContent = 'Platinum';
    } else if (score >= 5000) {
        rankElement.textContent = 'Gold';
    } else if (score >= 500) {
        rankElement.textContent = 'Silver';
    } else {
        rankElement.textContent = 'Bronze';
    }
}

function clickCoin() {
    if (energy > 0) {
        score += (currentClickUpgrade < clickUpgrades.length) ? clickUpgrades[currentClickUpgrade].value : 1;
        energy -= (currentClickUpgrade < clickUpgrades.length) ? clickUpgrades[currentClickUpgrade].value : 1;
        if (energy < 0) energy = 0;
        updateUI();
    }
}

function regenEnergy() {
    energy += energyRegenRate;
    if (energy > maxEnergy) energy = maxEnergy;
    updateUI();
}

function openShop() {
    shopItemsElement.innerHTML = '';
    if (currentClickUpgrade < clickUpgrades.length) {
        let upgrade = clickUpgrades[currentClickUpgrade];
        let btn = document.createElement('button');
        btn.textContent = `Upgrade Click (${upgrade.cost} points)`;
        btn.onclick = () => {
            if (score >= upgrade.cost) {
                score -= upgrade.cost;
                currentClickUpgrade++;
                updateUI();
                openShop(); 
            }
        };
        shopItemsElement.appendChild(btn);
    } else {
        shopItemsElement.textContent = 'You have bought all click upgrades';
    }
    shopModal.style.display = 'block';
}

function openStats() {
    statsItemsElement.innerHTML = '';
    let topScores = [
        { name: 'Player1', score: 10000,rank : 'Bronze' },
        { name: 'Player2', score: 8000 },
        { name: 'Player3', score: 6000 },
        { name: 'Player4', score: 4000 },
        { name: 'Player5', score: 2000 },
    ];

    topScores.forEach(player => {
        let div = document.createElement('div');
        div.textContent = `${player.name}: ${player.score} points`;
        statsItemsElement.appendChild(div);
    });

    statsModal.style.display = 'block';
}

function closeModal(modal) {
    modal.style.display = 'none';
}

coin.addEventListener('click', clickCoin);
shopBtn.addEventListener('click', openShop);
statsBtn.addEventListener('click', openStats);
shopClose.addEventListener('click', () => closeModal(shopModal));
statsClose.addEventListener('click', () => closeModal(statsModal));
window.addEventListener('click', (event) => {
    if (event.target == shopModal) closeModal(shopModal);
    if (event.target == statsModal) closeModal(statsModal);
});

setInterval(regenEnergy, 9000); 

updateUI();

