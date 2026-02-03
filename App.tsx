
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PatientList from './components/PatientList';
import PatientDetail from './components/PatientDetail';
import AppointmentManager from './components/AppointmentManager';
import InventoryManager from './components/InventoryManager';
import ClientBooking from './components/ClientBooking';
import ClientPortal from './components/ClientPortal';
import AdminSettings from './components/AdminSettings';
import EmployeeManager from './components/EmployeeManager';
import InternalChat from './components/InternalChat';
import Login from './components/Login';
import FrontPage from './components/FrontPage';
import { ViewState, Patient, Appointment, UserRole, Service, Promotion, BusinessConfig, Employee, Product, InventoryTransaction, ClinicalNote } from './types';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS, INITIAL_SERVICES, INITIAL_PROMOS, INITIAL_CONFIG, MOCK_EMPLOYEES, INITIAL_PRODUCTS } from './constants';

type ActionIntent = 'new_patient' | 'new_appointment' | 'new_employee' | null;

const App: React.FC = () => {
  // Navigation State
  const [showLanding, setShowLanding] = useState(true);
  const [loginTab, setLoginTab] = useState<'client' | 'employee'>('client');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('client'); 
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);

  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  
  // Data State
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [promotions, setPromotions] = useState<Promotion[]>(INITIAL_PROMOS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [inventoryTransactions, setInventoryTransactions] = useState<InventoryTransaction[]>([]);
  const [businessConfig, setBusinessConfig] = useState<BusinessConfig>(INITIAL_CONFIG);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [actionIntent, setActionIntent] = useState<ActionIntent>(null);

  // Helper para generar referencia: INICIALES-EXPEDIENTE-CONSECUTIVO
  const generatePaymentReference = (targetPatient: Patient) => {
      const initials = targetPatient.fullName
          .split(' ')
          .filter(n => n.length > 0)
          .map(n => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 3);
      
      const prevApts = appointments.filter(a => a.patientId === targetPatient.id).length;
      const sequence = (prevApts + 1).toString().padStart(2, '0');
      
      return `${initials}-${targetPatient.fileNumber}-${sequence}`;
  };

  const handleGuestBooking = () => {
      setUserRole('client');
      setSelectedPatient(null);
      setCurrentView(ViewState.CLIENT_BOOKING);
      setIsAuthenticated(true);
      setShowLanding(false);
  };

  const handleLandingLogin = (type: 'client' | 'employee') => { 
      setLoginTab(type); 
      setShowLanding(false); 
      setIsAuthenticated(false);
  };

  const handleLandingBooking = () => { 
      handleGuestBooking();
  };

  const handleBackToLanding = () => { 
      setShowLanding(true); 
      setIsAuthenticated(false); 
  };

  const handleLoginSuccess = (user: Employee | Patient, role: 'admin' | 'client') => {
      if (role === 'admin') {
          setCurrentUser(user as Employee);
          setUserRole('admin');
          setCurrentView(ViewState.DASHBOARD);
      } else {
          setSelectedPatient(user as Patient);
          setUserRole('client');
          setCurrentView(ViewState.CLIENT_PORTAL);
          setCurrentUser(null); 
      }
      setIsAuthenticated(true);
      setShowLanding(false);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
      setCurrentUser(null);
      setSelectedPatient(null);
      setUserRole('client');
      setActionIntent(null);
      setShowLanding(true); 
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== ViewState.PATIENT_DETAIL && view !== ViewState.CLIENT_PORTAL) setSelectedPatient(null);
    setActionIntent(null);
  };

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setCurrentView(ViewState.PATIENT_DETAIL);
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    setPatients(prev => prev.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    if (selectedPatient?.id === updatedPatient.id) setSelectedPatient(updatedPatient);
  };

  const handleAddPatient = (newPatient: Patient) => {
      setPatients(prev => [newPatient, ...prev]);
  };
  
  const handleAddAppointment = (newAppointment: Appointment) => {
      const patient = patients.find(p => p.id === newAppointment.patientId);
      if (patient) {
          newAppointment.paymentReference = generatePaymentReference(patient);
      }
      setAppointments(prev => [newAppointment, ...prev]);
  };

  const handleUpdateAppointment = (updatedApt: Appointment) => {
      setAppointments(prev => prev.map(a => a.id === updatedApt.id ? updatedApt : a));
  };

  const handleUpdateProduct = (updatedProd: Product) => {
      setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const handleAddProduct = (newProd: Product) => {
      setProducts(prev => [newProd, ...prev]);
  };

  const handleClientBooking = (newAppointment: Appointment, newPatient: Patient) => {
    let finalPatient: Patient;
    const existingPatient = patients.find(p => p.email.toLowerCase() === newPatient.email.toLowerCase() || p.phone === newPatient.phone);
    
    if (existingPatient) {
        finalPatient = existingPatient;
        newAppointment.patientId = existingPatient.id;
        newAppointment.patientName = existingPatient.fullName;
    } else {
        finalPatient = newPatient;
        setPatients(prev => [newPatient, ...prev]);
    }
    
    // Generar referencia exacta
    newAppointment.paymentReference = generatePaymentReference(finalPatient);
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const handleClientLoginFromBooking = (patient: Patient) => { 
      setSelectedPatient(patient); 
      setCurrentView(ViewState.CLIENT_PORTAL); 
  };
  
  const handleAddEmployee = (emp: Employee) => setEmployees(prev => [...prev, emp]);
  const handleUpdateEmployee = (emp: Employee) => {
      setEmployees(prev => prev.map(e => e.id === emp.id ? emp : e));
      if (currentUser?.id === emp.id) setCurrentUser(emp);
  };

  const handleClockIn = (empId: string) => {
      const dateStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setEmployees(prev => prev.map(emp => emp.id === empId ? { 
          ...emp, 
          isPresent: true,
          attendanceLog: [...emp.attendanceLog, { date: dateStr, checkIn: timeStr, status: 'present' }] 
      } : emp));
  };

  const handleClockOut = (empId: string) => {
      const dateStr = new Date().toISOString().split('T')[0];
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setEmployees(prev => prev.map(emp => emp.id === empId ? { 
          ...emp, 
          isPresent: false,
          attendanceLog: emp.attendanceLog.map(l => l.date === dateStr && !l.checkOut ? { ...l, checkOut: timeStr } : l) 
      } : emp));
  };

  const renderContent = () => {
    if (userRole === 'client') {
        if (currentView === ViewState.CLIENT_PORTAL && selectedPatient) {
            return ( <ClientPortal patient={selectedPatient} appointments={appointments} employees={employees} businessConfig={businessConfig} onLogout={handleLogout} onNewAppointment={() => setCurrentView(ViewState.CLIENT_BOOKING)} onUpdateProfile={handleUpdatePatient} /> );
        }
        return ( <ClientBooking existingAppointments={appointments} allPatients={patients} services={services} promotions={promotions} products={products} businessConfig={businessConfig} onBookAppointment={handleClientBooking} onClientLogin={handleClientLoginFromBooking} currentUser={selectedPatient} onBack={selectedPatient ? () => setCurrentView(ViewState.CLIENT_PORTAL) : undefined} /> );
    }

    if (!currentUser) return null;

    switch (currentView) {
      case ViewState.DASHBOARD:
        return ( <Dashboard 
                    appointments={appointments} 
                    employees={employees} 
                    patients={patients} 
                    products={products} 
                    currentUser={currentUser} 
                    businessConfig={businessConfig} 
                    onNewAppointment={() => { setActionIntent('new_appointment'); setCurrentView(ViewState.APPOINTMENTS); }} 
                    onNewPatient={() => { setActionIntent('new_patient'); setCurrentView(ViewState.PATIENTS); }} 
                    onNewEmployee={() => { setActionIntent('new_employee'); setCurrentView(ViewState.EMPLOYEES); }}
                    onNavigate={handleNavigate} 
                 /> );
      case ViewState.APPOINTMENTS:
        return ( <AppointmentManager appointments={appointments} patients={patients} employees={employees} services={services} promotions={promotions} products={products} businessConfig={businessConfig} onAddAppointment={handleAddAppointment} onUpdateAppointment={handleUpdateAppointment} onViewPatient={handleSelectPatient} canEdit={true} currentUser={currentUser} startOpen={actionIntent === 'new_appointment'} onOpenChange={(isOpen) => !isOpen && setActionIntent(null)} /> );
      case ViewState.PATIENTS:
        return ( <PatientList patients={patients} onSelectPatient={handleSelectPatient} onAddPatient={handleAddPatient} onDeletePatient={()=>{}} onUpdatePatient={handleUpdatePatient} startOpen={actionIntent === 'new_patient'} onOpenChange={(isOpen) => !isOpen && setActionIntent(null)} currentUser={currentUser} canDelete={true} onLoginAsPatient={(p)=>handleLoginSuccess(p, 'client')} /> );
      case ViewState.PATIENT_DETAIL:
        if (!selectedPatient) return null;
        return ( <PatientDetail patient={selectedPatient} appointments={appointments} employees={employees} products={products} currentUser={currentUser} onBack={() => handleNavigate(ViewState.PATIENTS)} onUpdatePatient={handleUpdatePatient} onDeletePatient={()=>{}} onLoginAsPatient={(p)=>handleLoginSuccess(p, 'client')} /> );
      case ViewState.INVENTORY:
        return ( <InventoryManager products={products} transactions={[]} employees={employees} patients={patients} currentUser={currentUser} onUpdateProduct={handleUpdateProduct} onAddProduct={handleAddProduct} onAddTransaction={()=>{}} /> );
      case ViewState.INTERNAL_CHAT:
        return ( <InternalChat currentUser={currentUser} allEmployees={employees} /> );
      case ViewState.EMPLOYEES:
        return ( <EmployeeManager employees={employees} businessConfig={businessConfig} onAddEmployee={handleAddEmployee} onUpdateEmployee={handleUpdateEmployee} onDeleteEmployee={()=>{}} onImpersonate={(e)=>handleLoginSuccess(e, 'admin')} startOpen={actionIntent === 'new_employee'} onOpenChange={(isOpen) => !isOpen && setActionIntent(null)} /> );
      case ViewState.SETTINGS:
        return ( <AdminSettings services={services} promotions={promotions} products={products} businessConfig={businessConfig} patients={patients} appointments={appointments} employees={employees} onUpdateServices={setServices} onUpdatePromotions={setPromotions} onUpdateProducts={setProducts} onUpdateConfig={setBusinessConfig} /> );
      default: return null;
    }
  };

  if (showLanding && !isAuthenticated) return ( <FrontPage services={services} promotions={promotions} businessConfig={businessConfig} onNavigateLogin={handleLandingLogin} onNavigateBooking={handleLandingBooking} /> );
  if (!isAuthenticated) return ( <Login employees={employees} patients={patients} onLoginSuccess={handleLoginSuccess} onGuestBooking={handleGuestBooking} initialTab={loginTab} onBackToHome={handleBackToLanding} /> );

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate} 
      userRole={userRole} 
      onToggleRole={handleLogout} 
      currentUser={currentUser || employees[0]} 
      allEmployees={employees} 
      onSwitchUser={setCurrentUser}
      onClockIn={handleClockIn}
      onClockOut={handleClockOut}
      onUpdateAvatar={(url) => { if(currentUser) handleUpdateEmployee({...currentUser, avatarUrl: url}); }}
      whatsappChannel={businessConfig.contact.whatsappChannel}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
