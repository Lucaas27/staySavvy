const Hero = () => {
  return (
    <section className="section-container bg-custom-main py-16 ">
      <div className="flex flex-col gap-2">
        <h1
          className="text-5xl font-bold text-custom-content"
          data-testid="hero-title"
        >
          Find your next stay
        </h1>
        <p
          className="text-2xl text-custom-content"
          data-testid="hero-call2Action"
        >
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </section>
  );
};

export default Hero;
