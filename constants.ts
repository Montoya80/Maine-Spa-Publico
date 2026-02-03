
import { Employee, Product, Permission, WorkSchedule, Patient, Appointment, Service, Promotion, BusinessConfig } from './types';

const DEFAULT_SCHEDULE: WorkSchedule[] = [
    { dayOfWeek: 1, active: true, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 2, active: true, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 3, active: true, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 4, active: true, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 5, active: true, startTime: '09:00', endTime: '18:00' },
    { dayOfWeek: 6, active: true, startTime: '10:00', endTime: '14:00' },
    { dayOfWeek: 0, active: false, startTime: '00:00', endTime: '00:00' },
];

export const ROLE_TEMPLATES: Record<string, Permission[]> = {
    "Administrador Maestro": ['all'],
    "Administrador Jr.": ['view_appointments', 'edit_appointments', 'view_patients', 'edit_patients', 'manage_inventory', 'view_finance', 'view_costs'],
    "Recepcionista": ['view_appointments', 'edit_appointments', 'view_patients'],
    "Especialista / Médico": ['view_appointments', 'view_patients', 'edit_patients', 'manage_inventory'],
    "Ventas / Retail": ['view_appointments', 'manage_inventory'],
    "Enfermería": ['view_appointments', 'view_patients', 'edit_patients']
};

export const JOB_TITLES = Object.keys(ROLE_TEMPLATES);

const today = new Date();
const todayISO = today.toISOString().split('T')[0];
const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
const currentDay = today.getDate().toString().padStart(2, '0');
const birthdayToday = `1990-${currentMonth}-${currentDay}`;

export const MOCK_EMPLOYEES: Employee[] = [
    {
        id: 'e1',
        fullName: 'Administrador Maestro',
        email: 'admin@mainespa.com',
        phone: '5532229490',
        password: '123qweASD',
        birthDate: birthdayToday,
        hireDate: '2022-01-10',
        jobTitle: 'Administrador Maestro',
        role: 'Dueño de Clínica',
        permissions: ['all'],
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
        workSchedule: DEFAULT_SCHEDULE,
        attendanceLog: [],
        status: 'active',
        isPresent: true,
        documents: []
    },
    {
        id: 'e2',
        fullName: 'Dra. Elena Villagrán',
        email: 'elena.v@mainespa.com',
        phone: '5559876543',
        password: 'DraElena2024',
        birthDate: '1988-12-10',
        hireDate: '2023-02-15',
        jobTitle: 'Especialista / Médico',
        role: 'Médico Estético Senior',
        permissions: ROLE_TEMPLATES["Especialista / Médico"],
        avatarUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80',
        workSchedule: DEFAULT_SCHEDULE,
        attendanceLog: [],
        status: 'active',
        isPresent: false,
        documents: []
    },
    {
        id: 'e3',
        fullName: 'Dr. Ricardo Mendieta',
        email: 'ricardo.m@mainespa.com',
        phone: '5544332211',
        password: 'DrRicardo2024',
        birthDate: '1982-05-20',
        hireDate: '2023-06-01',
        jobTitle: 'Especialista / Médico',
        role: 'Dermatólogo Especialista',
        permissions: ROLE_TEMPLATES["Especialista / Médico"],
        avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80',
        workSchedule: DEFAULT_SCHEDULE,
        attendanceLog: [],
        status: 'active',
        isPresent: true,
        documents: []
    },
    {
        id: 'e4',
        fullName: 'Ana Sofía Casas',
        email: 'sofia.c@mainespa.com',
        phone: '5599887766',
        password: 'SofiaSpa2024',
        birthDate: '1995-08-14',
        hireDate: '2024-01-05',
        jobTitle: 'Enfermería',
        role: 'Enfermera e Inyectora',
        permissions: ROLE_TEMPLATES["Enfermería"],
        avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        workSchedule: DEFAULT_SCHEDULE,
        attendanceLog: [],
        status: 'active',
        isPresent: true,
        documents: []
    },
    {
        id: 'e5',
        fullName: 'Karla Jimena Ruiz',
        email: 'recepcion@mainespa.com',
        phone: '5511223344',
        password: 'KarlaReception',
        birthDate: '1998-11-30',
        hireDate: '2024-03-10',
        jobTitle: 'Recepcionista',
        role: 'Coordinadora de Pacientes',
        permissions: ROLE_TEMPLATES["Recepcionista"],
        avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
        workSchedule: DEFAULT_SCHEDULE,
        attendanceLog: [],
        status: 'active',
        isPresent: true,
        documents: []
    },
    {
        id: 'e6',
        fullName: 'Lic. Roberto Valdés',
        email: 'ventas@mainespa.com',
        phone: '5566778899',
        password: 'VentasMaine24',
        birthDate: '1992-02-25',
        hireDate: '2023-10-15',
        jobTitle: 'Ventas / Retail',
        role: 'Consultor de Skincare',
        permissions: ROLE_TEMPLATES["Ventas / Retail"],
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        workSchedule: DEFAULT_SCHEDULE,
        attendanceLog: [],
        status: 'active',
        isPresent: false,
        documents: []
    }
];

