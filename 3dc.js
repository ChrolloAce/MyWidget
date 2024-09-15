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

        // Create texture buttons
        const textureButtons = document.createElement('div');
        textureButtons.id = 'textureButtons';
        Object.assign(textureButtons.style, {
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 100,
        });
        document.body.appendChild(textureButtons);

        const texture1 = document.createElement('button');
        texture1.textContent = 'Apply Texture 1';
        styleButton(texture1);
        textureButtons.appendChild(texture1);

        const texture2 = document.createElement('button');
        texture2.textContent = 'Apply Texture 2';
        styleButton(texture2);
        textureButtons.appendChild(texture2);

        return { texture1, texture2, container };
    }

    // Style buttons
    function styleButton(button) {
        Object.assign(button.style, {
            padding: '10px',
            margin: '5px',
            backgroundColor: '#0264D9',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
        });
    }

    // Initialize the 3D scene and add the countertop model
    function init() {
        const { texture1, texture2, container } = createInterface();

        // Create the 3D scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const light = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Create a simple 3D box representing a countertop
        const geometry = new THREE.BoxGeometry(2, 0.1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const countertopModel = new THREE.Mesh(geometry, material);
        scene.add(countertopModel);

        const textureLoader = new THREE.TextureLoader();

        // Apply texture 1 when button is clicked
        texture1.addEventListener('click', () => {
            const texture = textureLoader.load('https://i.ibb.co/fH3RTKc/203a6c9c-c268-4a6c-9a9b-e5a754bd4ec3.webp'); // Texture 1
            countertopModel.material.map = texture;
            countertopModel.material.needsUpdate = true;
        });

        // Apply texture 2 when button is clicked
        texture2.addEventListener('click', () => {
            const texture = textureLoader.load('https://i.ibb.co/xm8PmSF/2.png'); // Texture 2
            countertopModel.material.map = texture;
            countertopModel.material.needsUpdate = true;
        });

        // Render loop
        function animate() {
            requestAnimationFrame(animate);
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
