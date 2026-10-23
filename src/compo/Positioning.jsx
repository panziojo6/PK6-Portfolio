import Mascot from "./Mascot.jsx";
import Floaty from "./Floaty.jsx";

export default function Positioning() {
  return (
    <section className="panel panel--blue positioning" id="about">
      <Floaty kind="dish" size={120} tilt={-8} className="fl fl--tl" />
      <Floaty kind="pin" size={96} tilt={10} delay={1.2} className="fl fl--tr" duration={7} />
      <Floaty kind="chip" size={104} tilt={-12} delay={0.6} className="fl fl--bl" duration={8} />
      <Floaty kind="leaf" size={110} tilt={14} delay={2} className="fl fl--br" duration={6.5} />

      <p className="struck">
        <s>just another data scientist</s>
      </p>
      <h2 className="display display--xl">
        <span>Not a slide deck,</span>
        <span>a pipeline with</span>
        <span>a map on top</span>
      </h2>
      <p className="subtitle">
        Research that ends as running code: a DAG, an API, a live map.
        <br />
        Built on public satellites and cheap hardware, so it can go anywhere.
      </p>

      <div className="positioning__mascot">
        <Mascot size={260} prop="map" mood="wink" delay={0.5} />
      </div>
    </section>
  );
}