export const INITIAL_PRODUCTS: Product[] = [
    // PROFESIONAL (USO INTERNO)
    { id: 'ip1', name: 'Botox 100U Allergan', purchasePrice: 2800, price: 5500, stock: 12, active: true, category: 'Toxinas', categoryType: 'professional' },
    { id: 'ip2', name: 'Juvederm Voluma 1ml', purchasePrice: 1950, price: 4200, stock: 8, active: true, category: 'Rellenos', categoryType: 'professional' },
    { id: 'ip3', name: 'Restylane Kysse 1ml', purchasePrice: 1800, price: 3900, stock: 5, active: true, category: 'Rellenos', categoryType: 'professional' },
    { id: 'ip4', name: 'Radiesse 1.5ml', purchasePrice: 2400, price: 6200, stock: 4, active: true, category: 'Bioestimuladores', categoryType: 'professional' },
    { id: 'ip5', name: 'NCTF 135HA (Caja 5 viales)', purchasePrice: 3200, price: 8500, stock: 3, active: true, category: 'Mesoterapia', categoryType: 'professional' },
    { id: 'ip6', name: 'Peeling Químico Mandélico 30%', purchasePrice: 950, price: 1800, stock: 6, active: true, category: 'Peels', categoryType: 'professional' },
    { id: 'ip7', name: 'Hialuronidasa Liporase', purchasePrice: 450, price: 1200, stock: 15, active: true, category: 'Enzimas', categoryType: 'professional' },
    
    // RETAIL (VENTA A PACIENTES)
    { id: 'ir1', name: 'ISDIN Fusion Water 50ml', purchasePrice: 380, price: 640, stock: 25, active: true, category: 'Skincare', categoryType: 'retail' },
    { id: 'ir2', name: 'Skinceuticals CE Ferulic', purchasePrice: 1850, price: 3450, stock: 10, active: true, category: 'Skincare', categoryType: 'retail' },
    { id: 'ir3', name: 'La Roche-Posay Effaclar Gel', purchasePrice: 220, price: 450, stock: 18, active: true, category: 'Limpieza', categoryType: 'retail' },
    { id: 'ir4', name: 'CeraVe Crema Hidratante', purchasePrice: 180, price: 380, stock: 22, active: true, category: 'Cuerpo', categoryType: 'retail' },
    { id: 'ir5', name: 'Heliocare 360 Airgel', purchasePrice: 410, price: 720, stock: 14, active: true, category: 'Skincare', categoryType: 'retail' },
    { id: 'ir6', name: 'Toleriane Sensitive Fluide', purchasePrice: 290, price: 540, stock: 12, active: true, category: 'Skincare', categoryType: 'retail' },
    { id: 'ir7', name: 'Vichy Mineral 89', purchasePrice: 340, price: 620, stock: 15, active: true, category: 'Serums', categoryType: 'retail' }
];

