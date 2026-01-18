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

function renderItemList(items, countState) {
  return items.map(item => {
    const isSelected = countState[item] > 0;
    const classes = isSelected ? 'line-through' : '';
    return `<li class="${classes}">${item}</li>`;
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
            <img src="${leader.civImage}" alt="${leader.civ}" class="w-8 h-8 object-contain">
            <span>${leader.civ}</span>
          </div>
        </td>
        <td class="px-2 py-2 ${traitsCellClasses}">
          <ul class="list-disc list-inside">
            ${renderItemList(leader.traits, state.traits)}
          </ul>
        </td>
        <td class="px-2 py-2 ${techsCellClasses}">
          <ul class="list-disc list-inside">
            ${renderItemList(leader.startingTechs, state.startingTechs)}
          </ul>
        </td>
        <td class="px-2 py-2">${leader.uniqueUnit || ''}</td>
        <td class="px-2 py-2">${leader.uniqueBuilding || ''}</td>
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

function renderAccumulatedStats(countState) {
  return Object.keys(countState).sort().map(item => {
    const count = countState[item];
    let classes = '';
    if (count === 0) {
      classes = 'text-gray-400';
    } else if (count > 1) {
      classes = 'text-orange-500';
    }
    return `<li class="${classes}">${item} x ${count}</li>`;
  }).join('');
}

function renderSummary() {
  // Selected leaders list
  const selectedLeadersData = state.leaders.filter(l => state.selectedLeaders[l.leader]);
  selectedLeadersList.innerHTML = selectedLeadersData.map(leader => {
    return `<li>${leader.leader} (${leader.civ})</li>`;
  }).join('');

  // Tech and trait summaries
  techsSummary.innerHTML = renderAccumulatedStats(state.startingTechs);
  traitsSummary.innerHTML = renderAccumulatedStats(state.traits);
}

// Start the app
init();
