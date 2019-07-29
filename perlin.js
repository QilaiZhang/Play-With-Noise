const Gradient = [];
let i = 0;
let j = 0;
for (i = 0; i < 10; i = i + 1) {
    Gradient[i] = [];
    for (j = 0; j < 10; j = j + 1) {
        const a = math_random();
        Gradient[i][j] = [a,math_sqrt(1-math_pow(a,2))];
    }
}

function lerp(a0, a1, w) {
    return  (1-w) * a0 + w * a1;
}

function dotGridGradient(ix,iy,x,y) {
    const dx = x - ix;
    const dy = y - iy;
    return dx * head(Gradient[iy][ix]) + dy * tail(Gradient[iy][ix]);
}

function perlin(x, y) {
    const x0 = math_floor(x);
    const x1 = x0 + 1;
    const y0 = math_floor(y);
    const y1 = y0 + 1;
    
    const sx = x - x0;
    const sy = y - y0;
    
    const n00 = dotGridGradient(x0, y0, x, y);
    const n10 = dotGridGradient(x1, y0, x, y);
    const ix0 = lerp(n00, n10, sx);
    
    const n01 = dotGridGradient(x0, y1, x, y);
    const n11 = dotGridGradient(x1, y1, x, y);
    const ix1 = lerp(n01, n11, sx);
    
    return lerp(ix0, ix1, sy); 
}

function point(grey) {
    return color(square,1-grey,1-grey,1-grey);
}

function colorful_pixel_scheme(i, j, n) {
    const x = j / n * 3;
    const y = i / n * 3;
    return point((perlin(x,y)+1)/2);
}

function picture(n, pixel_scheme) {
    function make_row(i, j) {
        return j === 0 ? square
            : beside_frac((j - 1) / j,
                          make_row(i, j - 1),
                          pixel_scheme(i, j, n));
    }
    function make_square(i) {
        return i === 0 ? square
            : stack_frac((i - 1) / i, 
                         make_square(i - 1),
                         make_row(i, n)
                         );
    }
    return make_square(n);
}

show(picture(200, colorful_pixel_scheme));