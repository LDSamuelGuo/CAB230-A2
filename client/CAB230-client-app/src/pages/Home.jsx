import React from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}


const Hero = () => (
  <section className="hero">

    <div className="hero__content">
      <h1 className="hero__title">Volcanoes all over the world</h1>
    </div>
  </section>
);

function Features() {

  const featuresData = [
    {
      img: { src: "img/dining.jpg", alt: "Thumbs up icon" }
    }
  ];
  return (
    <article className="features">
      <div className="features__header">
      </div>

      <div className="features__box-wrapper">
        {
          featuresData.map((feature) => (
            <FeatureBox feature={feature} />
          ))
        }
      </div>
    </article>
  );
}


const FeatureBox = ({ feature }) => (
  <div className="features__box">
    <img src={feature.img.src} alt={feature.img.alt} />
  </div>
);
