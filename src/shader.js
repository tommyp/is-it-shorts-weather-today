const shader = `
#ifdef GL_ES
precision highp float;
#endif

uniform float u_time;
varying vec2 v_texcoord;

#define NUM_OCTAVES 5

float rand(vec2 co){
  vec3 product = vec3( sin( dot(co, vec2(0.129898,0.78233))),
                        sin( dot(co, vec2(0.689898,0.23233))),
                        sin( dot(co, vec2(0.434198,0.51833))) );
  vec3 weighting = vec3(4.37585453723, 2.465973, 3.18438);
  return fract(dot(weighting, product));
}

float noise(vec2 p){
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);

    float res = mix(
        mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
        mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(50);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}


void main(void)
{
    vec2 uv = v_texcoord;

    vec4 color1 = vec4(0.804,0.247,0.11, 1.0);
    vec4 color2 = vec4(0.937,0.59,0.071, 1.0);
    vec4 color3 = vec4(0.863,0.655,0.129, 1.0);

    float grain = rand(uv);

    float f = fbm(uv);
    f *= 20.0;
    f += grain;
    f += u_time * 0.2;
    f = fract(f);

    float mixer = smoothstep(0.0, 0.1, f) - smoothstep(0.1, 0.3, f) - smoothstep(0.5, 0.6, f)- smoothstep(0.7, 0.9, f);

    vec4 mixed = mix(color1, color3, mixer);
    vec4 color = mix(mixed, color2, mixer);

    gl_FragColor = color;
}`;

export default shader;
