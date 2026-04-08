import { Patient, Medication, Appointment, Invoice, Staff, Department, Role, Tenant, Qualification, Availability, Shift } from './types';

export const initialPatients: Patient[] = [
  {id:'P-4521',name:'Priya Sharma',age:42,gender:'F',ward:'ICU',doctor:'Dr. Mehta',diagnosis:'Cardiac arrest',blood:'O+',status:'critical',date:'Apr 4, 2026'},
  {id:'P-4520',name:'Rajan Nair',age:67,gender:'M',ward:'General B',doctor:'Dr. Iyer',diagnosis:'Hypertension',blood:'B+',status:'stable',date:'Apr 3, 2026'},
  {id:'P-4519',name:'Ananya Reddy',age:35,gender:'F',ward:'Neurology',doctor:'Dr. Kapoor',diagnosis:'Migraine cluster',blood:'A+',status:'admitted',date:'Apr 3, 2026'},
  {id:'P-4518',name:'Mohammed Ali',age:55,gender:'M',ward:'Orthopedics',doctor:'Dr. Singh',diagnosis:'Hip replacement',blood:'AB+',status:'discharged',date:'Apr 2, 2026'},
  {id:'P-4517',name:'Kavitha Menon',age:28,gender:'F',ward:'OB/GYN',doctor:'Dr. Verma',diagnosis:'Prenatal care',blood:'O-',status:'scheduled',date:'Apr 5, 2026'},
  {id:'P-4516',name:'Sunita Rao',age:61,gender:'F',ward:'Cardiology',doctor:'Dr. Mehta',diagnosis:'Arrhythmia',blood:'A-',status:'admitted',date:'Apr 1, 2026'},
  {id:'P-4515',name:'Arjun Pillai',age:44,gender:'M',ward:'General A',doctor:'Dr. Singh',diagnosis:'Post appendectomy',blood:'B-',status:'stable',date:'Mar 31, 2026'},
  {id:'P-4514',name:'Deepa Thomas',age:31,gender:'F',ward:'OB/GYN',doctor:'Dr. Verma',diagnosis:'32 weeks pregnancy',blood:'A+',status:'admitted',date:'Mar 30, 2026'},
];

export const meds: Medication[] = [
  {name:'Paracetamol 500mg',cat:'Analgesic',qty:12,max:200,low:true},
  {name:'Amoxicillin 250mg',cat:'Antibiotic',qty:148,max:300,low:false},
  {name:'Metformin 500mg',cat:'Antidiabetic',qty:95,max:200,low:false},
  {name:'Atorvastatin 20mg',cat:'Statin',qty:23,max:150,low:true},
  {name:'Omeprazole 20mg',cat:'Proton Pump Inhibitor',qty:180,max:250,low:false},
  {name:'Amlodipine 5mg',cat:'Antihypertensive',qty:74,max:200,low:false},
  {name:'Cetirizine 10mg',cat:'Antihistamine',qty:210,max:300,low:false},
  {name:'Aspirin 75mg',cat:'Antiplatelet',qty:18,max:200,low:true},
  {name:'Diazepam 5mg',cat:'Benzodiazepine',qty:60,max:100,low:false},
  {name:'Ciprofloxacin 500mg',cat:'Fluoroquinolone',qty:88,max:200,low:false},
  {name:'Ibuprofen 400mg',cat:'NSAID',qty:155,max:250,low:false},
  {name:'Furosemide 40mg',cat:'Loop Diuretic',qty:14,max:150,low:true},
];

