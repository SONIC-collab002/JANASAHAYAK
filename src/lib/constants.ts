export const APP_NAME = 'JanSahayak';
export const APP_NAME_HINDI = 'जनसहायक';
export const APP_TAGLINE = 'नागरिक सेवा एवं त्वरित समाधान पोर्टल';

export const ISSUE_CATEGORIES = [
  'Pothole / Road Damage',
  'Garbage Dump / Solid Waste',
  'Street Light Outage',
  'Water Pipeline Leakage',
  'Blocked Drain & Sewage',
  'Encroachment & Illegal Parking',
  'Fallen Tree / Green Waste',
  'Stray Cattle / Animal Hazard',
  'Open Manhole / Danger Zone',
  'Other Civic Grievance',
];

export const CATEGORY_DETAILS: Record<string, { hindi: string; slaDays: number; department: string }> = {
  'Pothole / Road Damage': {
    hindi: 'सड़क का गड्ढा / क्षति',
    slaDays: 2,
    department: 'Public Works Dept (PWD / रस्ता विभाग)',
  },
  'Garbage Dump / Solid Waste': {
    hindi: 'कचरा ढेर / स्वच्छता',
    slaDays: 1,
    department: 'Solid Waste Management (SWM / कचरा व्यवस्थापन)',
  },
  'Street Light Outage': {
    hindi: 'स्ट्रीट लाइट बंद / अंधकार',
    slaDays: 2,
    department: 'Electrical Works Dept (विद्युत विभाग)',
  },
  'Water Pipeline Leakage': {
    hindi: 'पानी की पाइपलाइन रिसाव',
    slaDays: 1,
    department: 'Jal Board / Water Supply (जल प्रदाय विभाग)',
  },
  'Blocked Drain & Sewage': {
    hindi: 'खुली व जाम नाली / सीवेज',
    slaDays: 2,
    department: 'Drainage & Sewerage Board (गटर व मलनिःसारण)',
  },
  'Encroachment & Illegal Parking': {
    hindi: 'फुटपाथ अतिक्रमण व अवैध पार्किंग',
    slaDays: 3,
    department: 'Anti-Encroachment Cell (अतिक्रमण विरोधी दल)',
  },
  'Fallen Tree / Green Waste': {
    hindi: 'गिरा हुआ पेड़ / हरी शाखाएं',
    slaDays: 1,
    department: 'Garden & Tree Authority (उद्यान विभाग)',
  },
  'Stray Cattle / Animal Hazard': {
    hindi: 'आवारा पशु / मवेशी समस्या',
    slaDays: 2,
    department: 'Veterinary & Cattle Dept (पशु चिकित्सा विभाग)',
  },
  'Open Manhole / Danger Zone': {
    hindi: 'खुला मैनहोल / त्वरित खतरा',
    slaDays: 1,
    department: 'Disaster Cell & PWD (आपदा प्रबंधन)',
  },
  'Other Civic Grievance': {
    hindi: 'अन्य जनसमस्या',
    slaDays: 3,
    department: 'Municipal Citizen Facilitation Center (नागरिक सुविधा केंद्र)',
  },
};

export const INDIAN_CIVIC_HELPLINES = [
  { number: '1913', name: 'Nagar Nigam 24x7 Helpline', hindiName: 'नगर निगम कंट्रोल रूम', desc: 'General civic complaints & road work' },
  { number: '1912', name: 'Electricity Emergency (Bijli)', hindiName: 'विद्युत आपातकालीन', desc: 'Power failure, sparks & transformer' },
  { number: '1916', name: 'Jal Board / Water Emergency', hindiName: 'जल बोर्ड हेल्पलाइन', desc: 'Contaminated water or major pipe burst' },
  { number: '1969', name: 'Swachh Bharat Helpline', hindiName: 'स्वच्छ भारत टोल-फ्री', desc: 'Cleanliness & public toilet inspection' },
  { number: '112', name: 'National Emergency Response', hindiName: 'राष्ट्रीय आपातकालीन सेवा', desc: 'Police, fire & medical assistance' },
];

export const MUNICIPAL_CORPORATIONS = [
  { code: 'PMC', name: 'Pune Municipal Corporation (PMC)', city: 'Pune', state: 'Maharashtra' },
  { code: 'BBMP', name: 'Bruhat Bengaluru Mahanagara Palike (BBMP)', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'MCD', name: 'Municipal Corporation of Delhi (MCD)', city: 'New Delhi', state: 'Delhi' },
  { code: 'BMC', name: 'Brihanmumbai Municipal Corporation (BMC)', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'GHMC', name: 'Greater Hyderabad Municipal Corp (GHMC)', city: 'Hyderabad', state: 'Telangana' },
  { code: 'KMC', name: 'Kolkata Municipal Corporation (KMC)', city: 'Kolkata', state: 'West Bengal' },
  { code: 'LMC', name: 'Lucknow Municipal Corporation (LMC)', city: 'Lucknow', state: 'Uttar Pradesh' },
  { code: 'GCC', name: 'Greater Chennai Corporation (GCC)', city: 'Chennai', state: 'Tamil Nadu' },
];

