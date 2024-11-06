function firstPersonMovement({ camera, camera_group, viewport }) {

    const {
        listenForKeys,
        startMouseLock,
        getKeys,
        getMouseMovement,
    } = helper();

    const ROT_SPEED = 0.005;
    const MOVE_SPEED = 0.05;
    const RUN_SPEED = 0.1;        
    const UP = new THREE.Vector3(0, 1, 0);

    function animate() {
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
        camera_group.position.add(vec.normalize().multiplyScalar(shift ? RUN_SPEED : MOVE_SPEED));
    }

    // main
    (() => { 
        listenForKeys();
        startMouseLock(viewport);
    })();

    return {
        animate
    };
}