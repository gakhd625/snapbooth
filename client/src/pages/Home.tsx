import { Link } from "wouter";

const Home = () => {
  return (
    <section id="home" className="py-12 md:py-20 px-4 fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h1 className="font-poppins font-bold text-3xl md:text-5xl mb-4">Capture Memories in Style</h1>
            <p className="text-lg mb-6">Create beautiful photo strips with filters, stickers, and custom backgrounds. Perfect for parties, events, or just having fun!</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/photobooth" className="gradient-btn text-white font-poppins py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all">
                Let's Start
              </Link>
              <Link href="/instructions" className="bg-white text-[var(--deep-purple)] font-poppins font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all">
                See How It Works
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="polaroid rotate-1">
                <img 
                  src="https://images.unsplash.com/photo-1522850959516-58f958dde2c1?w=500&h=600&fit=crop" 
                  alt="Friends having fun" 
                  className="photo-preview rounded"
                />
                <p className="text-center mt-2 font-medium">Fun Times!</p>
              </div>
              <div className="polaroid -rotate-2 mt-6">
                <img 
                  src="https://images.unsplash.com/photo-1523895665936-7bfe172b757d?w=500&h=600&fit=crop" 
                  alt="Party photo strip" 
                  className="photo-preview rounded"
                />
                <p className="text-center mt-2 font-medium">Party Vibes</p>
              </div>
              <div className="polaroid rotate-2 mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?w=500&h=600&fit=crop" 
                  alt="Couple photo" 
                  className="photo-preview rounded"
                />
                <p className="text-center mt-2 font-medium">Date Night</p>
              </div>
              <div className="polaroid -rotate-1">
                <img 
                  src="https://images.unsplash.com/photo-1516914589923-f105f1539f65?w=500&h=600&fit=crop" 
                  alt="Family photo" 
                  className="photo-preview rounded"
                />
                <p className="text-center mt-2 font-medium">Family Fun</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
