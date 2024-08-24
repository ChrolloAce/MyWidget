(function() {
    // Define the styles for the widget
    const style = `
        .widget-container {
            width: 300px;
            padding: 10px;
            border: 1px solid #ccc;
            background-color: #f9f9f9;
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .input-field {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
        }
        .calculate-button {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
            width: 100%;
        }
        .result-display {
            margin-top: 10px;
            font-size: 18px;
        }
    `;

    // Define the HTML structure for the widget
    const html = `
        <div id="calculator-widget" class="widget-container">
            <input type="text" id="inputField" class="input-field" placeholder="Enter a math expression">
            <button id="calculateButton" class="calculate-button">Calculate</button>
            <div id="result" class="result-display"></div>
        </div>
    `;

    // Define the JavaScript functionality for the widget
    const script = `
        document.getElementById('calculateButton').addEventListener('click', function() {
            var input = document.getElementById('inputField').value;
            try {
                var result = eval(input);
                document.getElementById('result').innerText = 'Result: ' + result;
            } catch (e) {
                document.getElementById('result').innerText = 'Error: Invalid expression';
            }
        });
    `;

    // Create a container to hold the widget
    const container = document.createElement('div');
    container.innerHTML = `<style>${style}</style>${html}`;
    document.body.appendChild(container);

    // Add the JavaScript functionality to the widget
    const scriptTag = document.createElement('script');
    scriptTag.textContent = script;
    container.appendChild(scriptTag);
})();
