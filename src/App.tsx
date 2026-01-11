import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { VisitDetail } from '@/pages/VisitDetail'
import { InsuranceNotesPage } from '@/pages/InsuranceNotesPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { PatientPortalPage } from '@/pages/PatientPortalPage'
import { PatientsPage } from '@/pages/PatientsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<PatientsPage />} />
        <Route path="patients/:patientId" element={<PatientsPage />} />
        <Route path="visits" element={<Dashboard />} />
        <Route path="visits/:visitId" element={<VisitDetail />} />
        <Route path="insurance-notes" element={<InsuranceNotesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="patient-portal" element={<PatientPortalPage />} />
        <Route path="settings" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App

