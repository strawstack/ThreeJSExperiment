function kruskal_main() {

    // const canvas = document.querySelector("canvas");
    // const ctx = canvas.getContext("2d");

    const {
        prefix,
        sizes,
        getType,
        getAreas,
        hash,
        type, // ROOM, WALL, or POST
        unionFind,
        kruskal
    } = kruskal_helper();

    const {
        COLS,
        ROWS,
        WIDTH,
        HEIGHT
    } = sizes();

    const ROWS_PRE = prefix(ROWS);
    const COLS_PRE = prefix(COLS);

    const grid = getAreas(ROWS, COLS);

    const colourLookup = {
        [type.POST]: "#999",
        [type.WALL]: "#777",
        [type.ROOM]: "#333",
    };

    // canvas.width = WIDTH;
    // canvas.height = HEIGHT;

    const openWalls = kruskal(Object.values(grid.walls), unionFind(Object.keys(grid.rooms)));
    
    // Draw
    /*
    ROWS.forEach((h, y) => {
        COLS.forEach((w, x) => {
            ctx.fillStyle = colourLookup[getType(x, y)];
            if (openWalls.includes(hash(x, y))) ctx.fillStyle = colourLookup[type.ROOM];
            ctx.fillRect(COLS_PRE[x], ROWS_PRE[y], COLS[x], ROWS[y]);
        });
    }); */

    return {
        COLS: COLS.length,
        ROWS: ROWS.length,
        grid,
        openWalls
    };
}