import { Link } from "wouter";

const Instructions = () => {
  return (
    <section id="instructions" className="py-12 bg-white px-4 fade-in">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-poppins font-bold text-2xl md:text-4xl text-center mb-10">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[var(--light-gray)] rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--lavender)] text-white mb-4">
              <span className="font-poppins font-bold text-xl">1</span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">Choose Your Layout</h3>
            <p>Select between 2, 3, or 5 photo layouts for your perfect photo strip.</p>
          </div>
          
          <div className="bg-[var(--light-gray)] rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--light-pink)] text-white mb-4">
              <span className="font-poppins font-bold text-xl">2</span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">Strike a Pose</h3>
            <p>The camera will take photos every 3 seconds. Get ready to pose!</p>
          </div>
          
          <div className="bg-[var(--light-gray)] rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--deep-purple)] text-white mb-4">
              <span className="font-poppins font-bold text-xl">3</span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-3">Customize & Download</h3>
            <p>Add filters, stickers, and backgrounds, then download your creation.</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/photobooth" className="gradient-btn text-white font-poppins font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all">
            Try it Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Instructions;
