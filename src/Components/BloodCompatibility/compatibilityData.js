export const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const compatibilityData = {
  'O-': {
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['O-'],
    description: 'Universal Donor',
    rarity: 'Critical',
    note: 'Universal red blood cell donor, vital in emergency trauma centers.'
  },
  'O+': {
    canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
    canReceiveFrom: ['O-', 'O+'],
    description: 'Most Common',
    rarity: 'High',
    note: 'Most frequently needed blood type for transfusions worldwide.'
  },
  'A-': {
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
    canReceiveFrom: ['A-', 'O-'],
    description: 'Type A Negative',
    rarity: 'Medium',
    note: 'Can donate red blood cells to any A or AB patient.'
  },
  'A+': {
    canDonateTo: ['A+', 'AB+'],
    canReceiveFrom: ['A-', 'A+', 'O-', 'O+'],
    description: 'Type A Positive',
    rarity: 'Common',
    note: 'Second most common group, high demand for platelets and plasma.'
  },
  'B-': {
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
    canReceiveFrom: ['B-', 'O-'],
    description: 'Type B Negative',
    rarity: 'Rare',
    note: 'One of the rarest blood groups, crucial for regular sickle cell patients.'
  },
  'B+': {
    canDonateTo: ['B+', 'AB+'],
    canReceiveFrom: ['B-', 'B+', 'O-', 'O+'],
    description: 'Type B Positive',
    rarity: 'Medium',
    note: 'High demand in trauma surgery and acute clinical treatments.'
  },
  'AB-': {
    canDonateTo: ['AB-', 'AB+'],
    canReceiveFrom: ['AB-', 'A-', 'B-', 'O-'],
    description: 'Universal Plasma',
    rarity: 'Very Rare',
    note: 'Rarest blood type overall; universal donor for life-saving plasma.'
  },
  'AB+': {
    canDonateTo: ['AB+'],
    canReceiveFrom: ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
    description: 'Universal Recipient',
    rarity: 'Rare',
    note: 'Can safely receive red blood cells from any blood type.'
  }
};

export const bloodColors = {
  'O+': '#dc2626',
  'O-': '#ef4444',
  'A+': '#be123c',
  'A-': '#f43f5e',
  'B+': '#16a34a',
  'B-': '#22c55e',
  'AB+': '#c2410c',
  'AB-': '#ea580c'
};

export const getDemandLevel = (bloodType, stats) => {
  const count = stats.bloodTypeCounts?.[bloodType] || 0;
  const total = stats.totalRequests || 1;

  if (count > total * 0.2) return { level: 'High', color: 'bg-red-500', textColor: 'text-red-600 dark:text-red-400' };
  if (count > total * 0.1) return { level: 'Medium', color: 'bg-orange-500', textColor: 'text-orange-600 dark:text-orange-400' };
  if (count > total * 0.05) return { level: 'Low', color: 'bg-yellow-500', textColor: 'text-yellow-600 dark:text-yellow-400' };
  return { level: 'Stable', color: 'bg-green-500', textColor: 'text-green-600 dark:text-green-400' };
};
