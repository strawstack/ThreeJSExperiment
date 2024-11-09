(() => {
    const { } = helper();

    function main() {
        const scene = new THREE.Scene();
        const { fog_material, fogAnimate } = fog({ scene });
        
        const viewport = document.querySelector(".viewport");
        const view_size = viewport.getBoundingClientRect();
        
        const camera = new THREE.PerspectiveCamera( 
            75, view_size.width / view_size.height, 0.1, 1000
        );
        
        const camera_group = new THREE.Group();
        camera_group.add(camera);
        camera_group.position.z = 5;
        
        const { animate: fpAnimate } = firstPersonMovement({ camera, camera_group, viewport });

        const renderer = new THREE.WebGLRenderer({
            canvas: viewport
        });
        renderer.setSize( view_size.width, view_size.height );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );

        const fogBox = new THREE.Mesh(
            new THREE.BoxGeometry( 10, 1, 10 ),
            fog_material
        );
        fogBox.position.y = -1;

        const cubes = Array(10).fill(0).map(_ => new THREE.Mesh( geometry, fog_material ));
        cubes.forEach((cube, i) => {
            cube.position.x = 5 + i * 5;
            scene.add(cube);
        });

        scene.add( fogBox );
        scene.add( cube );
        scene.add( camera_group );

        function animate() {
            cube.rotation.x += 0.01; 
            cube.rotation.y += 0.01;

            fpAnimate();
            
            renderer.render( scene, camera ); 

            fogAnimate();
        } 
        renderer.setAnimationLoop( animate );
    }

    main();

})();