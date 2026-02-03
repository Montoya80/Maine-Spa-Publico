
export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  APPOINTMENTS = 'APPOINTMENTS',
  PATIENTS = 'PATIENTS',
  PATIENT_DETAIL = 'PATIENT_DETAIL',
  SETTINGS = 'SETTINGS', 
  EMPLOYEES = 'EMPLOYEES',
  INVENTORY = 'INVENTORY',
  INTERNAL_CHAT = 'INTERNAL_CHAT',
  CLIENT_BOOKING = 'CLIENT_BOOKING',
  CLIENT_PORTAL = 'CLIENT_PORTAL'
}

export type UserRole = 'admin' | 'client';

export type Permission = 
  | 'all' 
  | 'view_appointments' 
  | 'edit_appointments' 
  | 'view_patients' 
  | 'edit_patients' 
  | 'view_finance' 
  | 'view_costs'   
  | 'manage_settings'
  | 'manage_employees'
  | 'manage_inventory'
  | 'delete_data';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  area?: string; // 'reception' | 'medical' | 'admin' | 'general'
}

export interface WorkSchedule {
    dayOfWeek: number;
    active: boolean;
    startTime: string;
    endTime: string;
}

export interface AttendanceRecord {
    date: string; 
    checkIn?: string; 
    checkOut?: string; 
    status: 'present' | 'absent' | 'late' | 'active';
}

export interface FileDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  url: string;
  category: 'ine_front' | 'ine_back' | 'diploma' | 'cert' | 'other';
  uploadDate: string;
}

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  phone: string; 
  birthDate: string; 
  hireDate: string; 
  jobTitle: string; 
  password?: string;
  role: string; 
  permissions: Permission[];
  avatarUrl: string;
  workSchedule: WorkSchedule[]; 
  attendanceLog: AttendanceRecord[]; 
  status: 'active' | 'suspended' | 'terminated';
  isPresent?: boolean;
  documents?: FileDocument[];
}

export interface Patient {
  id: string;
  clientCode: string; 
  fileNumber: string; 
  fullName: string;
  password?: string; 
  birthDate: string; 
  email: string;
  phone: string;
  skinType: string;
  allergies: string;
  emergencyContact: { name: string; phone: string; };
  history: ClinicalNote[];
  progressPhotos: ProgressPhoto[]; 
  clinicRecommendations: string;
  avatarUrl: string;
  registrationDate?: string; 
  isBlocked?: boolean; 
  documents?: FileDocument[];
  assignedTherapist?: string;
  lastLogin?: string;
  acceptedTerms?: boolean;
  registeredBy?: string;
  specialistHistory?: SpecialistAssignment[];
}

export interface BusinessConfig {
  schedule: { dayOfWeek: number; isOpen: boolean; openTime: string; closeTime: string; }[];
  blockedDates: string[]; 
  blockedSlots: string[];
  contact: { 
    address: string; 
    phone: string; 
    whatsapp: string; 
    whatsappChannel?: string;
    email: string; 
    mapUrl: string; 
    facebookUrl?: string; 
    instagramUrl?: string; 
    tiktokUrl?: string; 
  };
  bankingInfo?: { bankName: string; accountNumber: string; clabe: string; accountHolder: string; };
  supabaseConfig?: SupabaseConfig;
  deploymentConfig?: DeploymentConfig;
  branding?: BrandingConfig;
  brandingHistory?: BrandingConfig[];
  customJobTitles?: string[];
}

export interface BrandingConfig {
  id?: string;
  name?: string;
  logoUrl?: string;
  logoWhiteUrl?: string;
  faviconUrl?: string;
  primaryColor?: string;
  accentColor?: string;
  createdAt?: string;
}

export interface DeploymentConfig {
  githubRepo?: string;
  vercelUrl?: string;
  lastDeploy?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  enabled: boolean;
}

export interface ClinicalNoteMaterial {
  productId: string;
  name: string;
  quantity: number;
  cost: number;
}

export interface ClinicalNote {
  id: string;
  date: string;
  treatment: string;
  observations: string;
  materialsUsed?: ClinicalNoteMaterial[]; 
  therapistName?: string;
}

export interface TreatmentSuggestion {
  plan: string;
  products: string[];
  lifestyleAdvice: string;
}

export interface ProgressPhoto {
  id: string;
  date: string;
  url: string;
  note?: string;
}

export interface SpecialistAssignment {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  assignedBy: string;
  reason?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string; 
  time: string;
  service: string; 
  price: number;
  cost?: number; 
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  assignedTo?: string; 
  paymentVerified?: boolean;
  paymentReference?: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  active: boolean;
  description?: string;
  imageUrl?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discountText: string;
  color: string;
  active: boolean;
  validUntil?: string;
  price?: number;
}

export interface InventoryTransaction {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  date: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  purchasePrice: number; 
  price: number;         
  stock: number;
  active: boolean;
  description?: string;
  imageUrl?: string;
  category?: string;
  categoryType: 'retail' | 'professional'; 
}
