import{r as n,j as r}from"./index-eBl4JVWf.js";import{B as U,V as P,a as y,S as T,b as C,C as g,U as $,M as H,R as N,u as I,O as q,c as A,d as J,e as K,f as Z,_ as Q,g as X,v as Y,h as tt,i as et,j as it,k as O,D as st,H as rt,F as at}from"./Stars-hrA3YPdj.js";var nt=Object.defineProperty,ot=(i,t,e)=>t in i?nt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,u=(i,t,e)=>(ot(i,typeof t!="symbol"?t+"":t,e),e);function V(i,t,e,s,a){let l;if(i=i.subarray||i.slice?i:i.buffer,e=e.subarray||e.slice?e:e.buffer,i=t?i.subarray?i.subarray(t,a&&t+a):i.slice(t,a&&t+a):i,e.set)e.set(i,s);else for(l=0;l<i.length;l++)e[l+s]=i[l];return e}function ut(i){return i instanceof Float32Array?i:i instanceof U?i.getAttribute("position").array:i.map(t=>{const e=Array.isArray(t);return t instanceof P?[t.x,t.y,t.z]:t instanceof C?[t.x,t.y,0]:e&&t.length===3?[t[0],t[1],t[2]]:e&&t.length===2?[t[0],t[1],0]:t}).flat()}class lt extends U{constructor(){super(),u(this,"type","MeshLine"),u(this,"isMeshLine",!0),u(this,"positions",[]),u(this,"previous",[]),u(this,"next",[]),u(this,"side",[]),u(this,"width",[]),u(this,"indices_array",[]),u(this,"uvs",[]),u(this,"counters",[]),u(this,"widthCallback",null),u(this,"_attributes"),u(this,"_points",[]),u(this,"points"),u(this,"matrixWorld",new H),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setPoints(t,e){if(t=ut(t),this._points=t,this.widthCallback=e??null,this.positions=[],this.counters=[],t.length&&t[0]instanceof P)for(let s=0;s<t.length;s++){const a=t[s],l=s/(t.length-1);this.positions.push(a.x,a.y,a.z),this.positions.push(a.x,a.y,a.z),this.counters.push(l),this.counters.push(l)}else for(let s=0;s<t.length;s+=3){const a=s/(t.length-1);this.positions.push(t[s],t[s+1],t[s+2]),this.positions.push(t[s],t[s+1],t[s+2]),this.counters.push(a),this.counters.push(a)}this.process()}compareV3(t,e){const s=t*6,a=e*6;return this.positions[s]===this.positions[a]&&this.positions[s+1]===this.positions[a+1]&&this.positions[s+2]===this.positions[a+2]}copyV3(t){const e=t*6;return[this.positions[e],this.positions[e+1],this.positions[e+2]]}process(){const t=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[];let e,s;this.compareV3(0,t-1)?s=this.copyV3(t-2):s=this.copyV3(0),this.previous.push(s[0],s[1],s[2]),this.previous.push(s[0],s[1],s[2]);for(let a=0;a<t;a++){if(this.side.push(1),this.side.push(-1),this.widthCallback?e=this.widthCallback(a/(t-1)):e=1,this.width.push(e),this.width.push(e),this.uvs.push(a/(t-1),0),this.uvs.push(a/(t-1),1),a<t-1){s=this.copyV3(a),this.previous.push(s[0],s[1],s[2]),this.previous.push(s[0],s[1],s[2]);const l=a*2;this.indices_array.push(l,l+1,l+2),this.indices_array.push(l+2,l+1,l+3)}a>0&&(s=this.copyV3(a),this.next.push(s[0],s[1],s[2]),this.next.push(s[0],s[1],s[2]))}this.compareV3(t-1,0)?s=this.copyV3(1):s=this.copyV3(t-1),this.next.push(s[0],s[1],s[2]),this.next.push(s[0],s[1],s[2]),!this._attributes||this._attributes.position.count!==this.counters.length?this._attributes={position:new y(new Float32Array(this.positions),3),previous:new y(new Float32Array(this.previous),3),next:new y(new Float32Array(this.next),3),side:new y(new Float32Array(this.side),1),width:new y(new Float32Array(this.width),1),uv:new y(new Float32Array(this.uvs),2),index:new y(new Uint16Array(this.indices_array),1),counters:new y(new Float32Array(this.counters),1)}:(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:e,z:s}){const a=this._attributes.position.array,l=this._attributes.previous.array,h=this._attributes.next.array,o=a.length;V(a,0,l,0,o),V(a,6,a,0,o-6),a[o-6]=t,a[o-5]=e,a[o-4]=s,a[o-3]=t,a[o-2]=e,a[o-1]=s,V(a,6,h,0,o-6),h[o-6]=t,h[o-5]=e,h[o-4]=s,h[o-3]=t,h[o-2]=e,h[o-1]=s,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}}const ht=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  #include <fog_pars_vertex>
  #include <clipping_planes_pars_vertex>

  attribute vec3 previous;
  attribute vec3 next;
  attribute float side;
  attribute float width;
  attribute float counters;
  
  uniform vec2 resolution;
  uniform float lineWidth;
  uniform vec3 color;
  uniform float opacity;
  uniform float sizeAttenuation;
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
  }
  
  void main() {
    float aspect = resolution.x / resolution.y;
    vColor = vec4(color, opacity);
    vUV = uv;
    vCounters = counters;
  
    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4(position, 1.0) * aspect;
    vec4 prevPos = m * vec4(previous, 1.0);
    vec4 nextPos = m * vec4(next, 1.0);
  
    vec2 currentP = fix(finalPosition, aspect);
    vec2 prevP = fix(prevPos, aspect);
    vec2 nextP = fix(nextPos, aspect);
  
    float w = lineWidth * width;
  
    vec2 dir;
    if (nextP == currentP) dir = normalize(currentP - prevP);
    else if (prevP == currentP) dir = normalize(nextP - currentP);
    else {
      vec2 dir1 = normalize(currentP - prevP);
      vec2 dir2 = normalize(nextP - currentP);
      dir = normalize(dir1 + dir2);
  
      vec2 perp = vec2(-dir1.y, dir1.x);
      vec2 miter = vec2(-dir.y, dir.x);
      //w = clamp(w / dot(miter, perp), 0., 4. * lineWidth * width);
    }
  
    //vec2 normal = (cross(vec3(dir, 0.), vec3(0., 0., 1.))).xy;
    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
    normal.xy *= .5 * w;
    //normal *= projectionMatrix;
    if (sizeAttenuation == 0.) {
      normal.xy *= finalPosition.w;
      normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy * aspect;
    }
  
    finalPosition.xy += normal.xy * side;
    gl_Position = finalPosition;
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    #include <clipping_planes_vertex>
    #include <fog_vertex>
  }
