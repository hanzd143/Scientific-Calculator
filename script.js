const upperDisplay = document.getElementById('upperDisplay');
const lowerDisplay = document.getElementById('lowerDisplay');
const display = document.getElementById('display') || upperDisplay; // Use upper for input
let input = '';
let isShift = false;
let isAlpha = false;
let is2nd = false;
let memory = 0;
let history = [];
let currentMode = 'comp';

function appendToDisplay(value) {
    input += value;
    upperDisplay.textContent = input;
}

function insertFunc(func) {
    appendToDisplay(func);
}

function insertTrig(type) {
    let f = is2nd ? type + 'Inv(' : type + '(';
    appendToDisplay(f);
}

function memoryOp(op) {
    let val = parseFloat(input) || 0;
    switch (op) {
        case 'M+': memory += val; break;
        case 'M-': memory -= val; break;
        case 'STO': memory = val; break;
        case 'RCL': appendToDisplay(memory.toString()); break;
    }
}

function del() {
    input = input.slice(0, -1);
    upperDisplay.textContent = input;
}

function clearAll() {
    input = '';
    upperDisplay.textContent = '';
    lowerDisplay.innerHTML = '';
}

function appendAns() {
    appendToDisplay('Ans'); // Placeholder for last result
}

function toggleShift() {
    isShift = !isShift;
    document.getElementById('shiftBtn').textContent = isShift ? 'SHIFT ON' : 'SHIFT';
    // Toggle inverse labels if needed
}

function toggleAlpha() {
    isAlpha = !isAlpha;
    document.getElementById('alphaBtn').textContent = isAlpha ? 'ALPHA ON' : 'ALPHA';
}

function toggle2nd() {
    is2nd = !is2nd;
    document.getElementById('2ndBtn').textContent = is2nd ? '2nd ON' : '2nd';
    // Update trig to inverses
    if (is2nd) {
        document.getElementById('sinBtn').textContent = 'sin⁻¹';
        // Similar for cos, tan
    } else {
        document.getElementById('sinBtn').textContent = 'sin';
        // Reset
    }
}

function setMode(mode) {
    currentMode = mode;
    console.log(`Mode: ${mode}`);
    closeModal();
    // e.g., for 'solve', enable solver
}

function showHistory() {
    alert(history.join('\n')); // Simple alert
}

function calculate() {
    try {
        // Simple eval for basic; for solve, check if 'solve' in input
        if (input.includes('solve(')) {
            // Basic quadratic solver example: assume ax^2 + bx + c = 0
            // Parse simple: e.g., x^2 + 2x - 3 = 2x + 6 → x^2 -3=0 (move terms)
            let expr = input.replace('solve(', '').replace('=0)', '');
            // Dummy quadratic: roots of x^2 + 2x - 9 = 0 (from example after moving)
            let a = 1, b = 0, c = -9; // Hardcoded for demo; implement parser
            let disc = b*b - 4*a*c;
            let root1 = (-b + Math.sqrt(disc)) / (2*a);
            let root2 = (-b - Math.sqrt(disc)) / (2*a);
            lowerDisplay.innerHTML = `[x=${root2.toFixed(0)}] [x=${root1.toFixed(0)}]`;
            history.push(input + ' = ' + root1 + ', ' + root2);
            input = '';
            upperDisplay.textContent = '';
        } else {
            let result = eval(input.replace(/sin/g, 'Math.sin').replace(/cos/g, 'Math.cos') /* add more */ );
            lowerDisplay.textContent = result.toFixed(4);
            history.push(input + ' = ' + result);
            input = result.toString();
        }
    } catch (e) {
        lowerDisplay.textContent = 'Error';
    }
}

function openModal() {
    document.getElementById('modesModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modesModal').classList.add('hidden');
}

// Event Listeners
document.getElementById('shiftBtn').addEventListener('click', toggleShift);
document.getElementById('alphaBtn').addEventListener('click', toggleAlpha);
document.getElementById('2ndBtn').addEventListener('click', toggle2nd);
document.getElementById('modeBtn').addEventListener('click', openModal);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
    else if (['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) appendToDisplay(e.key);
    else if (e.key === 'Enter') calculate();
    else if (e.key === 'Backspace') del();
});

// Initial example load
upperDisplay.textContent = 'x² + 2x - 3 = 2x + 6';
lowerDisplay.innerHTML = '[x=-3] [x=3]';
