import includes from './glsl/includes';

const shader = `
precision highp float;


uniform float u_time;
varying vec2 v_texcoord;

${includes}


void main(void)
{
    vec2 uv = v_texcoord;

    vec4 color1 = vec4(0.804,0.247,0.11, 1.0);
    vec4 color2 = vec4(0.937,0.59,0.071, 1.0);
    vec4 color3 = vec4(0.863,0.655,0.129, 1.0);

    float grain = rand(uv);

    vec2 movement = vec2(u_time * 0.01, u_time * -0.01);
    movement *= rotation2d(u_time * 0.005);
    float f = fbm(uv + movement);
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
