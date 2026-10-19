export const formatCount = (count) => {
  if (count >= 100) return '100+';
  if (count >= 50) return '50+';
  if (count >= 25) return '25+';
  if (count >= 10) return '10+';
  return count.toString();
};

export const divisions = [
  'All',
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh'
];
