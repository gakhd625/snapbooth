import { Link } from "wouter";

const Home = () => {
  return (
    <section id="home" className="py-12 md:py-32 px-4 fade-in">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="font-poppins font-bold text-4xl md:text-6xl mb-6 px-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--deep-purple)] to-[var(--light-pink)]">
            SnapBooth - Free Online Photo Booth
          </span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto px-4">
          Create beautiful photo strips with filters, stickers, and custom backgrounds.
          Perfect for parties, events, or just having fun at home!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link 
            href="/photobooth" 
            className="bg-gradient-to-r from-[var(--deep-purple)] to-[var(--light-pink)] text-white font-poppins font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            START CAPTURING
          </Link>
          <Link 
            href="/instructions" 
            className="bg-white/70 backdrop-blur-sm text-[var(--deep-purple)] border border-[var(--deep-purple)]/20 font-poppins font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            See How It Works
          </Link>
        </div>
        
        <div className="w-full max-w-md mx-auto relative">
          <div className="polaroid p-2 pb-5 mx-auto transform rotate-0 shadow-xl">
            <div className="bg-gradient-to-r from-[var(--lavender)] to-[var(--light-pink)] p-2 rounded">
              <div className="grid grid-cols-1 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative bg-white/10 backdrop-blur aspect-[4/3] rounded overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${1516914589923 + i * 1000}-f105f1539f65?w=500&h=400&fit=crop`}
                      alt={`Sample photo ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center mt-3 font-medium">Memories - April 20, 2025</p>
          </div>
        </div>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          SnapBooth - The modern online photo strip creator
        </p>
      </div>
    </section>
  );
};

export default Home;
