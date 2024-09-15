(function () {
    // Dynamically load the Three.js library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = init;
    document.head.appendChild(script);

    // Dynamically create the HTML structure
    function createInterface() {
        // Create container for 3D scene
        const container = document.createElement('div');
        container.id = 'container';
        Object.assign(container.style, {
            width: '100%',
            height: '100vh',
            margin: '0',
            overflow: 'hidden',
        });
        document.body.appendChild(container);

        // Create color change buttons (color squares)
        const colorButtons = document.createElement('div');
        colorButtons.id = 'colorButtons';
        Object.assign(colorButtons.style, {
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 100,
            display: 'flex',
            gap: '10px'
        });
        document.body.appendChild(colorButtons);

        const colors = ['White', 'Black', 'Tornado Gray', 'Charcoal Gray', 'Toasted Almond', 'Milk Chocolate', 'Dark Chocolate'];
        const colorHex = {
            'White': '#FFFFFF',
            'Black': '#000000',
            'Tornado Gray': '#4F4F4F',
            'Charcoal Gray': '#2E2E2E',
            'Toasted Almond': '#D2B48C',
            'Milk Chocolate': '#8B4513',
            'Dark Chocolate': '#5D3A1A'
        };

        colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.style.width = '40px';
            colorDiv.style.height = '40px';
            colorDiv.style.backgroundColor = colorHex[color];
            colorDiv.style.borderRadius = '5px';
            colorDiv.style.cursor = 'pointer';
            colorDiv.addEventListener('click', function () {
                applyColorToCountertop(colorHex[color]);
            });
            colorButtons.appendChild(colorDiv);
        });

        return container;
    }

    // Initialize the 3D scene and add the countertop model
    function init() {
        const container = createInterface();

        // Create the 3D scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Create a simple 3D box representing a countertop
        const geometry = new THREE.BoxGeometry(3, 0.2, 1.5);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const countertopModel = new THREE.Mesh(geometry, material);
        scene.add(countertopModel);

        // Add orbit controls so you can rotate the model
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth rotation

        // Apply color to the countertop
        function applyColorToCountertop(color) {
            countertopModel.material.color.set(color);
        }

        // Render loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();

        // Adjust renderer on window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
})();
