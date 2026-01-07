export type ContentType = 'video' | 'pdf' | 'text' | 'quiz' | 'assessment';

export interface OfferType {
  id: string;
  name: string;
  description: string;
  categoryCount: number;
  icon: string;
  color: string;
}

export interface Category {
  id: string;
  offerTypeId: string;
  name: string;
  description: string;
  subCategoryCount: number;
}

export interface SubCategory {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  moduleCount: number;
}

export interface Module {
  id: string;
  subCategoryId: string;
  name: string;
  description: string;
  lessonCount: number;
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  contentType: ContentType;
  duration?: string;
  order: number;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}
