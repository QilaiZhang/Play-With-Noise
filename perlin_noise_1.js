function connect_rigidly_frac(curve1, curve2, n) {
  function c(t) {
    if (t < (n-1) / n) {
      return curve1(n / (n-1) * t);
    } else {
      return curve2(n * t - (n-1));
    }
  }
  return c;
}

function connect_ends_frac(curve1, curve2, n) {
  var start_point_of_curve2 = curve2(0);
  var end_point_of_curve1 = curve1(1);
  return connect_rigidly_frac(
    curve1,
    translate(
      x_of(end_point_of_curve1) - x_of(start_point_of_curve2),
      y_of(end_point_of_curve1) - y_of(start_point_of_curve2)
    )(curve2),n
  );
}

// function Linear_Interpolate(a,b){
//     return x => a * (1-x) + b * x; 
// }

// Linear_Interpolate(0,1)(0.3);

// function Cosine_Interpolate(a,b){
//     const pi = math_PI;
//     return t => 0.5 * (a * (1 + math_cos(pi * t)) +
//                       b * (1 - math_cos(pi * t)));
// }

// Cosine_Interpolate(0,2)(0.5);

function Fade_Interpolate(a,b){
    return t => (b-a) * (6 * math_pow(t,5) - 15 * math_pow(t,4) + 
                         10 * math_pow(t,3)) + a;
}

// const fade = Fade_Interpolate(math_random(),math_random());
// const my_point = t => make_point(t, fade(t));
// (draw_points_squeezed_to_window(40000))(my_point);

function Perlin_Noise(n) {
    const a = math_random();
    const fade = Fade_Interpolate(math_random(),a);
    const curve_0 = t => make_point(t, fade(t));
    function connect(n,a,b,curve_1,k){
        const curve_2 = t => make_point(t, Fade_Interpolate(a,b)(t));
        const curve = connect_ends_frac(curve_1, curve_2, k);
        return n === 1 ? curve : connect(n-1, b, math_random(), curve, k+1);
    }
    return connect(n,a,math_random(),curve_0,2);
}

const my_curve = Perlin_Noise(15);
(draw_connected_full_view(40000))(my_curve);