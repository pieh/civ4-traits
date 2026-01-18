// Helper to use Netlify Image CDN
function netlifyImage(url, width = 32) {
  if (!url) return '';
  return `/.netlify/images?url=${encodeURIComponent(url)}&w=${width}`;
}

// Tooltip descriptions
const traitDescriptions = {
  'Aggressive': 'Free Combat I promotion for melee and gunpowder units. Double production speed of Barracks and Drydock.',
  'Agressive': 'Free Combat I promotion for melee and gunpowder units. Double production speed of Barracks and Drydock.', // typo in data
  'Charismatic': '+1 happiness per city. -25% XP needed for unit promotions. Double production speed of Broadcast Tower and Monument.',
  'Creative': '+2 culture per city. Double production speed of Colosseum and Theatre.',
  'Expansive': '+2 health per city. Double production speed of Granary and Harbor.',
  'Financial': '+1 commerce on tiles that already produce 2+ commerce.',
  'Imperialistic': '+100% Great General emergence. Double production speed of Settler.',
  'Industrious': '+50% wonder production. Double production speed of Forge.',
  'Organized': '-50% civic upkeep. Double production speed of Courthouse and Lighthouse.',
  'Philosophical': '+100% Great People birth rate. Double production speed of University.',
  'Protective': 'Free Drill I and City Garrison I for archery and gunpowder units. Double production speed of Walls and Castle.',
  'Spiritual': 'No anarchy when switching civics. Double production speed of Temple and Monastery.',
};

const techDescriptions = {
  'Agriculture': 'Enables Farms. Required for Pottery, Animal Husbandry.',
  'Fishing': 'Enables Fishing Boats and Work Boats. Required for Sailing, Pottery.',
  'Hunting': 'Enables Camps for furs, ivory, and deer. Required for Archery, Animal Husbandry.',
  'Mining': 'Enables Mines on hills. Required for Bronze Working, Masonry.',
  'Mysticism': 'Enables Monuments. Required for Meditation, Polytheism.',
  'The Wheel': 'Enables Roads and Chariots. Required for Pottery, Horseback Riding.',
};

const uniqueUnitDescriptions = {
  'Navy SEAL': 'Replaces Marine. Can use enemy roads, 1-2 First Strikes, starts with March.',
  'Camel Archer': 'Replaces Knight. Immune to First Strikes, no penalty attacking cities.',
  'Jaguar': 'Replaces Swordsman. +10% city attack, starts with Woodsman I.',
  'Bowman': 'Replaces Archer. +50% vs melee units.',
  'Cataphract': 'Replaces Knight. +100% vs mounted units.',
  'Numidian Cavalry': 'Replaces Horse Archer. +50% vs mounted units.',
  'Gallic Warrior': 'Replaces Swordsman. +20% vs melee units.',
  'Cho-Ko-Nu': 'Replaces Crossbowman. Can fire twice per turn.',
  'East Indiaman': 'Replaces Galleon. Can defend itself, +2 cargo space.',
  'War Chariot': 'Replaces Chariot. Immune to First Strikes, no copper/horse requirement.',
  'War Elephant': 'Replaces Chariot. +50% vs mounted, doesn\'t require horses.',
  'Redcoat': 'Replaces Rifleman. +25% vs Gunpowder units.',
  'Oromo Warrior': 'Replaces Musketman. Starts with Drill I and II.',
  'Musketeer': 'Replaces Musketman. +25% attack bonus.',
  'Panzer': 'Replaces Tank. +50% vs armored units, starts with Blitz.',
  'Phalanx': 'Replaces Spearman. +100% vs chariots.',
  'Landsknecht': 'Replaces Pikeman. +100% vs melee units, earns gold from combat.',
  'Quechua': 'Replaces Warrior. +100% vs archery units.',
  'Fast Worker': 'Replaces Worker. +1 movement point.',
  'Immortal': 'Replaces Chariot. +50% vs Archery units.',
  'Samurai': 'Replaces Maceman. Starts with Drill I and II.',
  'Ballista Elephant': 'Replaces War Elephant. +50% vs mounted, bombard ability.',
  'Hwacha': 'Replaces Catapult. +50% vs melee units.',
  'Skirmisher': 'Replaces Archer. 1-2 First Strikes.',
  'Holkan': 'Replaces Spearman. Doesn\'t require copper/iron.',
  'Keshik': 'Replaces Horse Archer. +1 movement, +25% vs catapults.',
  'Dog Soldier': 'Replaces Axeman. +100% vs melee units, doesn\'t require copper.',
  'Janissary': 'Replaces Musketman. +25% attack, starts with Pinch.',
  'Immortal (Persia)': 'Replaces Chariot. +50% vs Archery units.',
  'Carrack': 'Replaces Caravel. Can carry 2 units.',
  'Praetorian': 'Replaces Swordsman. Strength 8 instead of 6.',
  'Cossack': 'Replaces Cavalry. +50% vs mounted units.',
  'Conquistador': 'Replaces Knight. +50% vs melee, immune to First Strikes.',
  'Vulture': 'Replaces Axeman. +25% vs melee units.',
  'Berserker': 'Replaces Maceman. Starts with Amphibious, +10% city attack.',
  'Impi': 'Replaces Spearman. +100% vs mounted, 2 movement.',
};

