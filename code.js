(function() {
    // Create the calculator container
    const container = document.createElement('div');
    container.style.width = '300px';
    container.style.padding = '20px';
    container.style.border = '1px solid #ccc';
    container.style.backgroundColor = '#f9f9f9';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.margin = '20px auto';

    // Create and append the title
    const title = document.createElement('h3');
    title.textContent = 'Kitchen Countertop Calculator';
    container.appendChild(title);

    // Create and append the first input label and field
    const label1 = document.createElement('label');
    label1.setAttribute('for', 'measurement1');
    label1.textContent = 'Measurement 1 (inches):';
    container.appendChild(label1);

    const input1 = document.createElement('input');
    input1.type = 'number';
    input1.id = 'measurement1';
    input1.placeholder = 'Enter measurement 1';
    input1.style.width = '100%';
    input1.style.padding = '8px';
    input1.style.marginBottom = '10px';
    container.appendChild(input1);

    // Create and append the second input label and field
    const label2 = document.createElement('label');
    label2.setAttribute('for', 'measurement2');
    label2.textContent = 'Measurement 2 (inches):';
    container.appendChild(label2);

    const input2 = document.createElement('input');
    input2.type = 'number';
    input2.id = 'measurement2';
    input2.placeholder = 'Enter measurement 2';
    input2.style.width = '100%';
    input2.style.padding = '8px';
    input2.style.marginBottom = '10px';
    container.appendChild(input2);

    // Create and append the calculate button
    const button = document.createElement('button');
    button.id = 'calculateButton';
    button.textContent = 'Calculate Square Footage';
    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.width = '100%';
    container.appendChild(button);

    // Create and append the result display area
    const result = document.createElement('div');
    result.id = 'result';
    result.style.marginTop = '10px';
    result.style.fontSize = '18px';
    container.appendChild(result);

    // Append the container to the body
    document.body.appendChild(container);

    // Add the event listener for the button
    button.addEventListener('click', function() {
        const measurement1 = parseFloat(document.getElementById('measurement1').value);
        const measurement2 = parseFloat(document.getElementById('measurement2').value);
        
        if (isNaN(measurement1) || isNaN(measurement2)) {
            result.innerText = 'Please enter valid numbers for all measurements.';
            return;
        }
        
        const squareFootage = ((measurement1 * measurement2) / 144).toFixed(2);
        result.innerText = `Square Footage: ${squareFootage} sq ft`;
    });
})();
