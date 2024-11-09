(() => {

    const { 

    } = helper();

    const {
        fogParsVert,
        fogVert,
        fogParsFrag,
        fogFrag
    } = fogReplace();

    function main() {
        const viewport = document.querySelector(".viewport");
        const view_size = viewport.getBoundingClientRect();
        
        const clock = new THREE.Clock();
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

        const params = {
            fogNearColor: 0xfc4848,
            fogHorizonColor: 0xe4dcff,
            fogDensity: 0.15, // 0.0025,
            fogNoiseSpeed: 100,
            fogNoiseFreq: 0.0012,
            fogNoiseImpact: 0.5
        };

        scene.background = new THREE.Color(params.fogHorizonColor);
        scene.fog = new THREE.FogExp2(params.fogHorizonColor, params.fogDensity);

        const fog_material = new THREE.MeshBasicMaterial({ color: new THREE.Color(0xefd1b5) });

        const fogBox = new THREE.Mesh(
            new THREE.BoxGeometry( 10, 1, 10 ),
            fog_material
        );
        
        fogBox.position.y = -1;

        let terrainShader = null;
        fog_material.onBeforeCompile = shader => {
            shader.vertexShader = shader.vertexShader.replace(
                `#include <fog_pars_vertex>`,
                fogParsVert
            );
            shader.vertexShader = shader.vertexShader.replace(
                `#include <fog_vertex>`,
                fogVert
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <fog_pars_fragment>`,
                fogParsFrag
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                `#include <fog_fragment>`,
                fogFrag
            );
        
            const uniforms = ({
                fogNearColor: { value: new THREE.Color(params.fogNearColor) },
                fogNoiseFreq: { value: params.fogNoiseFreq },
                fogNoiseSpeed: { value: params.fogNoiseSpeed },
                fogNoiseImpact: { value: params.fogNoiseImpact },
                time: { value: 0 }
            });
        
            shader.uniforms = THREE.UniformsUtils.merge([shader.uniforms, uniforms]);
            terrainShader = shader;
        };
        
        const cubes = Array(10).fill(0).map(_ => new THREE.Mesh( geometry, fog_material ));
        cubes.forEach((cube, i) => {
            cube.position.x = 5 + i * 5;
            scene.add(cube);
        });

        scene.add( fogBox );
        scene.add( cube );
        scene.add( camera_group );

        const { animate: fpAnimate } = firstPersonMovement({ camera, camera_group, viewport });

        function animate() {
            const deltaTime = clock.getDelta();

            cube.rotation.x += 0.01; 
            cube.rotation.y += 0.01;

            fpAnimate();

            renderer.render( scene, camera ); 

            if(terrainShader) {
                terrainShader.uniforms.time.value += deltaTime;
            }
        } 
        renderer.setAnimationLoop( animate );
    }

    main();

})();