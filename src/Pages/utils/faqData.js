import { Droplet, Users, Shield, Clock } from 'lucide-react';

export const faqCategories = [
  { 
    name: 'Getting Started', 
    icon: Droplet, 
    color: 'red',
    description: 'Basic information about blood donation',
    questions: [
      {
        question: 'What is blood donation?',
        answer: 'Blood donation is a voluntary procedure where you give blood that can be used to help save lives. Your donated blood is tested, processed, and given to patients who need blood transfusions.'
      },
      {
        question: 'How does the platform work?',
        answer: 'Simply register as a donor with your blood type and location. When someone needs blood, they can search for compatible donors in their area. You\'ll be notified of urgent requests that match your blood type.'
      },
      {
        question: 'Is this service free?',
        answer: 'Yes! Our platform is completely free for both donors and recipients. Our mission is to save lives by making blood donation accessible to everyone.'
      },
      {
        question: 'Who can become a blood donor?',
        answer: 'Generally, healthy individuals aged 18-65 years, weighing at least 50kg, with normal blood pressure and hemoglobin levels can donate blood. Specific eligibility criteria may vary by location.'
      },
      {
        question: 'How often can I donate blood?',
        answer: 'Men can donate whole blood every 12 weeks (3 months), and women can donate every 16 weeks (4 months). Always follow medical guidance and ensure you meet all eligibility criteria.'
      }
    ]
  },
  { 
    name: 'Donation Process', 
    icon: Clock, 
    color: 'blue',
    description: 'Step-by-step donation procedure',
    questions: [
      {
        question: 'How long does donation take?',
        answer: 'The entire process takes about 45-60 minutes, including registration, health screening, the actual donation (8-10 minutes), and rest time.'
      },
      {
        question: 'What should I do before donating?',
        answer: 'Get a good night\'s sleep, eat a healthy meal, drink plenty of water, bring a valid ID, and wear comfortable clothing with sleeves that can be rolled up.'
      },
      {
        question: 'What happens during donation?',
        answer: 'First, you\'ll register and have a health screening. Then you\'ll relax in a donation chair while about 470ml of blood is collected. Finally, you\'ll rest and have refreshments.'
      },
      {
        question: 'What should I do after donating?',
        answer: 'Rest for 10-15 minutes and have refreshments. Drink extra fluids for the next 24 hours. Keep the bandage on for a few hours. Avoid heavy lifting or strenuous exercise for 24 hours.'
      },
      {
        question: 'When will I know my blood type?',
        answer: 'Your blood type will be determined during testing and you\'ll receive this information within 1-2 weeks, usually via email or through your donor portal.'
      }
    ]
  },
  { 
    name: 'Finding Donors', 
    icon: Users, 
    color: 'green',
    description: 'How to search and connect with donors',
    questions: [
      {
        question: 'How do I find compatible donors?',
        answer: 'Use our search feature to find donors by blood type and location. You can filter results by distance, availability, and last donation date.'
      },
      {
        question: 'How do I contact a donor?',
        answer: 'Once you find a compatible donor, you can send them a request through our platform. They will receive a notification and can respond directly to you.'
      },
      {
        question: 'What if no donors are available?',
        answer: 'You can create an urgent request that will be sent to all compatible donors in your area. You can also expand your search radius or contact local blood banks.'
      },
      {
        question: 'How do I create an urgent blood request?',
        answer: 'Go to the "Create Request" section, fill in your blood type, location, hospital details, and urgency level. The system will automatically notify compatible donors in your area.'
      },
      {
        question: 'Can I search donors by location?',
        answer: 'Yes, you can search for donors within a specific radius of your location. You can set the distance range from 5km to 50km to find the nearest available donors.'
      }
    ]
  },
  { 
    name: 'Safety & Privacy', 
    icon: Shield, 
    color: 'blue',
    description: 'Security and health information',
    questions: [
      {
        question: 'Is donating blood safe?',
        answer: 'Yes, absolutely! Blood donation is very safe. All equipment is sterile and used only once. You cannot get any infection from donating blood.'
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data privacy very seriously. Your personal and medical information is encrypted and stored securely. We never share your data with third parties without your consent.'
      },
      {
        question: 'How is donated blood tested?',
        answer: 'All donated blood undergoes rigorous testing for infectious diseases including HIV, hepatitis B & C, syphilis, and other blood-borne pathogens.'
      },
      {
        question: 'What safety measures are in place during donation?',
        answer: 'We use sterile, single-use equipment for all donations. Medical professionals screen all donors, and strict hygiene standards are maintained at all blood collection sites.'
      },
      {
        question: 'Will I get sick after donating blood?',
        answer: 'Most people feel fine after donating. You might feel slightly tired or dizzy, but this usually passes quickly. Drink plenty of fluids and avoid strenuous activity for 24 hours.'
      }
    ]
  }
];
