const helper = () => {

    const keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        shift: false
    };

    const mouseMove = {x: 0, y: 0};

    function listenForKeys() {
        document.addEventListener("keydown", e => {
            keys[e.key.toLowerCase()] = true;
            keys["shift"] = e.shiftKey;
        });
        document.addEventListener("keyup", e => {
            keys[e.key.toLowerCase()] = false;
            keys["shift"] = e.shiftKey;
        });
    }

    function getKeys() {
        return keys;
    }

    function startMouseLock(canvas) {
        canvas.addEventListener("click", async () => {
            await canvas.requestPointerLock();
        });
        canvas.addEventListener("mousemove", e => {
            mouseMove.x = e.movementX;
            mouseMove.y = e.movementY;
        });
    }

    function getMouseMovement() {
        if (document.pointerLockElement === null) {
            mouseMove.x = 0;
            mouseMove.y = 0;
            return mouseMove;
        } else {
            const {x, y} = mouseMove;
            mouseMove.x = 0;
            mouseMove.y = 0;
            return {x, y};
        }

    }

    return {
        listenForKeys,
        getKeys,
        startMouseLock,
        getMouseMovement,
    };

}