const uniqueBuildingDescriptions = {
  'Mall': 'Replaces Supermarket. +20% gold in city.',
  'Madrassa': 'Replaces Library. +2 culture.',
  'Sacrificial Altar': 'Replaces Courthouse. No maintenance, removes war weariness.',
  'Garden': 'Replaces Colosseum. +2 health, +2 happiness.',
  'Hippodrome': 'Replaces Theatre. +1 happiness from horses.',
  'Cothon': 'Replaces Harbor. +1 trade route.',
  'Dun': 'Replaces Walls. +20% espionage, free Guerrilla I.',
  'Pavilion': 'Replaces Theatre. +25% culture.',
  'Dike': 'Replaces Levee. +1 production per water tile.',
  'Obelisk': 'Replaces Monument. +2 culture, can turn into Great Prophet point.',
  'Stock Exchange': 'Replaces Bank. +15% gold bonus.',
  'Citadel': 'Replaces Castle. +5 XP for siege units.',
  'Stele': 'Replaces Monument. +25% culture.',
  'Salon': 'Replaces Observatory. +1 free artist.',
  'Assembly Plant': 'Replaces Factory. +25% production bonus.',
  'Odeon': 'Replaces Colosseum. +1 culture, +1 happiness.',
  'Rathaus': 'Replaces Courthouse. -75% maintenance.',
  'Terrace': 'Replaces Granary. +2 culture.',
  'Seowon': 'Replaces University. +10% research.',
  'Mint': 'Replaces Forge. +10% gold.',
  'Ball Court': 'Replaces Colosseum. +2 happiness from any state religion.',
  'Ger': 'Replaces Stable. +2 XP for mounted units.',
  'Totem Pole': 'Replaces Monument. +3 XP for archery units.',
  'Hammam': 'Replaces Aqueduct. +2 happiness.',
  'Apothecary': 'Replaces Grocer. +25% research with trade routes.',
  'Feitoria': 'Replaces Customs House. +50% trade route yield.',
  'Forum': 'Replaces Market. +25% Great People birth rate.',
  'Ziggurat': 'Replaces Courthouse. Available earlier, +1 culture.',
  'Trading Post': 'Replaces Market. +1 trade route.',
  'Shale Plant': 'Replaces Coal Plant. +10% production, cleaner.',
  'Ikhanda': 'Replaces Barracks. -50% maintenance in city.',
};

// State
const state = {
  leaders: [],
  selectedLeaders: {},
  traits: {},
  startingTechs: {},
  showSummary: true
};

// DOM Elements
const leadersTable = document.getElementById('leaders-table');
const summaryContent = document.getElementById('summary-content');
const showSummaryCheckbox = document.getElementById('show-summary');
const selectedLeadersList = document.getElementById('selected-leaders-list');
const techsSummary = document.getElementById('techs-summary');
const traitsSummary = document.getElementById('traits-summary');

// Initialize
async function init() {
  // Hide summary on narrow viewports
  if (window.innerWidth < 768) {
    state.showSummary = false;
    showSummaryCheckbox.checked = false;
    summaryContent.classList.add('hidden');
  }

  // Load leaders data
  const response = await fetch('leaders.json');
  state.leaders = await response.json();

  // Sort leaders by civ, then by leader name
  state.leaders.sort((a, b) => {
    if (a.civ !== b.civ) return a.civ.localeCompare(b.civ);
    return a.leader.localeCompare(b.leader);
  });

  // Initialize selected state
  state.leaders.forEach(leader => {
    state.selectedLeaders[leader.leader] = false;
  });

  // Calculate initial traits and techs
  calculateTraitsAndTechs();

  // Render
  renderTable();
  renderSummary();

  // Event listeners
  showSummaryCheckbox.addEventListener('change', toggleSummary);
}

function calculateTraitsAndTechs() {
  // Reset counts
  state.traits = {};
  state.startingTechs = {};

  // First pass: collect all possible traits and techs
  state.leaders.forEach(leader => {
    leader.traits.forEach(trait => {
      if (!(trait in state.traits)) state.traits[trait] = 0;
    });
    leader.startingTechs.forEach(tech => {
      if (!(tech in state.startingTechs)) state.startingTechs[tech] = 0;
    });
  });

  // Second pass: count selected
  state.leaders.forEach(leader => {
    if (state.selectedLeaders[leader.leader]) {
      leader.traits.forEach(trait => {
        state.traits[trait]++;
      });
      leader.startingTechs.forEach(tech => {
        state.startingTechs[tech]++;
      });
    }
  });
}

