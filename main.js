(() => {

    const { 

    } = helper();

    function main() {
        const viewport = document.querySelector(".viewport");
        const view_size = viewport.getBoundingClientRect();
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 
            75, view_size.width / view_size.height, 0.1, 1000 
        );
        
        const camera_group = new THREE.Group();
        camera_group.add(camera);
        camera_group.position.z = 5;
        
        const renderer = new THREE.WebGLRenderer({
            canvas: viewport
        });
        renderer.setSize( view_size.width, view_size.height );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } ); 
        const cube = new THREE.Mesh( geometry, material ); 

        scene.add( cube );
        scene.add( camera_group );

        const { animate: fpAnimate } = firstPersonMovement({ camera, camera_group, viewport });

        function animate() {
            cube.rotation.x += 0.01; 
            cube.rotation.y += 0.01;

            fpAnimate();

            renderer.render( scene, camera ); 
        } 
        renderer.setAnimationLoop( animate );
    }

    main();

})();