export const MOCK_PATIENTS: Patient[] = [
    {
        id: 'p1',
        clientCode: 'MAR94021',
        fileNumber: '0100',
        fullName: 'Maria Lopez Perez',
        email: 'maria@example.com',
        phone: '5512345678',
        password: '1234',
        birthDate: '1994-02-15',
        skinType: 'Mixta / Grasa',
        allergies: 'Aspirina',
        emergencyContact: { name: 'Jose Lopez', phone: '5587654321' },
        history: [],
        progressPhotos: [],
        clinicRecommendations: '',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
        registrationDate: '2024-01-10',
        isBlocked: false,
        documents: [],
        assignedTherapist: 'e2',
        registeredBy: 'Administrador Maestro'
    }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: 'a1',
        patientId: 'p1',
        patientName: 'Maria Lopez Perez',
        date: todayISO,
        time: '10:00',
        service: 'Limpieza Facial Médica',
        price: 1500,
        cost: 400,
        status: 'confirmed',
        assignedTo: 'e2',
        paymentVerified: true,
        paymentReference: 'MAR94021-0100-01'
    }
];

export const INITIAL_SERVICES: Service[] = [
    { id: 's1', name: 'Botox (Tercio Superior)', duration: 30, price: 3500, active: true, description: 'Tratamiento de toxina para arrugas dinámicas.' },
    { id: 's2', name: 'Limpieza Profunda Hydra', duration: 60, price: 1200, active: true, description: 'Tratamiento facial con succión e hidratación.' },
    { id: 's3', name: 'Relleno de Labios (1ml)', duration: 45, price: 4500, active: true, description: 'Armonización y volumen labial con ácido hialurónico.' },
    { id: 's4', name: 'Peeling Químico', duration: 40, price: 1800, active: true, description: 'Renovación celular profunda para manchas y acné.' }
];

export const INITIAL_PROMOS: Promotion[] = [
    { id: 'pr1', title: 'Mes de la Madre', description: '20% en Bioestimuladores.', discountText: '20% OFF', color: 'bg-rose-500', active: true, validUntil: '2024-05-31' },
    { id: 'pr2', title: 'Lunes de Facial', description: 'Limpieza Hydra 2x1 los lunes.', discountText: '2x1', color: 'bg-teal-500', active: true, validUntil: '2024-12-31' }
];

export const INITIAL_CONFIG: BusinessConfig = {
  schedule: [
      { dayOfWeek: 1, isOpen: true, openTime: '09:00', closeTime: '18:00' },
      { dayOfWeek: 2, isOpen: true, openTime: '09:00', closeTime: '18:00' },
      { dayOfWeek: 3, isOpen: true, openTime: '09:00', closeTime: '18:00' },
      { dayOfWeek: 4, isOpen: true, openTime: '09:00', closeTime: '18:00' },
      { dayOfWeek: 5, isOpen: true, openTime: '09:00', closeTime: '18:00' },
      { dayOfWeek: 6, isOpen: true, openTime: '10:00', closeTime: '14:00' },
      { dayOfWeek: 0, isOpen: false, openTime: '00:00', closeTime: '00:00' },
  ],
  blockedDates: [],
  blockedSlots: [],
  contact: { 
      address: "Calle Ardilla #93, Col. Benito Juarez, Neza", 
      phone: "555-0000", 
      whatsapp: "5615582029", 
      email: "contacto@mainespa.com", 
      mapUrl: "",
      facebookUrl: "https://facebook.com/mainespa",
      instagramUrl: "https://instagram.com/mainespa",
      tiktokUrl: "https://tiktok.com/@mainespa"
  },
  bankingInfo: { bankName: 'Banorte', accountNumber: '0000000000', clabe: '072000000000000000', accountHolder: 'Maine SPA Center' },
  branding: {
    primaryColor: '#8E7D6F', // Taupe Sobrio
    accentColor: '#2D241E',  // Marrón Ébano
    name: 'Maine SPA Center'
  }
};

export const MEXICAN_BANKS = ["BBVA", "Banorte", "HSBC", "Santander", "Citibanamex", "Scotiabank", "Banco Azteca", "Inbursa", "Bancoppel"];
