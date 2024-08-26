(function() {
    // Create the calculator container
    const container = document.createElement('div');
    container.style.maxWidth = '500px';
    container.style.width = '100%';
    container.style.padding = '20px';
    container.style.borderRadius = '10px';
    container.style.border = '2px solid #4CAF50';
    container.style.backgroundColor = '#f2f2f2';
    container.style.fontFamily = 'Arial, sans-serif';
    container.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    container.style.margin = '20px auto';
    container.style.textAlign = 'center';

    // Add the specific image
    const image = document.createElement('img');
    image.src = 'https://cdn.prod.website-files.com/65d57147d18f3253f94e1a63/66cce80c07dc7509ff609c23_dasdasdasdas.PNG'; // Image URL
    image.alt = 'Countertop Measurement Diagram';
    image.style.maxWidth = '100%';
    image.style.borderRadius = '10px';
    image.style.marginBottom = '20px';
    container.appendChild(image);

    // Create and append the title
    const title = document.createElement('h3');
    title.textContent = 'Kitchen Countertop Square Footage Calculator';
    title.style.fontSize = '24px';
    title.style.color = '#333';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    container.appendChild(title);

    // Create and append the first input label and field
    const label1 = document.createElement('label');
    label1.setAttribute('for', 'measurement1');
    label1.textContent = 'Length (inches):';
    label1.style.display = 'block';
    label1.style.marginBottom = '5px';
    label1.style.color = '#555';
    container.appendChild(label1);

    const input1 = document.createElement('input');
    input1.type = 'number';
    input1.id = 'measurement1';
    input1.placeholder = 'Enter length';
    input1.style.width = '100%';
    input1.style.padding = '10px';
    input1.style.borderRadius = '5px';
    input1.style.border = '1px solid #ccc';
    input1.style.marginBottom = '20px';
    input1.style.boxSizing = 'border-box';
    container.appendChild(input1);

    // Create and append the second input label and field
    const label2 = document.createElement('label');
    label2.setAttribute('for', 'measurement2');
    label2.textContent = 'Width (inches):';
    label2.style.display = 'block';
    label2.style.marginBottom = '5px';
    label2.style.color = '#555';
    container.appendChild(label2);

    const input2 = document.createElement('input');
    input2.type = 'number';
    input2.id = 'measurement2';
    input2.placeholder = 'Enter width';
    input2.style.width = '100%';
    input2.style.padding = '10px';
    input2.style.borderRadius = '5px';
    input2.style.border = '1px solid #ccc';
    input2.style.marginBottom = '20px';
    input2.style.boxSizing = 'border-box';
    container.appendChild(input2);

    // Create and append the third input label and field
    const label3 = document.createElement('label');
    label3.setAttribute('for', 'measurement3');
    label3.textContent = 'Backsplash Height (inches):';
    label3.style.display = 'block';
    label3.style.marginBottom = '5px';
    label3.style.color = '#555';
    container.appendChild(label3);

    const input3 = document.createElement('input');
    input3.type = 'number';
    input3.id = 'measurement3';
    input3.placeholder = 'Enter backsplash height';
    input3.style.width = '100%';
    input3.style.padding = '10px';
    input3.style.borderRadius = '5px';
    input3.style.border = '1px solid #ccc';
    input3.style.marginBottom = '20px';
    input3.style.boxSizing = 'border-box';
    container.appendChild(input3);

    // Create and append the calculate button
    const button = document.createElement('button');
    button.id = 'calculateButton';
    button.textContent = 'Calculate Total Square Footage';
    button.style.padding = '15px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.width = '100%';
    button.style.fontSize = '16px';
    button.style.fontWeight = 'bold';
    container.appendChild(button);

    // Create and append the result display area
    const result = document.createElement('div');
    result.id = 'result';
    result.style.marginTop = '20px';
    result.style.fontSize = '20px';
    result.style.color = '#333';
    result.style.textAlign = 'center';
    result.style.padding = '10px';
    result.style.backgroundColor = '#e9f6e9';
    result.style.borderRadius = '5px';
    result.style.border = '1px solid #4CAF50';
    container.appendChild(result);

    // Append the container to the body
    document.body.appendChild(container);

    // Add the event listener for the button
    button.addEventListener('click', function() {
        const measurement1 = parseFloat(document.getElementById('measurement1').value);
        const measurement2 = parseFloat(document.getElementById('measurement2').value);
        const measurement3 = parseFloat(document.getElementById('measurement3').value);
        
        if (isNaN(measurement1) || isNaN(measurement2) || isNaN(measurement3)) {
            result.innerText = 'Please enter valid numbers for all measurements.';
            return;
        }

        // Implementing Zack's formula for Kitchen Countertop
        const counterArea = (((measurement1 + measurement2) * 25) / 144).toFixed(2); 
        const backsplashArea = ((measurement1 * measurement3) / 144).toFixed(2);
        const totalSquareFootage = (parseFloat(counterArea) + parseFloat(backsplashArea)).toFixed(2);

        result.innerText = `Total Square Footage: ${totalSquareFootage} sq ft`;
    });
})();
