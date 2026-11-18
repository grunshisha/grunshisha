// Static vanilla-JavaScript version of the blue meshy WebGL background.
// Enhances the hero only; the page stays usable if WebGL2 is unavailable.
(() => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;background:transparent";
  hero.prepend(canvas);

  const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, powerPreference: "low-power" });
  if (!gl) {
    console.info("WebGL2 is unavailable; showing the regular hero background.");
    canvas.remove();
    return;
  }

  const colors = [
    [0,0.02,0.05],[0,0.04,0.08],[0,0.06,0.12],[0,0.08,0.18],[0,0.1,0.24],
    [0,0.14,0.32],[0,0.2,0.4],[0,0.24,0.48],[0,0.3,0.55],[0.05,0.35,0.6],
    [0.08,0.4,0.65],[0.1,0.45,0.7],[0.15,0.5,0.75],[0.2,0.58,0.8],[0.25,0.65,0.85],
    [0.3,0.72,0.9],[0.4,0.78,0.92],[0.5,0.85,0.95],[0.7,0.9,0.97],[0.85,0.95,1]
  ];
  const palette = colors.map(color => `vec3(${color.join(",")})`).join(",\n  ");
  const vertexSource = `#version 300 es
    in vec2 aPosition;
    void main(){gl_Position=vec4(aPosition,0.0,1.0);}`;
  const fragmentSource = `#version 300 es
    precision highp float;
    out vec4 outColor;
    uniform vec2 uResolution;
    uniform float uTime;
    const int NUM_COLORS=20;
    vec3 seaColors[NUM_COLORS]=vec3[](${palette});
    vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
    float noise2D(vec2 v){
      const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
      vec2 i=floor(v+dot(v,C.yy));
      vec2 x0=v-i+dot(i,C.xx);
      vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
      vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
      i=mod(i,289.0);
      vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
      vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
      m=m*m; m=m*m;
      vec3 x=2.0*fract(p*C.www)-1.0;
      vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
      m*=1.792843-0.853734*(a0*a0+h*h);
      vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
      return 130.0*dot(m,g);
    }
    float fbm(vec2 st){float value=0.0;float amplitude=0.5;float freq=1.0;for(int i=0;i<8;i++){value+=amplitude*noise2D(st*freq);freq*=2.0;amplitude*=0.5;}return value;}
    void main(){
      vec2 uv=(gl_FragCoord.xy/uResolution.xy)*2.0-1.0;
      uv.x*=uResolution.x/uResolution.y;
      uv*=0.3;
      float t=uTime*0.25;
      float waveAmp=0.2+0.15*noise2D(vec2(t,27.7));
      uv.x+=waveAmp*sin(uv.y*4.0+t);
      uv.y+=waveAmp*sin(uv.x*4.0-t);
      float r=length(uv); float angle=atan(uv.y,uv.x);
      float swirlStrength=1.2*(1.0-smoothstep(0.0,1.0,r));
      angle+=swirlStrength*sin(uTime+r*5.0);
      uv=vec2(cos(angle),sin(angle))*r;
      float n=fbm(uv);
      n+=0.2*sin(t+n*3.0);
      float noiseVal=0.5*(n+1.0);
      float idx=clamp(noiseVal,0.0,1.0)*float(NUM_COLORS-1);
      int iLow=int(floor(idx)); int iHigh=min(iLow+1,NUM_COLORS-1); float f=fract(idx);
      vec3 color=mix(seaColors[iLow],seaColors[iHigh],f);
      float alpha=(iLow==0&&iHigh==0)?0.0:0.72;
      outColor=vec4(color,alpha);
    }`;

  function compileShader(type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Mesh background shader compilation failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) { canvas.remove(); return; }
  const program = gl.createProgram();
  if (!program) { canvas.remove(); return; }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Mesh background shader link failed:", gl.getProgramInfoLog(program));
    canvas.remove();
    return;
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  const vao = gl.createVertexArray();
  const buffer = gl.createBuffer();
  if (!vao || !buffer) { canvas.remove(); return; }
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "uResolution");
  const time = gl.getUniformLocation(program, "uTime");
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0,0,0,0);

  let frame = 0;
  let startTime = performance.now();
  let width = 0;
  let height = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function resize() {
    const rect = hero.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, Math.round(rect.width * dpr));
    height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }
  function render(now) {
    resize();
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.uniform2f(resolution, width, height);
    gl.uniform1f(time, reducedMotion.matches ? 0 : (now - startTime) * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    if (!reducedMotion.matches && !document.hidden) frame = requestAnimationFrame(render);
  }
  function start() { if (!frame && !document.hidden) frame = requestAnimationFrame(render); }
  function stop() { if (frame) cancelAnimationFrame(frame); frame = 0; }
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
  reducedMotion.addEventListener?.("change", () => { stop(); start(); });
  window.addEventListener("resize", resize, { passive: true });
  start();
})();
