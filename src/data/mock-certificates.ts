import { CertificateTemplate, CourseOption } from '@/types/certificate';

export const mockCourseOptions: CourseOption[] = [
  { id: 'course-1', name: 'LV Switchboard Application & Offer Selection', type: 'course' },
  { id: 'course-2', name: 'Advanced Data Structures', type: 'course' },
  { id: 'course-3', name: 'Machine Learning Fundamentals', type: 'course' },
  { id: 'assessment-1', name: 'JavaScript Certification Exam', type: 'assessment' },
  { id: 'assessment-2', name: 'Python Developer Assessment', type: 'assessment' },
  { id: 'assessment-3', name: 'Cloud Architecture Assessment', type: 'assessment' },
];

export const mockCertificateTemplates: CertificateTemplate[] = [
  {
    id: 'cert-1',
    name: 'LV Switchboard Completion Certificate',
    linkedType: 'course',
    linkedItemId: 'course-1',
    linkedItemName: 'LV Switchboard Application & Offer Selection',
    status: 'active',
    createdAt: '2025-01-10',
    updatedAt: '2025-01-12',
    content: {
      title: 'Certificate',
      subtitle: 'This certificate is proudly presented to',
      recognitionText: 'In Recognition of Achievement In',
      descriptionText: 'This certification acknowledges successful completion of training within Schneider Electric. You are welcome to share your certificate in accordance with our social media policy.',
      hashtag: '#WhatDidYouLearnToday?',
      organizationName: 'Schneider Electric',
    },
  },
  {
    id: 'cert-2',
    name: 'JavaScript Certification',
    linkedType: 'assessment',
    linkedItemId: 'assessment-1',
    linkedItemName: 'JavaScript Certification Exam',
    status: 'active',
    createdAt: '2025-01-08',
    updatedAt: '2025-01-08',
    content: {
      title: 'Certificate',
      subtitle: 'This certificate is proudly presented to',
      recognitionText: 'In Recognition of Achievement In',
      descriptionText: 'This certification acknowledges successful completion of the JavaScript assessment. You are welcome to share your certificate in accordance with our social media policy.',
      hashtag: '#CodeWithConfidence',
      organizationName: 'Tech Academy',
    },
  },
  {
    id: 'cert-3',
    name: 'ML Fundamentals Certificate',
    linkedType: 'course',
    linkedItemId: 'course-3',
    linkedItemName: 'Machine Learning Fundamentals',
    status: 'inactive',
    createdAt: '2025-01-05',
    updatedAt: '2025-01-07',
    content: {
      title: 'Certificate',
      subtitle: 'This certificate is proudly presented to',
      recognitionText: 'In Recognition of Achievement In',
      descriptionText: 'This certification acknowledges successful completion of Machine Learning training. Share your achievement with pride.',
      hashtag: '#MLMaster',
      organizationName: 'AI Institute',
    },
  },
];

// Helper functions
export const getCertificateById = (id: string) => 
  mockCertificateTemplates.find(c => c.id === id);

export const getCourseOptions = () => mockCourseOptions;

export const getGroupedCourseOptions = () => ({
  courses: mockCourseOptions.filter(o => o.type === 'course'),
  assessments: mockCourseOptions.filter(o => o.type === 'assessment'),
});
