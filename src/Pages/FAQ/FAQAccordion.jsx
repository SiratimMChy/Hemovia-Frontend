import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ category, openQuestion, toggleQuestion, activeCategory }) => {
  if (!category) return null;

  const Icon = category.icon;
  const colorMap = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600'
  };

  return (
    <div className="bg-base-200 border-2 border-base-300 rounded-2xl shadow-lg shadow-gray-200 dark:shadow-gray-900/50 overflow-hidden hover:border-red-200 dark:hover:border-red-900/50 transition-all">
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${colorMap[category.color] || 'from-blue-500 to-blue-600'} rounded-lg md:rounded-xl flex items-center justify-center shadow-md`}>
            {Icon && <Icon className="text-white" size={18} />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-base-content">
              {category.name}
            </h2>
            <p className="text-base-content/70 text-sm">
              {category.description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {category.questions.map((faq, questionIndex) => {
            const questionKey = `${activeCategory}-${questionIndex}`;
            const isOpen = openQuestion === questionKey;

            return (
              <div
                key={questionIndex}
                className="border-2 border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:border-red-200 transition-all"
              >
                <button
                  onClick={() => toggleQuestion(activeCategory, questionIndex)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 dark:hover:bg-base-300 transition-all"
                >
                  <span className="text-base font-bold text-base-content pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-red-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-4 pb-4">
                    <div className="pt-3 border-t-2 border-base-300">
                      <p className="text-base-content/70 leading-relaxed text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;
