import { OfferType, Category, SubCategory, Module, Lesson } from '@/types/content-hub';

export const mockOfferTypes: OfferType[] = [
  {
    id: 'bt',
    name: 'B.Tech',
    description: 'Bachelor of Technology programs',
    categoryCount: 4,
    icon: 'GraduationCap',
    color: 'bg-emerald-500',
  },
  {
    id: 'mt',
    name: 'M.Tech',
    description: 'Master of Technology programs',
    categoryCount: 3,
    icon: 'Award',
    color: 'bg-blue-500',
  },
  {
    id: 'cert',
    name: 'Certifications',
    description: 'Professional certification courses',
    categoryCount: 6,
    icon: 'BadgeCheck',
    color: 'bg-purple-500',
  },
  {
    id: 'diploma',
    name: 'Diploma',
    description: 'Diploma programs',
    categoryCount: 2,
    icon: 'FileText',
    color: 'bg-amber-500',
  },
];

export const mockCategories: Category[] = [
  { id: 'cs', offerTypeId: 'bt', name: 'Computer Science', description: 'CS & Engineering', subCategoryCount: 3 },
  { id: 'ec', offerTypeId: 'bt', name: 'Electronics', description: 'ECE Department', subCategoryCount: 2 },
  { id: 'me', offerTypeId: 'bt', name: 'Mechanical', description: 'Mechanical Engineering', subCategoryCount: 4 },
  { id: 'cv', offerTypeId: 'bt', name: 'Civil', description: 'Civil Engineering', subCategoryCount: 2 },
  { id: 'mt-cs', offerTypeId: 'mt', name: 'Computer Science', description: 'Advanced CS', subCategoryCount: 2 },
  { id: 'mt-ai', offerTypeId: 'mt', name: 'AI & ML', description: 'Artificial Intelligence', subCategoryCount: 3 },
];

export const mockSubCategories: SubCategory[] = [
  { id: 'ds', categoryId: 'cs', name: 'Data Structures', description: 'Fundamental data structures', moduleCount: 4 },
  { id: 'algo', categoryId: 'cs', name: 'Algorithms', description: 'Algorithm design', moduleCount: 3 },
  { id: 'dbms', categoryId: 'cs', name: 'Database Management', description: 'DBMS concepts', moduleCount: 5 },
  { id: 'dig', categoryId: 'ec', name: 'Digital Electronics', description: 'Digital circuits', moduleCount: 3 },
  { id: 'ana', categoryId: 'ec', name: 'Analog Electronics', description: 'Analog circuits', moduleCount: 2 },
];

export const mockModules: Module[] = [
  // Data Structures modules
  { id: 'm1', subCategoryId: 'ds', name: 'Arrays', description: 'Array fundamentals', lessonCount: 4, order: 1 },
  { id: 'm2', subCategoryId: 'ds', name: 'Linked Lists', description: 'Linked list operations', lessonCount: 5, order: 2 },
  { id: 'm3', subCategoryId: 'ds', name: 'Stacks & Queues', description: 'Stack and queue structures', lessonCount: 3, order: 3 },
  { id: 'm4', subCategoryId: 'ds', name: 'Trees', description: 'Tree data structures', lessonCount: 6, order: 4 },
  // Algorithms modules
  { id: 'm5', subCategoryId: 'algo', name: 'Sorting Algorithms', description: 'Various sorting techniques', lessonCount: 5, order: 1 },
  { id: 'm6', subCategoryId: 'algo', name: 'Searching Algorithms', description: 'Binary search and more', lessonCount: 3, order: 2 },
  { id: 'm7', subCategoryId: 'algo', name: 'Graph Algorithms', description: 'BFS, DFS, Dijkstra', lessonCount: 6, order: 3 },
  // DBMS modules
  { id: 'm8', subCategoryId: 'dbms', name: 'SQL Basics', description: 'Introduction to SQL', lessonCount: 4, order: 1 },
  { id: 'm9', subCategoryId: 'dbms', name: 'Normalization', description: 'Database normalization forms', lessonCount: 3, order: 2 },
  { id: 'm10', subCategoryId: 'dbms', name: 'Transactions', description: 'ACID properties and transactions', lessonCount: 4, order: 3 },
  { id: 'm11', subCategoryId: 'dbms', name: 'Indexing', description: 'Database indexing techniques', lessonCount: 3, order: 4 },
  { id: 'm12', subCategoryId: 'dbms', name: 'Query Optimization', description: 'Optimizing SQL queries', lessonCount: 5, order: 5 },
  // Digital Electronics modules
  { id: 'm13', subCategoryId: 'dig', name: 'Boolean Algebra', description: 'Logic gates and Boolean expressions', lessonCount: 4, order: 1 },
  { id: 'm14', subCategoryId: 'dig', name: 'Combinational Circuits', description: 'Multiplexers, decoders, adders', lessonCount: 5, order: 2 },
  { id: 'm15', subCategoryId: 'dig', name: 'Sequential Circuits', description: 'Flip-flops and counters', lessonCount: 4, order: 3 },
  // Analog Electronics modules
  { id: 'm16', subCategoryId: 'ana', name: 'Diode Circuits', description: 'Diode applications and rectifiers', lessonCount: 3, order: 1 },
  { id: 'm17', subCategoryId: 'ana', name: 'Amplifier Circuits', description: 'BJT and FET amplifiers', lessonCount: 4, order: 2 },
];

export const mockLessons: Lesson[] = [
  { id: 'l1', moduleId: 'm1', title: 'Introduction to Arrays', contentType: 'video', duration: '15:30', order: 1, certificateTemplateId: 'cert-1' },
  { id: 'l2', moduleId: 'm1', title: 'Array Operations', contentType: 'video', duration: '22:15', order: 2 },
  { id: 'l3', moduleId: 'm1', title: 'Array Practice Problems', contentType: 'pdf', order: 3 },
  { id: 'l4', moduleId: 'm1', title: 'Arrays Quiz', contentType: 'quiz', order: 4, certificateTemplateId: 'cert-2' },
  { id: 'l5', moduleId: 'm2', title: 'Singly Linked Lists', contentType: 'video', duration: '18:45', order: 1 },
  { id: 'l6', moduleId: 'm2', title: 'Doubly Linked Lists', contentType: 'video', duration: '20:00', order: 2 },
  { id: 'l7', moduleId: 'm2', title: 'Circular Linked Lists', contentType: 'text', order: 3 },
  { id: 'l8', moduleId: 'm2', title: 'Linked List Assessment', contentType: 'assessment', order: 4, certificateTemplateId: 'cert-1' },
];

// Helper functions
export const getOfferTypeById = (id: string) => mockOfferTypes.find(o => o.id === id);
export const getCategoriesByOfferType = (offerTypeId: string) => mockCategories.filter(c => c.offerTypeId === offerTypeId);
export const getCategoryById = (id: string) => mockCategories.find(c => c.id === id);
export const getSubCategoriesByCategory = (categoryId: string) => mockSubCategories.filter(s => s.categoryId === categoryId);
export const getSubCategoryById = (id: string) => mockSubCategories.find(s => s.id === id);
export const getModulesBySubCategory = (subCategoryId: string) => mockModules.filter(m => m.subCategoryId === subCategoryId);
export const getModuleById = (id: string) => mockModules.find(m => m.id === id);
export const getLessonsByModule = (moduleId: string) => mockLessons.filter(l => l.moduleId === moduleId);
