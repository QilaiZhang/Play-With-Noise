// Random noise

// Use CURVES library
const noise_pic = t => make_point(math_random(),math_random());
(draw_points_on(40000))(noise_pic);

// Use CURVES library
const noise_wave = t => make_point(t,math_random());
(draw_connected(10))(noise_wave);

// Use SOUNDS library
const noise_sound = make_sound(t=>math_random(), 1);
play(noise_sound);