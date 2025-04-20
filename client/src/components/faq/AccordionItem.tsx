import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

const AccordionItem = ({ question, answer }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button 
        className="w-full flex justify-between items-center p-4 text-left font-poppins font-medium bg-[var(--light-gray)] hover:bg-gray-100 transition-colors"
        onClick={toggleAccordion}
      >
        <span>{question}</span>
        <i className={`bx ${isOpen ? 'bx-chevron-up' : 'bx-chevron-down'} text-xl`}></i>
      </button>
      <div className={`accordion-content bg-white p-4 border-t border-gray-200 ${isOpen ? '' : 'hidden'}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

export default AccordionItem;