function toggleLeader(leaderName) {
  state.selectedLeaders[leaderName] = !state.selectedLeaders[leaderName];
  calculateTraitsAndTechs();
  renderTable();
  renderSummary();
}

function toggleSummary() {
  state.showSummary = showSummaryCheckbox.checked;
  if (state.showSummary) {
    summaryContent.classList.remove('hidden');
  } else {
    summaryContent.classList.add('hidden');
  }
}

function renderItemList(items, countState, descriptions = {}) {
  return items.map(item => {
    const isSelected = countState[item] > 0;
    const classes = isSelected ? 'line-through' : '';
    const tooltip = descriptions[item] ? ` title="${descriptions[item].replace(/"/g, '&quot;')}"` : '';
    const cursorClass = descriptions[item] ? ' cursor-help' : '';
    return `<li class="${classes}${cursorClass}"${tooltip}>${item}</li>`;
  }).join('');
}

function renderTable() {
  leadersTable.innerHTML = state.leaders.map(leader => {
    const isSelected = state.selectedLeaders[leader.leader];

    // Check if any traits or techs overlap with already selected ones
    let hasOverlappingTraits = false;
    let hasOverlappingTechs = false;

    if (!isSelected) {
      leader.traits.forEach(trait => {
        if (state.traits[trait] > 0) hasOverlappingTraits = true;
      });
      leader.startingTechs.forEach(tech => {
        if (state.startingTechs[tech] > 0) hasOverlappingTechs = true;
      });
    }

    const rowClasses = [
      'leader-row',
      'border-b',
      'border-gray-100',
      isSelected ? 'selected' : ''
    ].filter(Boolean).join(' ');

    const techsCellClasses = !isSelected && hasOverlappingTechs ? 'bg-red-100' : '';
    const traitsCellClasses = !isSelected && hasOverlappingTraits ? 'bg-red-100' : '';

    return `
      <tr class="${rowClasses}" data-leader="${leader.leader}">
        <td class="px-2 py-2 text-center">
          <input type="checkbox" ${isSelected ? 'checked' : ''} class="w-4 h-4 pointer-events-none">
        </td>
        <td class="px-2 py-2 font-medium">${leader.leader}</td>
        <td class="px-2 py-2">
          <div class="flex items-center gap-2">
            <img src="${netlifyImage(leader.civImage, 32)}" alt="${leader.civ}" class="w-8 h-8 object-contain">
            <span>${leader.civ}</span>
          </div>
        </td>
        <td class="px-2 py-2 ${traitsCellClasses}">
          <ul class="list-disc list-inside">
            ${renderItemList(leader.traits, state.traits, traitDescriptions)}
          </ul>
        </td>
        <td class="px-2 py-2 ${techsCellClasses}">
          <ul class="list-disc list-inside">
            ${renderItemList(leader.startingTechs, state.startingTechs, techDescriptions)}
          </ul>
        </td>
        <td class="px-2 py-2">${leader.uniqueUnit ? `<span class="cursor-help" title="${(uniqueUnitDescriptions[leader.uniqueUnit] || '').replace(/"/g, '&quot;')}">${leader.uniqueUnit}</span>` : ''}</td>
        <td class="px-2 py-2">${leader.uniqueBuilding ? `<span class="cursor-help" title="${(uniqueBuildingDescriptions[leader.uniqueBuilding] || '').replace(/"/g, '&quot;')}">${leader.uniqueBuilding}</span>` : ''}</td>
      </tr>
    `;
  }).join('');

  // Add click handlers
  document.querySelectorAll('.leader-row').forEach(row => {
    row.addEventListener('click', () => {
      const leaderName = row.dataset.leader;
      toggleLeader(leaderName);
    });
  });
}

function renderAccumulatedStats(countState, descriptions = {}) {
  return Object.keys(countState).sort().map(item => {
    const count = countState[item];
    let classes = '';
    if (count === 0) {
      classes = 'text-gray-400';
    } else if (count > 1) {
      classes = 'text-orange-500';
    }
    const tooltip = descriptions[item] ? ` title="${descriptions[item].replace(/"/g, '&quot;')}"` : '';
    const cursorClass = descriptions[item] ? ' cursor-help' : '';
    return `<li class="${classes}${cursorClass}"${tooltip}>${item} x ${count}</li>`;
  }).join('');
}

function renderSummary() {
  // Selected leaders list
  const selectedLeadersData = state.leaders.filter(l => state.selectedLeaders[l.leader]);
  selectedLeadersList.innerHTML = selectedLeadersData.map(leader => {
    return `<li>${leader.leader} (${leader.civ})</li>`;
  }).join('');

  // Tech and trait summaries
  techsSummary.innerHTML = renderAccumulatedStats(state.startingTechs, techDescriptions);
  traitsSummary.innerHTML = renderAccumulatedStats(state.traits, traitDescriptions);
}

// Start the app
init();
