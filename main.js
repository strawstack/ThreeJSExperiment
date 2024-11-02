(() => {

    const { 
        listenForKeys,
        getKeys,
        startMouseLock,
        getMouseMovement,
    } = helper();

    const ROT_SPEED = 0.005;
    const MOVE_SPEED = 0.05;
    const RUN_SPEED = 0.1;

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

        const UP = new THREE.Vector3(0, 1, 0);

        function animate() {
            cube.rotation.x += 0.01; cube.rotation.y += 0.01;

            // Rotation
            const { x, y } = getMouseMovement();
            if (x > 0) camera_group.rotation.y += -1 * x * ROT_SPEED;
            if (x < 0) camera_group.rotation.y += -1 * x * ROT_SPEED;
            if (y > 0) camera.rotation.x += -1 * y * ROT_SPEED;
            if (y < 0) camera.rotation.x += -1 * y * ROT_SPEED;

            const FORWARD = new THREE
                .Vector3(0, 0, -1).
                transformDirection(camera.matrixWorld)
                .projectOnPlane(UP)
                .normalize();
            const LEFT = new THREE
                .Vector3(-1, 0, 0)
                .transformDirection(camera.matrixWorld)
                .projectOnPlane(UP)
                .normalize();

            // Movement
            const { w, a, s, d, shift } = getKeys();
            const vec = new THREE.Vector3( 0, 0, 0 );
            if (w) vec.add(FORWARD);
            if (a) vec.add(LEFT);
            if (s) vec.add(FORWARD.multiplyScalar(-1));
            if (d) vec.add(LEFT.multiplyScalar(-1));
            // console.log(w,a,s,d)
            camera_group.position.add(vec.normalize().multiplyScalar(shift ? RUN_SPEED : MOVE_SPEED));

            renderer.render( scene, camera ); 
        } 
        renderer.setAnimationLoop( animate );
    }

    main();

})();