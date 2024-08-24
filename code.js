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
            var scriptTag = document.querySelector('script[src*="code.js"]');  // Get the current script tag by src attribute
            var webhookUrl = scriptTag.getAttribute('data-webhook-url');  // Get the webhook URL from the data attribute

            console.log('Webhook URL:', webhookUrl);

            if (!webhookUrl) {
                console.error('Webhook URL not provided.');
                return;
            }

            try {
                console.log('Evaluating expression:', input);
                var result = eval(input);
                document.getElementById('result').innerText = 'Result: ' + result;
                console.log('Evaluation successful. Result:', result);

                // Send data to the webhook
                var xhr = new XMLHttpRequest();
                xhr.open('POST', webhookUrl, true);
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) { // When the request is complete
                        if (xhr.status >= 200 && xhr.status < 300) {
                            console.log('Webhook triggered successfully:', xhr.responseText);
                        } else {
                            console.error('Failed to trigger webhook:', xhr.status, xhr.responseText);
                        }
                    }
                };

                xhr.onerror = function() {
                    console.error('Request failed due to a network error.');
                };

                var payload = JSON.stringify({
                    expression: input,
                    result: result
                });

                console.log('Sending payload to webhook:', payload);
                xhr.send(payload);

                // Notify the host page that the calculation was completed
                if (window.onCalculationComplete) {
                    console.log('Calling onCalculationComplete with data:', { expression: input, result: result });
                    window.onCalculationComplete({
                        expression: input,
                        result: result
                    });
                }

            } catch (e) {
                console.error('Error during evaluation:', e);
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
