function grassMaterial() {
    const customParsVertex = `#include <uv_pars_vertex>
        varying vec2 vUv;
    `;

    const customVertex = `#include <uv_vertex>
        vUv = vec3( uv, 1 ).xy;
    `;

    const customParsFragment = `#include <uv_pars_fragment>
        varying vec2 vUv;
    `;

    const customFragment = `vec4 diffuseColor = vec4( vec3(vUv.x, vUv.y, 0), opacity );
    `;

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { 
        color: 0x00ff00,
    } );

    material.onBeforeCompile = shader => {
        shader.vertexShader = shader.vertexShader.replace(
            `#include <uv_pars_vertex>`,
            customParsVertex
        );
        shader.vertexShader = shader.vertexShader.replace(
            `#include <uv_vertex>`,
            customVertex
        );
        shader.fragmentShader = shader.fragmentShader.replace(
            `#include <uv_pars_fragment>`,
            customParsFragment
        );
        shader.fragmentShader = shader.fragmentShader.replace(
            `vec4 diffuseColor = vec4( diffuse, opacity );`,
            customFragment
        );
    };

    return {
        material
    };
}