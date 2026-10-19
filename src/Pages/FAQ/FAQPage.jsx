import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqCategories } from '../utils/faqData';
import FAQAccordion from './FAQAccordion';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestion(openQuestion === key ? null : key);
  };

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
    setOpenQuestion(null);
  };

  return (
    <div className="py-12 md:py-16 bg-base-100 relative overflow-hidden">
      {/* Subtle Professional Ambient Mesh */}
      <div 
        className="absolute top-16 -left-20 w-96 h-96 bg-gradient-to-tr from-red-500/5 to-rose-500/10 dark:from-red-950/20 dark:to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" 
        style={{ animationDuration: '7s' }}
      ></div>
      <div 
        className="absolute bottom-16 -right-20 w-96 h-96 bg-gradient-to-bl from-rose-500/5 to-red-500/10 dark:from-rose-950/20 dark:to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" 
        style={{ animationDuration: '9s', animationDelay: '1.5s' }}
      ></div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="inline-flex items-center gap-2 bg-base-200 border-2 border-red-100 dark:border-red-900/50 px-4 py-2 rounded-full mb-4 shadow-sm">
              <HelpCircle className="text-red-600 dark:text-red-400" size={16} />
              <span className="text-red-600 dark:text-red-400 font-bold text-sm">FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-base-content mb-4">
              How Can We Help You?
            </h1>
            <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto">
              Find answers to common questions about blood donation, eligibility, and our platform
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl pb-8">
          {/* FAQ Categories - 4 Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {faqCategories.map((category, categoryIndex) => {
              const Icon = category.icon;
              const isActive = activeCategory === categoryIndex;
              const colorClasses = {
                red: 'from-red-500 to-red-600 shadow-red-200 dark:shadow-red-900/30',
                blue: 'from-blue-500 to-blue-600 shadow-blue-200 dark:shadow-blue-900/30',
                green: 'from-green-500 to-green-600 shadow-green-200 dark:shadow-green-900/30'
              };

              return (
                <div
                  key={categoryIndex}
                  onClick={() => toggleCategory(categoryIndex)}
                  className={`group bg-base-200 border-2 border-base-300 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                    isActive ? 'border-red-300 dark:border-red-900/50 shadow-xl shadow-gray-300 dark:shadow-gray-900/70 scale-105' : 'hover:border-red-200 dark:hover:border-red-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${colorClasses[category.color]} rounded-lg md:rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="text-white" size={18} />
                    </div>
                    <ChevronDown
                      className={`text-gray-400 transition-transform duration-300 ${
                        isActive ? 'rotate-180 text-red-600' : 'group-hover:text-red-600'
                      }`}
                      size={18}
                    />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${
                    isActive ? 'text-red-600 dark:text-red-400' : 'text-base-content group-hover:text-red-600 dark:group-hover:text-red-400'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-base-content/70 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="mt-4 w-full h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expandable Questions Section */}
          {activeCategory !== null && (
            <FAQAccordion
              category={faqCategories[activeCategory]}
              openQuestion={openQuestion}
              toggleQuestion={toggleQuestion}
              activeCategory={activeCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