`,ct=parseInt(N.replace(/\D+/g,"")),pt=ct>=154?"colorspace_fragment":"encodings_fragment",ft=`
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform float useGradient;
  uniform float useMap;
  uniform float useAlphaMap;
  uniform float useDash;
  uniform float dashArray;
  uniform float dashOffset;
  uniform float dashRatio;
  uniform float visibility;
  uniform float alphaTest;
  uniform vec2 repeat;
  uniform vec3 gradient[2];
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  void main() {
    #include <logdepthbuf_fragment>
    vec4 diffuseColor = vColor;
    if (useGradient == 1.) diffuseColor = vec4(mix(gradient[0], gradient[1], vCounters), 1.0);
    if (useMap == 1.) diffuseColor *= texture2D(map, vUV * repeat);
    if (useAlphaMap == 1.) diffuseColor.a *= texture2D(alphaMap, vUV * repeat).a;
    if (diffuseColor.a < alphaTest) discard;
    if (useDash == 1.) diffuseColor.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
    diffuseColor.a *= step(vCounters, visibility);
    #include <clipping_planes_fragment>
    gl_FragColor = diffuseColor;     
    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <${pt}>
  }
`;class dt extends T{constructor(t){super({uniforms:{...$.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new g(16777215)},gradient:{value:[new g(16711680),new g(65280)]},opacity:{value:1},resolution:{value:new C(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new C(1,1)}},vertexShader:ht,fragmentShader:ft}),u(this,"lineWidth"),u(this,"map"),u(this,"useMap"),u(this,"alphaMap"),u(this,"useAlphaMap"),u(this,"color"),u(this,"gradient"),u(this,"resolution"),u(this,"sizeAttenuation"),u(this,"dashArray"),u(this,"dashOffset"),u(this,"dashRatio"),u(this,"useDash"),u(this,"useGradient"),u(this,"visibility"),u(this,"repeat"),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(e){this.uniforms.lineWidth.value=e}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(e){this.uniforms.map.value=e}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(e){this.uniforms.useMap.value=e}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(e){this.uniforms.alphaMap.value=e}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(e){this.uniforms.useAlphaMap.value=e}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(e){this.uniforms.color.value=e}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(e){this.uniforms.gradient.value=e}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(e){this.uniforms.resolution.value.copy(e)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(e){this.uniforms.sizeAttenuation.value=e}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(e){this.uniforms.dashArray.value=e,this.useDash=e!==0?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(e){this.uniforms.dashOffset.value=e}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(e){this.uniforms.dashRatio.value=e}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(e){this.uniforms.useDash.value=e}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(e){this.uniforms.useGradient.value=e}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(e){this.uniforms.visibility.value=e}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(e){this.uniforms.alphaTest.value=e}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(e){this.uniforms.repeat.value.copy(e)}}}),this.setValues(t)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.gradient=t.gradient,this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray=t.dashArray,this.dashOffset=t.dashOffset,this.dashRatio=t.dashRatio,this.useDash=t.useDash,this.useGradient=t.useGradient,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}const W={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},mt=(i,t=1)=>(i.set(i.subarray(t)),i.fill(-1/0,-t),i);function vt(i,t){const{length:e,local:s,decay:a,interval:l,stride:h}={...W,...t},o=n.useRef(null),[m]=n.useState(()=>new P);n.useLayoutEffect(()=>{i&&(o.current=Float32Array.from({length:e*10*3},(p,d)=>i.position.getComponent(d%3)))},[e,i]);const c=n.useRef(new P),f=n.useRef(0);return A(()=>{if(i&&o.current){if(f.current===0){let p;s?p=i.position:(i.getWorldPosition(m),p=m);const d=1*a;for(let b=0;b<d;b++)p.distanceTo(c.current)<h||(mt(o.current,3),o.current.set(p.toArray(),o.current.length-3));c.current.copy(p)}f.current++,f.current=f.current%l}}),o}const yt=n.forwardRef((i,t)=>{const{children:e}=i,{width:s,length:a,decay:l,local:h,stride:o,interval:m}={...W,...i},{color:c="hotpink",attenuation:f,target:p}=i,d=I(v=>v.size),b=I(v=>v.scene),z=n.useRef(null),[F,G]=n.useState(null),M=vt(F,{length:a,decay:l,local:h,stride:o,interval:m});n.useEffect(()=>{const v=p?.current||z.current.children.find(S=>S instanceof q);v&&G(v)},[M,p]);const R=n.useMemo(()=>new lt,[]),x=n.useMemo(()=>{var v,S;const D=new dt({lineWidth:.1*s,color:c,sizeAttenuation:1,resolution:new C(d.width,d.height)});let _;if(e)if(Array.isArray(e))_=e.find(w=>{const E=w;return typeof E.type=="string"&&E.type==="meshLineMaterial"});else{const w=e;typeof w.type=="string"&&w.type==="meshLineMaterial"&&(_=w)}return typeof((v=_)==null?void 0:v.props)=="object"&&((S=_)==null?void 0:S.props)!==null&&D.setValues(_.props),D},[s,c,d,e]);return n.useEffect(()=>{x.uniforms.resolution.value.set(d.width,d.height)},[d]),A(()=>{M.current&&R.setPoints(M.current,f)}),n.createElement("group",null,J(n.createElement("mesh",{ref:t,geometry:R,material:x}),b),n.createElement("group",{ref:z},e))});class bt extends T{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${Y>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(t){this.uniforms.pixelRatio.value=t}}const k=i=>i&&i.constructor===Float32Array,xt=i=>[i.r,i.g,i.b],B=i=>i instanceof C||i instanceof P||i instanceof X,L=i=>Array.isArray(i)?i:B(i)?i.toArray():[i,i,i];function j(i,t,e){return n.useMemo(()=>{if(t!==void 0){if(k(t))return t;if(t instanceof g){const s=Array.from({length:i*3},()=>xt(t)).flat();return Float32Array.from(s)}else if(B(t)||Array.isArray(t)){const s=Array.from({length:i*3},()=>L(t)).flat();return Float32Array.from(s)}return Float32Array.from({length:i},()=>t)}return Float32Array.from({length:i},e)},[t])}const gt=n.forwardRef(({noise:i=1,count:t=100,speed:e=1,opacity:s=1,scale:a=1,size:l,color:h,children:o,...m},c)=>{n.useMemo(()=>K({SparklesImplMaterial:bt}),[]);const f=n.useRef(null),p=I(x=>x.viewport.dpr),d=L(a),b=n.useMemo(()=>Float32Array.from(Array.from({length:t},()=>d.map(Z.randFloatSpread)).flat()),[t,...d]),z=j(t,l,Math.random),F=j(t,s),G=j(t,e),M=j(t*3,i),R=j(h===void 0?t*3:t,k(h)?h:new g(h),()=>1);return A(x=>{f.current&&f.current.material&&(f.current.material.time=x.clock.elapsedTime)}),n.useImperativeHandle(c,()=>f.current,[]),n.createElement("points",Q({key:`particle-${t}-${JSON.stringify(a)}`},m,{ref:f}),n.createElement("bufferGeometry",null,n.createElement("bufferAttribute",{attach:"attributes-position",args:[b,3]}),n.createElement("bufferAttribute",{attach:"attributes-size",args:[z,1]}),n.createElement("bufferAttribute",{attach:"attributes-opacity",args:[F,1]}),n.createElement("bufferAttribute",{attach:"attributes-speed",args:[G,1]}),n.createElement("bufferAttribute",{attach:"attributes-color",args:[R,3]}),n.createElement("bufferAttribute",{attach:"attributes-noise",args:[M,3]})),o||n.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:p,depthWrite:!1}))}),At=[{name:"Sentinel-2",color:"#22d3ee",radius:3,speed:.55,tilt:[.5,.2,0]},{name:"Sentinel-1",color:"#a78bfa",radius:3.5,speed:-.42,tilt:[1.2,.6,.3]},{name:"GPS",color:"#fbbf24",radius:4,speed:.33,tilt:[.9,-.8,0]},{name:"Galileo",color:"#4ade80",radius:3.25,speed:-.6,tilt:[-.7,.4,.9]},{name:"BeiDou",color:"#fb7185",radius:4.4,speed:.26,tilt:[1.5,.1,-.4]}];function Mt(){const i=n.useRef(),t=n.useMemo(()=>{const s=new Float32Array(6600);for(let a=0;a<2200;a++){const l=Math.random(),h=Math.random(),o=2*Math.PI*l,m=Math.acos(2*h-1),c=2.02;s[a*3]=c*Math.sin(m)*Math.cos(o),s[a*3+1]=c*Math.cos(m),s[a*3+2]=c*Math.sin(m)*Math.sin(o)}return s},[]);return A((e,s)=>{i.current&&(i.current.rotation.y+=s*.08)}),r.jsxs("group",{ref:i,children:[r.jsxs("mesh",{children:[r.jsx("sphereGeometry",{args:[2,64,64]}),r.jsx("meshStandardMaterial",{color:"#0a1f3a",roughness:.6,metalness:.2})]}),r.jsxs("mesh",{children:[r.jsx("sphereGeometry",{args:[2.005,36,24]}),r.jsx("meshBasicMaterial",{color:"#22d3ee",wireframe:!0,transparent:!0,opacity:.08})]}),r.jsxs("points",{children:[r.jsx("bufferGeometry",{children:r.jsx("bufferAttribute",{attach:"attributes-position",args:[t,3]})}),r.jsx("pointsMaterial",{size:.035,color:"#67e8f9",transparent:!0,opacity:.9,sizeAttenuation:!0})]}),r.jsxs("mesh",{children:[r.jsx("sphereGeometry",{args:[2.22,48,48]}),r.jsx("meshBasicMaterial",{color:"#22d3ee",transparent:!0,opacity:.07,side:O})]}),r.jsxs("mesh",{children:[r.jsx("sphereGeometry",{args:[2.45,48,48]}),r.jsx("meshBasicMaterial",{color:"#38bdf8",transparent:!0,opacity:.035,side:O})]}),r.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[r.jsx("torusGeometry",{args:[2.06,.006,8,128]}),r.jsx("meshBasicMaterial",{color:"#22d3ee",transparent:!0,opacity:.5})]}),r.jsxs("mesh",{rotation:[0,0,0],children:[r.jsx("torusGeometry",{args:[2.06,.004,8,128]}),r.jsx("meshBasicMaterial",{color:"#22d3ee",transparent:!0,opacity:.25})]})]})}function _t(){const i=n.useRef();return A(({clock:t})=>{const e=t.getElapsedTime()*.35%1,s=-2.3+e*4.6,a=Math.sqrt(Math.max(.001,2.12**2-s*s));i.current.position.y=s,i.current.scale.set(a,a,1),i.current.material.opacity=.55*Math.sin(e*Math.PI)}),r.jsxs("mesh",{ref:i,rotation:[Math.PI/2,0,0],children:[r.jsx("ringGeometry",{args:[.98,1,96]}),r.jsx("meshBasicMaterial",{color:"#fbbf24",transparent:!0,side:st})]})}function wt({name:i,color:t,radius:e,speed:s,tilt:a,reduced:l}){const h=n.useRef(),o=n.useRef(),m=n.useMemo(()=>Math.random()*Math.PI*2,[]);return A(({clock:c},f)=>{const p=m+c.getElapsedTime()*s;h.current.position.set(Math.cos(p)*e,0,Math.sin(p)*e),h.current.lookAt(0,0,0),o.current&&(o.current.rotation.z+=f*.8)}),r.jsxs("group",{rotation:a,children:[r.jsxs("mesh",{rotation:[Math.PI/2,0,0],children:[r.jsx("torusGeometry",{args:[e,.004,6,160]}),r.jsx("meshBasicMaterial",{color:t,transparent:!0,opacity:.28})]}),r.jsxs("group",{ref:h,children:[r.jsx(yt,{width:.35,length:5,color:new g(t),attenuation:c=>c*c,children:r.jsxs("group",{ref:o,children:[r.jsxs("mesh",{children:[r.jsx("boxGeometry",{args:[.14,.14,.2]}),r.jsx("meshStandardMaterial",{color:"#e5e7eb",metalness:.8,roughness:.3})]}),r.jsxs("mesh",{position:[.3,0,0],children:[r.jsx("boxGeometry",{args:[.36,.02,.16]}),r.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:.9})]}),r.jsxs("mesh",{position:[-.3,0,0],children:[r.jsx("boxGeometry",{args:[.36,.02,.16]}),r.jsx("meshStandardMaterial",{color:t,emissive:t,emissiveIntensity:.9})]}),r.jsx("pointLight",{color:t,intensity:1.2,distance:2})]})}),r.jsx(rt,{center:!0,distanceFactor:l?6.5:11,zIndexRange:[5,0],children:r.jsx("div",{className:"sat-label",style:{color:t},children:i})})]})]})}function jt(){return n.useMemo(()=>Array.from({length:9},(t,e)=>({pos:[(Math.random()-.5)*10,(Math.random()-.5)*6,(Math.random()-.5)*6-1],size:.12+Math.random()*.22,color:["#22d3ee","#a78bfa","#fbbf24","#4ade80"][e%4],kind:e%3})),[]).map((t,e)=>r.jsx(at,{speed:1.2+e%3*.4,rotationIntensity:1.4,floatIntensity:1.6,children:r.jsxs("mesh",{position:t.pos,children:[t.kind===0?r.jsx("icosahedronGeometry",{args:[t.size,0]}):t.kind===1?r.jsx("octahedronGeometry",{args:[t.size,0]}):r.jsx("torusKnotGeometry",{args:[t.size*.6,t.size*.2,48,8]}),r.jsx("meshStandardMaterial",{color:t.color,wireframe:!0,transparent:!0,opacity:.55})]})},e))}function zt({reduced:i=!1}){return r.jsxs(tt,{dpr:[1,1.6],camera:{position:[0,1.2,i?11.5:8.2],fov:42},gl:{antialias:!0,alpha:!0,powerPreference:"high-performance"},style:{background:"transparent"},children:[r.jsx("ambientLight",{intensity:.55}),r.jsx("directionalLight",{position:[6,6,6],intensity:1.6,color:"#dbeafe"}),r.jsx("pointLight",{position:[-6,-3,-4],intensity:1.2,color:"#a78bfa"}),r.jsxs(n.Suspense,{fallback:null,children:[r.jsx(et,{radius:70,depth:40,count:i?500:2200,factor:3,saturation:0,fade:!0,speed:.6}),r.jsx(gt,{count:i?20:70,scale:12,size:2,speed:.3,color:"#67e8f9",opacity:.6}),r.jsxs("group",{position:[0,-.2,0],children:[r.jsx(Mt,{}),r.jsx(_t,{}),At.map(t=>r.jsx(wt,{...t,reduced:i},t.name)),!i&&r.jsx(jt,{})]})]}),r.jsx(it,{enableZoom:!1,enablePan:!1,autoRotate:!i,autoRotateSpeed:.7,minPolarAngle:Math.PI/3,maxPolarAngle:2*Math.PI/3})]})}export{zt as default};
