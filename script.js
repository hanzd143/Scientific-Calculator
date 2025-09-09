const display = document.getElementById('display');

function appendToDisplay(value) {
    if (value === 'pi') {
        display.value += Math.PI;
    } else if (value === '^') {
        display.value += '**';  // JS uses ** for exponentiation
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace scientific functions with Math equivalents
        let expression = display.value
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/log/g, 'Math.log10')  // Assuming base-10 log; use Math.log for natural log
            .replace(/exp/g, 'Math.exp');
        
        // Evaluate the expression
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}
