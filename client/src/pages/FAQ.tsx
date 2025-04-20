import AccordionItem from "@/components/faq/AccordionItem";
import FeedbackForm from "@/components/faq/FeedbackForm";

const faqItems = [
  {
    question: "Do I need to allow camera access?",
    answer: "Yes, you'll need to allow camera access for the photobooth to work. The app only uses your camera while you're actively using the photobooth, and no images are stored on our servers."
  },
  {
    question: "Can I use this on my mobile device?",
    answer: "Yes! SnapBooth works on both desktop and mobile devices. The interface will adapt to your screen size for the best experience."
  },
  {
    question: "Where are my photos stored?",
    answer: "Your photos are processed entirely on your device and aren't uploaded to any server. When you download your photo strip, it's saved directly to your device's storage."
  },
  {
    question: "Can I customize the filters and stickers?",
    answer: "We offer a variety of pre-made filters and stickers to choose from. We're constantly adding new options based on user feedback!"
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-12 bg-white px-4 fade-in">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-poppins font-bold text-2xl md:text-4xl text-center mb-6">Frequently Asked Questions</h2>
        <p className="text-center mb-10">Got questions? We've got answers!</p>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
        
        {/* Feedback Form */}
        <div className="mt-12 p-6 bg-[var(--light-gray)] rounded-xl">
          <h3 className="font-poppins font-semibold text-xl mb-4">Have Feedback or Questions?</h3>
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
