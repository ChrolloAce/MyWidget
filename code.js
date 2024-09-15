(function () {
    // Initial variables and configuration
    const PRICE_REGULAR = 26;
    const PRICE_CRYSTAL = 39;
    const MINIMUM_PRICE = 400;
    
    let items = [];
    let totalCost = 0;
    let userInfo = {};
    
    // Function to initialize the interface
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

        const textureBtn1 = document.createElement('button');
        textureBtn1.textContent = 'Apply CrystalTop Texture';
        styleButton(textureBtn1);
        container.appendChild(textureBtn1);

        const textureBtn2 = document.createElement('button');
        textureBtn2.textContent = 'Apply Directional Pour Texture';
        styleButton(textureBtn2);
        container.appendChild(textureBtn2);

        textureBtn1.addEventListener('click', function () {
            applyTexture('https://i.ibb.co/vH56T17/Pour-Swirl2-min.jpg', canvas);
        });

        textureBtn2.addEventListener('click', function () {
            applyTexture('https://i.ibb.co/K21MDPq/Pour-Directional-2.jpg', canvas);
        });

        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Download Final Image';
        styleButton(downloadBtn);
        container.appendChild(downloadBtn);

        downloadBtn.addEventListener('click', function () {
            downloadFinalImage(canvas);
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

    // Function to apply textures to the uploaded image
    function applyTexture(textureUrl, canvas) {
        const ctx = canvas.getContext('2d');
        const texture = new Image();
        texture.src = textureUrl;

        texture.onload = function () {
            ctx.globalAlpha = 0.6;  // Adjust transparency for blending
            ctx.drawImage(texture, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1.0;  // Reset transparency
        };
    }

    // Function to download the final image with the texture applied
    function downloadFinalImage(canvas) {
        const link = document.createElement('a');
        link.download = 'countertop_with_texture.png';
        link.href = canvas.toDataURL();
        link.click();
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

    // CSS Injection
    const style = `
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f8f9fa;
      color: #333;
      padding: 20px;
      overflow-x: hidden;
    }

    h1, h2 {
      text-align: center;
      margin-bottom: 30px;
      color: #0C1729;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }

    #container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
      border-radius: 15px;
      transition: all 0.3s ease;
    }

    input, select, textarea {
      width: 100%;
      padding: 12px;
      margin-bottom: 20px;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease;
    }

    button {
      padding: 14px 20px;
      background-color: #0264D9;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    button:hover {
      background-color: #004C99;
    }

    canvas {
      margin-top: 20px;
      max-width: 100%;
      border: 1px solid #ddd;
    }

    `;

    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = style;
    } else {
        styleElement.appendChild(document.createTextNode(style));
    }
    document.head.appendChild(styleElement);

    // Initialize the interface when the page loads
    initInterface();
})();
