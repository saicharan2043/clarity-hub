export interface CertificateTemplate {
  id: string;
  name: string;
  linkedType: 'course' | 'assessment';
  linkedItemId: string;
  linkedItemName: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  content: CertificateContent;
}

export interface CertificateContent {
  title: string;
  subtitle: string;
  recognitionText: string;
  descriptionText: string;
  hashtag: string;
  organizationName: string;
  organizationLogo?: string;
}

export interface CourseOption {
  id: string;
  name: string;
  type: 'course' | 'assessment';
}
