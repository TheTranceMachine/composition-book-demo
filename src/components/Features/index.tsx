import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 bg-[#171f2d] border-b border-b-slate-800">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="The power of an IDE with the simplicity of a notebook."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
      <div className="absolute right-0 top-[56rem] opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 480" fill="#FFFFFF" className="w-[100%] h-auto">
          <path d="M197.6 42.4 42.4 197.6a60 60 0 0 0 0 84.8l155.2 155.2a60 60 0 0 0 84.8 0l155.2-155.2a60 60 0 0 0 0-84.8L282.4 42.4a60 60 0 0 0-84.8 0Z"></path>
        </svg>
      </div>
      <div className="absolute right-40 top-[56rem] opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="#FFFFFF" className="w-[100%] h-auto">
          <path d="M197.6 42.4 42.4 197.6a60 60 0 0 0 0 84.8l155.2 155.2a60 60 0 0 0 84.8 0l155.2-155.2a60 60 0 0 0 0-84.8L282.4 42.4a60 60 0 0 0-84.8 0Z"></path>
        </svg>
      </div>
      <div className="absolute right-20 top-[56rem] opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" fill="#FFFFFF" className="w-32 h-auto">
          <path d="M197.6 42.4 42.4 197.6a60 60 0 0 0 0 84.8l155.2 155.2a60 60 0 0 0 84.8 0l155.2-155.2a60 60 0 0 0 0-84.8L282.4 42.4a60 60 0 0 0-84.8 0Z"></path>
        </svg>
      </div>
    </>
  );
};

export default Features;
