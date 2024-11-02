(() => {

    const { 
        listenForKeys,
        getKeys,
        startMouseLock,
        getMouseMovement,
    } = helper();

    const ROT_SPEED = 0.05;
    const MOVE_SPEED = 0.05;

    function main() {
        const viewport = document.querySelector(".viewport");
        const view_size = viewport.getBoundingClientRect();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 
            75, view_size.width / view_size.height, 0.1, 1000 
        );
        const camera_group = new THREE.Group();
        camera_group.add(camera);

        const renderer = new THREE.WebGLRenderer({
            canvas: viewport
        });
        renderer.setSize( view_size.width, view_size.height );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
        const cube = new THREE.Mesh( geometry, material ); 
        
        camera_group.position.z = 5;
        
        scene.add( cube );
        scene.add( camera_group );

        listenForKeys();
        startMouseLock(viewport);

        function animate() {
            cube.rotation.x += 0.01; cube.rotation.y += 0.01;

            // Rotation
            const { x, y } = getMouseMovement();
            if (x > 0) camera.rotation.y += ROT_SPEED;
            if (x < 0) camera.rotation.y -= ROT_SPEED;
            if (y > 0) camera_group.rotation.x += ROT_SPEED;
            if (y < 0) camera_group.rotation.x -= ROT_SPEED;

            // Movement
            const { w, a, s, d } = getKeys();
            const vec = new THREE.Vector3( 0, 0, 0 );
            if (w) vec.z -= MOVE_SPEED;
            if (a) vec.x -= MOVE_SPEED;
            if (s) vec.z += MOVE_SPEED;
            if (d) vec.x += MOVE_SPEED;
            camera_group.position.add(vec);

            renderer.render( scene, camera ); 
        } 
        renderer.setAnimationLoop( animate );
    }

    main();

})();