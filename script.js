// Generate 100 atom structures inside our visualizer grid box
const grid = document.getElementById('atomsGrid');
for (let i = 0; i < 100; i++) {
    const atom = document.createElement('div');
    atom.classList.add('atom');
    grid.appendChild(atom);
}

function setPreset(name, halfLife) {
    document.getElementById('halfLifeInput').value = halfLife;
    
    // Dynamically adjust slider scale for longer half lives like Iodine
    const slider = document.getElementById('timeSlider');
    slider.max = Math.ceil(halfLife * 3); 
    slider.value = 0;
    
    calculateDecay();
}

function calculateDecay() {
    const halfLife = parseFloat(document.getElementById('halfLifeInput').value);
    const timeElapsed = parseFloat(document.getElementById('timeSlider').value);
    
    document.getElementById('hoursDisplay').innerText = timeElapsed;

    // The Radioactive Decay Formula logic
    const remainingFraction = Math.pow(0.5, (timeElapsed / halfLife));
    const remainingPercentage = (remainingFraction * 100).toFixed(1);
    
    document.getElementById('percentageDisplay').innerText = remainingPercentage + '%';

    // Update individual visual atoms on screen
    const atoms = document.querySelectorAll('.atom');
    atoms.forEach((atom, index) => {
        // If index percentage exceeds remaining layout, turn atom off
        if (index >= Math.round(remainingPercentage)) {
            atom.classList.add('decayed');
        } else {
            atom.classList.remove('decayed');
        }
    });
}

// Run immediately on boot to initialize starting states
calculateDecay();
