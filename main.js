(() => {
    const help = helper();
    const {
        getKeys
    } = help;

    const {
        WIDTH,
        HEIGHT,
        createWalls
    } = kruskal_main();

    function main() {
        const scene = new THREE.Scene();
        // const { fog_material, fogAnimate } = fog({ scene });
        
        const viewport = document.querySelector(".viewport");
        const view_size = viewport.getBoundingClientRect();
        
        const camera = new THREE.PerspectiveCamera( 
            75, view_size.width / view_size.height, 0.1, 1000
        );

        const camera2 = new THREE.PerspectiveCamera( 
            75, view_size.width / view_size.height, 0.1, 1000
        );

        camera2.position.x = WIDTH/2;
        camera2.position.y = 400;
        camera2.position.z = HEIGHT/2;
        camera2.rotateX(-1 * Math.PI/2);
        
        const camera_group = new THREE.Group();
        camera_group.add(camera);
        camera_group.position.x = WIDTH/2;
        camera_group.position.y = 2;
        camera_group.position.z = HEIGHT/2;
        
        const { animate: fpAnimate } = firstPersonMovement({ camera, camera_group, viewport, help });

        const renderer = new THREE.WebGLRenderer({
            canvas: viewport
        });
        renderer.setSize( view_size.width, view_size.height );

        const { material } = grassMaterial();

        // const cube = new THREE.Mesh( geometry, material );

        const floor = new THREE.Mesh(
            new THREE.BoxGeometry( WIDTH, 1, HEIGHT ),
            material
        );
        floor.position.x = WIDTH/2;
        floor.position.y = -1;
        floor.position.z = HEIGHT/2;

        // const cubes = Array(10).fill(0).map(_ => new THREE.Mesh( geometry, fog_material ));
        // cubes.forEach((cube, i) => {
        //     cube.position.x = 5 + i * 5;
        //     scene.add(cube);
        // });

        // scene.add( cube );
        scene.add( floor );
        scene.add( camera_group );

        createWalls({ scene });

        function animate() {
            const { space } = getKeys();
            // cube.rotation.x += 0.01; 
            // cube.rotation.y += 0.01;

            fpAnimate();
            
            renderer.render( scene, space ? camera2 : camera );

            // fogAnimate();
        } 
        renderer.setAnimationLoop( animate );
    }

    main();

})();