const saveData = async () => {
    const tgId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const data = { tgId, clickCount, pointsPerClick, upgradeIndex, maxEnergy, energy, energyRegenRate };
    await fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  };
  
  const loadData = async () => {
    const tgId = window.Telegram.WebApp.initDataUnsafe.user.id;
    const response = await fetch(`/load/${tgId}`);
    const data = await response.json();
    if (data) {
      clickCount = data.clickCount;
      pointsPerClick = data.pointsPerClick;
      upgradeIndex = data.upgradeIndex;
      maxEnergy = data.maxEnergy;
      energy = data.energy;
      energyRegenRate = data.energyRegenRate;
      updateCount();
    }
  };

window.Telegram.WebApp.onEvent('mainButtonClicker',saveData);
window.Telegram.WebApp.ready(loadData);