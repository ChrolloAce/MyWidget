(function () {
    let points = [];
    let isPolygonClosed = false;

    function initInterface() {
        document.body.innerHTML = '';
        const container = document.createElement('div');
        Object.assign(container.style, {
            width: '95%',
            maxWidth: '800px',
            backgroundColor: '#f1f1f1',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            margin: '80px auto 30px auto',
        });
        container.id = 'container';
        document.body.appendChild(container);

        const header = document.createElement('h1');
        header.textContent = 'Start New Invoice';
        Object.assign(header.style, { color: '#0C1729', fontSize: '36px' });
        container.appendChild(header);

        const imageUploadLabel = document.createElement('label');
        imageUploadLabel.textContent = 'Upload your countertop image:';
        imageUploadLabel.style.marginTop = '20px';
        container.appendChild(imageUploadLabel);

        // File Input for Image Upload
        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.id = 'uploadImage';
        imageInput.style.display = 'block';
        imageInput.style.margin = '20px auto';
        container.appendChild(imageInput);

        // Canvas for displaying the image and texture
        const canvas = document.createElement('canvas');
        canvas.id = 'textureCanvas';
        canvas.style.border = '1px solid black';
        container.appendChild(canvas);

        const image = document.createElement('img');
        image.id = 'countertopImage';
        image.style.display = 'none';  // Hidden, we use canvas instead
        container.appendChild(image);

        imageInput.addEventListener('change', function () {
            handleImageUpload(imageInput, image, canvas);
        });

        // Button to apply textures
        const applyTextureBtn = document.createElement('button');
        applyTextureBtn.textContent = 'Apply Texture to Selected Area';
        styleButton(applyTextureBtn);
        container.appendChild(applyTextureBtn);

        applyTextureBtn.addEventListener('click', function () {
            if (isPolygonClosed) {
                applyTexture('https://i.ibb.co/fH3RTKc/203a6c9c-c268-4a6c-9a9b-e5a754bd4ec3.webp', canvas);  // Use the repeating texture
            } else {
                alert("Please finish selecting the countertop area before applying a texture.");
            }
        });

        // Button to clear the selection
        const clearSelectionBtn = document.createElement('button');
        clearSelectionBtn.textContent = 'Clear Selection';
        styleButton(clearSelectionBtn);
        container.appendChild(clearSelectionBtn);

        clearSelectionBtn.addEventListener('click', function () {
            points = [];
            isPolygonClosed = false;
            handleImageUpload(imageInput, image, canvas); // Redraw the image
        });

        // Listen for clicks on the canvas to select the countertop area
        canvas.addEventListener('click', function (event) {
            if (isPolygonClosed) return; // Don't allow more clicks after polygon is closed
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            points.push({ x, y });
            redrawCanvas(canvas, points, image); // Redraw with updated points

            if (points.length > 2 && isCloseEnough(points[0], points[points.length - 1])) {
                isPolygonClosed = true;
                redrawCanvas(canvas, points, image, true); // Redraw and close the polygon
            }
        });
    }

    // Function to handle image upload and display on canvas
    function handleImageUpload(input, imgElement, canvas) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            imgElement.src = e.target.result;
            imgElement.onload = function () {
                const ctx = canvas.getContext('2d');
                canvas.width = imgElement.width;
                canvas.height = imgElement.height;
                ctx.drawImage(imgElement, 0, 0);
            };
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // Function to apply textures only inside the selected area (polygon) and repeat it
    function applyTexture(textureUrl, canvas) {
        const ctx = canvas.getContext('2d');
        const texture = new Image();
        texture.src = textureUrl;

        texture.onload = function () {
            ctx.save();
            // Create a clipping region using the selected points
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.closePath();
            ctx.clip();

            // Create a pattern and fill only the selected area
            const pattern = ctx.createPattern(texture, 'repeat');  // Use 'repeat' to tile the texture
            ctx.fillStyle = pattern;
            ctx.fill();

            ctx.restore();  // Restore context to prevent further clipping
        };
    }

    // Function to redraw the canvas with the countertop image and polygon points
    function redrawCanvas(canvas, points, imgElement, closePolygon = false) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgElement, 0, 0); // Always draw the image first

        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        if (closePolygon) {
            ctx.closePath();
            ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
            ctx.fill(); // Fill the closed polygon with a transparent green
        }
        ctx.stroke();
    }

    // Function to check if two points are close enough to close the polygon
    function isCloseEnough(p1, p2) {
        const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        return distance < 10;  // You can adjust this threshold
    }

    // Style buttons for consistent look
    function styleButton(button) {
        button.style.padding = '14px';
        button.style.backgroundColor = '#0264D9';  // Blue color for contrast
        button.style.color = '#ffffff';  // White text
        button.style.border = 'none';  // Remove borders
        button.style.borderRadius = '10px';  // Rounded corners for modern look
        button.style.cursor = 'pointer';
        button.style.fontSize = '18px';
        button.style.fontWeight = 'bold';
        button.style.margin = '20px 0';  // More spacing around buttons
        button.style.transition = 'all 0.3s ease';
        button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';  // Slight shadow for depth

        button.addEventListener('mouseenter', function () {
            button.style.backgroundColor = '#004C99';  // Darker blue on hover
        });

        button.addEventListener('mouseleave', function () {
            button.style.backgroundColor = '#0264D9';  // Return to original color
        });
    }

    initInterface();  // Initialize the interface when the page loads
})();
