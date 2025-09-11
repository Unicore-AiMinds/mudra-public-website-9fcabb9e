import { format, subDays, subHours } from 'date-fns';

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceInquiry: string;
  message: string;
  formType: 'dental' | 'aesthetic';
  submittedAt: Date;
  status: 'new' | 'contacted' | 'follow-up' | 'scheduled' | 'closed';
}

// Generate realistic mock data
const generateMockData = (): FormSubmission[] => {
  const dentalServices = [
    'Dental Implants', 'RCT & Crown', 'Wisdom Tooth Extraction', 'Aligners',
    'Teeth Whitening', 'Scaling & Polishing', 'Pediatric Dentistry', 'Smile Redesign',
    'Full Mouth Rehabilitation', 'Maxillofacial Prosthesis', 'General Inquiry'
  ];

  const aestheticServices = [
    'HydraFacial Skin Rejuvenation', 'Removal of Warts, Skin Tags & Moles',
    'Chemical Peel', 'Body Peel', 'Tattoo Removal (Laser)', 'Hair Transplants',
    'Hifu', 'Skin PRP with Microneedling', 'Semi Permanent Makeup', 'General Inquiry'
  ];

  const names = [
    'Rajesh Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Desai', 'Vikram Singh',
    'Kavya Iyer', 'Rohit Joshi', 'Meera Gupta', 'Arjun Reddy', 'Pooja Agarwal',
    'Sanjay Yadav', 'Nisha Chawla', 'Karan Malhotra', 'Ritu Bansal', 'Deepak Tiwari',
    'Anita Rao', 'Manoj Verma', 'Shweta Kapoor', 'Rahul Saxena', 'Divya Mishra'
  ];

  const statuses: FormSubmission['status'][] = ['new', 'contacted', 'follow-up', 'scheduled', 'closed'];
  
  const submissions: FormSubmission[] = [];

  // Generate submissions for the past 30 days
  for (let i = 0; i < 85; i++) {
    const isAesthetic = Math.random() > 0.55; // Slightly more dental submissions
    const services = isAesthetic ? aestheticServices : dentalServices;
    const name = names[Math.floor(Math.random() * names.length)];
    const [firstName, lastName] = name.split(' ');
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${Math.random() > 0.5 ? 'gmail.com' : 'yahoo.com'}`;
    
    // Generate phone numbers in Indian format
    const phone = `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    
    // Random date within last 30 days
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const submittedAt = subHours(subDays(new Date(), daysAgo), hoursAgo);
    
    const messages = [
      'I would like to know more about this service and book an appointment.',
      'Can you please provide more details about the cost and procedure?',
      'I am interested in scheduling a consultation. What are your available times?',
      'I have been experiencing some issues and would like to discuss treatment options.',
      'Please contact me to discuss the best treatment plan for my needs.',
      'I would like to book an appointment at your earliest convenience.',
      'Can you provide information about the recovery time and aftercare?',
      'I have some questions about the procedure. Please call me back.',
      'Looking for professional treatment. Please share more details.',
      'Interested in your services. Would like to schedule a visit.'
    ];

    submissions.push({
      id: `SUB-${Date.now()}-${i.toString().padStart(3, '0')}`,
      name,
      email,
      phone,
      serviceInquiry: services[Math.floor(Math.random() * services.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      formType: isAesthetic ? 'aesthetic' : 'dental',
      submittedAt,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }

  // Sort by most recent first
  return submissions.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
};

export const mockFormSubmissions = generateMockData();

export const getSubmissionsByType = (type: 'dental' | 'aesthetic') => {
  return mockFormSubmissions.filter(submission => submission.formType === type);
};

export const getSubmissionsByDateRange = (startDate: Date, endDate: Date) => {
  return mockFormSubmissions.filter(submission => 
    submission.submittedAt >= startDate && submission.submittedAt <= endDate
  );
};

export const getSubmissionsByStatus = (status: FormSubmission['status']) => {
  return mockFormSubmissions.filter(submission => submission.status === status);
};

export const getAnalytics = () => {
  const total = mockFormSubmissions.length;
  const dental = getSubmissionsByType('dental').length;
  const aesthetic = getSubmissionsByType('aesthetic').length;
  
  const byStatus = {
    new: getSubmissionsByStatus('new').length,
    contacted: getSubmissionsByStatus('contacted').length,
    'follow-up': getSubmissionsByStatus('follow-up').length,
    scheduled: getSubmissionsByStatus('scheduled').length,
    closed: getSubmissionsByStatus('closed').length,
  };

  // Monthly data for charts
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = subDays(new Date(), i * 30);
    const monthEnd = subDays(new Date(), (i - 1) * 30);
    const monthSubmissions = getSubmissionsByDateRange(monthStart, monthEnd);
    
    monthlyData.push({
      month: format(monthStart, 'MMM yyyy'),
      dental: monthSubmissions.filter(s => s.formType === 'dental').length,
      aesthetic: monthSubmissions.filter(s => s.formType === 'aesthetic').length,
      total: monthSubmissions.length
    });
  }

  return {
    total,
    dental,
    aesthetic,
    byStatus,
    monthlyData
  };
};