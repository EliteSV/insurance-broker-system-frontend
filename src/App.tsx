import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Logout from './pages/LogoutPage'
import Clientes from "./pages/Clientes/ClientesPage"
import VerCliente from "./pages/Clientes/VerCliente"
import RegistrarCliente from "./pages/Clientes/RegistrarCliente"
import ModificarCliente from "./pages/Clientes/ModificarCliente"
import Polizas from "./pages/Polizas/PolizasPage"
import VerPoliza from "./pages/Polizas/VerPoliza"
import RegistrarPoliza from "./pages/Polizas/RegistrarPoliza"
import ModificarPoliza from "./pages/Polizas/ModificarPoliza"
import Aseguradoras from "./pages/Aseguradoras/AseguradorasPage"
import VerAseguradora from "./pages/Aseguradoras/VerAseguradora"
import RegistrarAseguradora from "./pages/Aseguradoras/RegistrarAseguradora"
import ModificarAseguradora from "./pages/Aseguradoras/ModificarAseguradora"
import Pagos from "./pages/PagosPage"
import Reportes from "./pages/ReportesPage"
import Contabilidad from "./pages/ContabilidadPage"
import Usuarios from "./pages/UsuariosPage"
import NotFoundPage from "./pages/NotFoundPage"
import PrivateRoutes from "./components/PrivateRoutes"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/registrar" element={<RegistrarCliente />} />
            <Route path="/clientes/modificar/:id" element={<ModificarCliente />} />
            <Route path="/clientes/:id" element={<VerCliente />} />
            <Route path="/polizas" element={<Polizas />} />
            <Route path="/polizas/registrar" element={<RegistrarPoliza />} />
            <Route path="/polizas/modificar/:id" element={<ModificarPoliza />} />
            <Route path="/polizas/:id" element={<VerPoliza />} />
            <Route path="/aseguradoras" element={<Aseguradoras />} />
            <Route path="/aseguradoras/registrar" element={<RegistrarAseguradora />} />
            <Route path="/aseguradoras/modificar/:id" element={<ModificarAseguradora />} />
            <Route path="/aseguradoras/:id" element={<VerAseguradora />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/contabilidad" element={<Contabilidad />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