export const appointments: Appointment[] = [
  {time:'9:00 AM',patient:'Sunita Rao',doctor:'Dr. Mehta',type:'Cardio checkup',department:'Cardiology',status:'admitted'},
  {time:'9:30 AM',patient:'Arjun Pillai',doctor:'Dr. Singh',type:'Post-op review',department:'Orthopedics',status:'admitted'},
  {time:'10:00 AM',patient:'Leela Krishnan',doctor:'Dr. Kapoor',type:'MRI consultation',department:'Neurology',status:'stable'},
  {time:'10:45 AM',patient:'Farhan Sheikh',doctor:'Dr. Iyer',type:'Diabetes follow-up',department:'General',status:'admitted'},
  {time:'11:30 AM',patient:'Deepa Thomas',doctor:'Dr. Verma',type:'Prenatal checkup',department:'OB/GYN',status:'admitted'},
  {time:'2:00 PM',patient:'Suresh Kumar',doctor:'Dr. Iyer',type:'General consultation',department:'General',status:'scheduled'},
  {time:'3:30 PM',patient:'Meena Bhat',doctor:'Dr. Mehta',type:'ECG reading',department:'Cardiology',status:'scheduled'},
  {time:'4:15 PM',patient:'Rahul Gupta',doctor:'Dr. Kapoor',type:'EEG consultation',department:'Neurology',status:'scheduled'},
];

export const invoices: Invoice[] = [
  {id:'INV-2841',patient:'Priya Sharma',department:'ICU',services:'ICU stay, ventilator, medication',amount:'₹48,500',insurance:'Partial',status:'overdue',dueDate:'Apr 2'},
  {id:'INV-2840',patient:'Mohammed Ali',department:'Orthopedics',services:'Hip replacement surgery, rehab',amount:'₹1,24,000',insurance:'Full',status:'paid',dueDate:'Apr 3'},
  {id:'INV-2839',patient:'Rajan Nair',department:'General',services:'Consultation, lab tests, meds',amount:'₹8,200',insurance:'None',status:'pending',dueDate:'Apr 8'},
  {id:'INV-2838',patient:'Ananya Reddy',department:'Neurology',services:'MRI scan, specialist consultation',amount:'₹22,750',insurance:'Partial',status:'pending',dueDate:'Apr 7'},
  {id:'INV-2837',patient:'Sunita Rao',department:'Cardiology',services:'ECG, Holter monitor, 2-day stay',amount:'₹31,600',insurance:'Full',status:'paid',dueDate:'Apr 1'},
  {id:'INV-2836',patient:'Deepa Thomas',department:'OB/GYN',services:'Prenatal package, scan, vitamins',amount:'₹18,000',insurance:'None',status:'paid',dueDate:'Mar 28'},
];

export const initialDepartments: Department[] = [
  { id: 'D-01', name: 'Cardiology', head: 'Dr. Vikram Mehta', description: 'Deals with disorders of the heart as well as some parts of the circulatory system.' },
  { id: 'D-02', name: 'Neurology', head: 'Dr. Sunita Kapoor', description: 'Deals with disorders of the nervous system, including the brain and spinal cord.' },
  { id: 'D-03', name: 'Orthopedics', head: 'Dr. Ravi Singh', description: 'Focuses on injuries and diseases of your body\'s musculoskeletal system.' },
  { id: 'D-04', name: 'General Medicine', head: 'Dr. Anita Iyer', description: 'Prevention, diagnosis, and treatment of adult diseases.' },
  { id: 'D-05', name: 'OB/GYN', head: 'Dr. Preethi Verma', description: 'Obstetrics and gynecology, dealing with female reproductive health.' },
  { id: 'D-06', name: 'ICU', head: 'Nurse Lakshmi R.', description: 'Intensive care unit providing critical care and life support.' },
];

export const initialRoles: Role[] = [
  { id: 'R-01', name: 'Doctor', description: 'General Medical Practitioner' },
  { id: 'R-02', name: 'Senior Consultant', description: 'Senior Specialist' },
  { id: 'R-03', name: 'Surgeon', description: 'Surgical Specialist' },
  { id: 'R-04', name: 'Head Nurse', description: 'Nursing Department Head' },
  { id: 'R-05', name: 'Staff Nurse', description: 'General Nursing Staff' },
];

export const initialTenants: Tenant[] = [
  { id: 'T-01', name: 'MediCore Main', location: 'Downtown' },
  { id: 'T-02', name: 'MediCore North', location: 'North Hills' },
  { id: 'T-03', name: 'MediCore South', location: 'South Park' },
];

export const initialQualifications: Qualification[] = [
  { id: 'Q-01', name: 'MBBS', description: 'Bachelor of Medicine, Bachelor of Surgery' },
  { id: 'Q-02', name: 'MD', description: 'Doctor of Medicine' },
  { id: 'Q-03', name: 'MS', description: 'Master of Surgery' },
  { id: 'Q-04', name: 'BSc Nursing', description: 'Bachelor of Science in Nursing' },
  { id: 'Q-05', name: 'MSc Nursing', description: 'Master of Science in Nursing' },
];

