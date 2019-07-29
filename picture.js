function point(grey) {
    return color(square,1-grey,1-grey,1-grey);
}

function colorful_pixel_scheme(i, j, n) {
    const x = j / n;
    const y = i / n;
    return point(math_random());
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

show(picture(100, colorful_pixel_scheme));