const display = document.getElementById('display');
const shiftBtn = document.getElementById('shiftBtn');
const alphaBtn = document.getElementById('alphaBtn');
const degRadBtn = document.getElementById('degRadBtn');
const modesBtn = document.getElementById('modesBtn');
const alphaRow = document.getElementById('alphaRow');
const modesModal = document.getElementById('modesModal');
const sinBtn = document.getElementById('sinBtn');
const cosBtn = document.getElementById('cosBtn');
const tanBtn = document.getElementById('tanBtn');

let isShift = false;
let isAlpha = false;
let isDegree = true; // Default to degrees
let memory = 0;
let currentMode = 'calculate'; // Default mode

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function insertTrig(type) {
    let func = isShift ? type + 'Inv(' : type + '('; // e.g., sin → sinInv for arcsin
    if (isDegree && !isShift) {
        // For direct trig, convert to radians in eval later
        func = type + 'Deg(';
    }
    appendToDisplay(func);
}

function toggleShift() {
    isShift = !isShift;
    shiftBtn.textContent = isShift ? 'SHIFT (ON)' : 'SHIFT';
    shiftBtn.classList.toggle('active');
    // Update trig buttons labels
    sinBtn.textContent = isShift ? 'sin⁻¹' : 'sin';
    cosBtn.textContent = isShift ? 'cos⁻¹' : 'cos';
    tanBtn.textContent = isShift ? 'tan⁻¹' : 'tan';
}

function toggleAlpha() {
    isAlpha = !isAlpha;
    alphaBtn.textContent = isAlpha ? 'ALPHA (ON)' : 'ALPHA';
    alphaBtn.classList.toggle('active');
    alphaRow.classList.toggle('hidden');
}

function toggleDegRad() {
    isDegree = !isDegree;
    degRadBtn.textContent = isDegree ? 'DEG' : 'RAD';
    degRadBtn.classList.toggle('active');
}

function memoryOp(op) {
    try {
        let val = parseFloat(display.value) || 0;
        if (op === '+') memory += val;
        else if (op === '-') memory -= val;
        else if (op === 'rcl') display.value = memory;
        else if (op === 'sto') memory = val;
    } catch {}
}

function insertFunction(func) {
    appendToDisplay(func); // Placeholder; expand for real impl (e.g., matrix)
    alert(`${func} selected - Implement full function here!`); // Temp
}

function toggleFormat() {
    // Toggle display format (e.g., scientific vs normal)
    alert('Format toggled - Add logic for number formatting');
}

function setMode(mode) {
    currentMode = mode;
    closeModal();
    alert(`Switched to ${mode} mode`); // Placeholder; e.g., for spreadsheet, load a grid
}

function calculate() {
    try {
        let expression = display.value
            .replace(/pi/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/\*\*10/g, ' * Math.pow(10, ') + ')' // For x10^x
            .replace(/sinDeg\(/g, 'Math.sin(' + (isDegree ? 'Math.PI/180 * ' : ''))
            .replace(/cosDeg\(/g, 'Math.cos(' + (isDegree ? 'Math.PI/180 * ' : ''))
            .replace(/tanDeg\(/g, 'Math.tan(' + (isDegree ? 'Math.PI/180 * ' : ''))
            .replace(/sinInv\(/g, isDegree ? 'Math.asin(...) * 180/Math.PI' : 'Math.asin(')
            // Add more replacements for log, ln, sqrt, int (numerical), etc.
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/Ans/g, display.value); // Last answer

        // For advanced like diff/sum, placeholder eval
        display.value = eval(expression).toFixed(4); // Round for display
    } catch (error) {
        display.value = 'Error';
    }
}

shiftBtn.addEventListener('click', toggleShift);
alphaBtn.addEventListener('click', toggleAlpha);
degRadBtn.addEventListener('click', toggleDegRad);
modesBtn.addEventListener('click', () => modesModal.classList.remove('hidden'));
function closeModal() { modesModal.classList.add('hidden'); }

// Keyboard support for desktop testing
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) {
        appendToDisplay(e.key);
    } else if (e.key === 'Enter') calculate();
    else if (e.key === 'Escape') clearDisplay();
});

// Touch enhancements (prevent zoom on iOS)
document.addEventListener('touchstart', (e) => {}, { passive: true });