export const initialAvailabilities: Availability[] = [
  { id: 'A-01', name: 'Available', description: 'Doctor is available for consultation' },
  { id: 'A-02', name: 'In Surgery', description: 'Doctor is currently in surgery' },
  { id: 'A-03', name: 'On Leave', description: 'Doctor is on leave' },
  { id: 'A-04', name: 'Off Duty', description: 'Doctor is off duty' },
  { id: 'A-05', name: 'OPD', description: 'Outpatient Department' },
];

export const initialShifts: Shift[] = [
  { id: 'SH-01', name: '9AM–5PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { id: 'SH-02', name: '7AM–3PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { id: 'SH-03', name: '8AM–4PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { id: 'SH-04', name: '6AM–2PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { id: 'SH-05', name: '2PM–10PM', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
  { id: 'SH-06', name: 'Night Shift', days: ['Saturday', 'Sunday'] },
];

export const staffList: Staff[] = [
  {id:'S-001',name:'Dr. Vikram Mehta',role:'Senior Consultant',department:'Cardiology',specialization:['Interventional Cardiology'],qualifications:['MBBS', 'MD'],phone:'+91 98400 11001',status:'admitted',assignedShifts:[{id:'1', days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], shifts:['7AM–3PM']}], opdWindow: '15 min', hospital: 'MediCore Main', isActive: true, availability: 'Available'},
  {id:'S-002',name:'Dr. Sunita Kapoor',role:'Consultant',department:'Neurology',specialization:['Stroke', 'Epilepsy'],qualifications:['MBBS', 'MD'],phone:'+91 98400 11002',status:'admitted',assignedShifts:[{id:'1', days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], shifts:['8AM–4PM']}], opdWindow: '20 min', hospital: 'MediCore Main', isActive: true, availability: 'Available'},
  {id:'S-003',name:'Dr. Ravi Singh',role:'Senior Surgeon',department:'Orthopedics',specialization:['Joint Replacement'],qualifications:['MBBS', 'MS'],phone:'+91 98400 11003',status:'scheduled',assignedShifts:[{id:'1', days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], shifts:['6AM–2PM']}], opdWindow: '', hospital: 'MediCore Main', isActive: true, availability: 'In Surgery'},
  {id:'S-004',name:'Dr. Anita Iyer',role:'Consultant',department:'General Medicine',specialization:['Diabetes', 'Endocrinology'],qualifications:['MBBS', 'MD'],phone:'+91 98400 11004',status:'admitted',assignedShifts:[{id:'1', days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], shifts:['8AM–5PM']}], opdWindow: '10 min', hospital: 'MediCore Main', isActive: true, availability: 'Available'},
  {id:'S-005',name:'Dr. Preethi Verma',role:'Consultant',department:'OB/GYN',specialization:['High-Risk Pregnancy'],qualifications:['MBBS', 'MD'],phone:'+91 98400 11005',status:'admitted',assignedShifts:[{id:'1', days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], shifts:['9AM–5PM']}], opdWindow: '15 min', hospital: 'MediCore Main', isActive: true, availability: 'Available'},
  {id:'S-101',name:'Nurse Lakshmi R.',role:'Head Nurse',department:'ICU',specialization:['Critical Care'],qualifications:['BSc Nursing', 'MSc Nursing'],phone:'+91 98400 11101',status:'admitted',assignedShifts:[{id:'1', days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], shifts:['7AM–7PM']}], opdWindow: '', hospital: 'MediCore Main', isActive: true, availability: 'Available'},
  {id:'S-102',name:'Nurse Kavya M.',role:'Staff Nurse',department:'Cardiology',specialization:['Cardiac Monitoring'],qualifications:['BSc Nursing'],phone:'+91 98400 11102',status:'admitted',assignedShifts:[{id:'1', days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], shifts:['7AM–3PM']}], opdWindow: '', hospital: 'MediCore Main', isActive: true, availability: 'Available'},
];
