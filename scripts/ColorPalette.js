// COLORS

const black = '#000000',
    white = '#FFFFFF',
    red = '#FF0000',
    crimson = '#660000',
    scarlet = '#CC3333',
    orange = '#FF9900',
    gold = '#FFCC00',
    yellow = '#FFFF00',
    naplesYellow = '#FFFF99',
    lime = '#00FF00',
    aqua = '#00FFFF',
    purple = '#6600FF',
    pink = '#FF33ff';

// PALETTES

const explosionPalette = [
    crimson,
    scarlet,
    orange,
    gold,
    yellow,
    naplesYellow,
    white,
]

// CREATE ALPHA PALETTE

const getAlphaPalette = (color) => {
    // Take The Color.
    // Convert the Color to RGB
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    const   r = parseInt(result[1], 16),
            g = parseInt(result[2], 16),
            b = parseInt(result[3], 16);
    const palette = [`rgba(${r},${g},${b},1)`];
    for(let i = 9; i > 0; i--){
        palette.unshift(`rgba(${r},${g},${b},0.${i})`)
    }
    return palette;
}