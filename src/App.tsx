import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Logout from './pages/LogoutPage';
import Clientes from './pages/Clientes/ClientesPage';
import VerCliente from './pages/Clientes/VerCliente';
import RegistrarCliente from './pages/Clientes/RegistrarCliente';
import ModificarCliente from './pages/Clientes/ModificarCliente';
import Polizas from './pages/Polizas/PolizasPage';
import VerPoliza from './pages/Polizas/VerPoliza';
import RegistrarPoliza from './pages/Polizas/RegistrarPoliza';
import ModificarPoliza from './pages/Polizas/ModificarPoliza';
import Aseguradoras from './pages/Aseguradoras/AseguradorasPage';
import VerAseguradora from './pages/Aseguradoras/VerAseguradora';
import RegistrarAseguradora from './pages/Aseguradoras/RegistrarAseguradora';
import ModificarAseguradora from './pages/Aseguradoras/ModificarAseguradora';
import Pagos from './pages/Pagos/PagosPage';
import VerPago from './pages/Pagos/VerPago';
import RegistrarPago from './pages/Pagos/RegistrarPago';
import ModificarPago from './pages/Pagos/ModificarPago';
import Reportes from './pages/ReportesPage';
import Contabilidad from './pages/ContabilidadPage';
import Usuarios from './pages/Usuarios/UsuariosPage';
import RegistrarUsuario from './pages/Usuarios/RegistrarUsuario';
import ModificarUsuario from './pages/Usuarios/ModificarUsuarios';
import VerUsuario from './pages/Usuarios/VerUsuario';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoutes from './components/auth/PrivateRoutes';
import AdminRoutes from './components/auth/AdminRoutes';
import GerenteRoutes from './components/auth/GerenteRoutes';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/registrar" element={<RegistrarCliente />} />
            <Route
              path="/clientes/modificar/:id"
              element={<ModificarCliente />}
            />
            <Route path="/clientes/:id" element={<VerCliente />} />
            <Route path="/polizas" element={<Polizas />} />
            <Route path="/polizas/registrar" element={<RegistrarPoliza />} />
            <Route
              path="/polizas/modificar/:id"
              element={<ModificarPoliza />}
            />
            <Route path="/polizas/:id" element={<VerPoliza />} />
            <Route path="/aseguradoras" element={<Aseguradoras />} />
            <Route
              path="/aseguradoras/registrar"
              element={<RegistrarAseguradora />}
            />
            <Route
              path="/aseguradoras/modificar/:id"
              element={<ModificarAseguradora />}
            />
            <Route path="/aseguradoras/:id" element={<VerAseguradora />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/pagos/registrar" element={<RegistrarPago />} />
            <Route path="/pagos/modificar/:id" element={<ModificarPago />} />
            <Route path="/pagos/:id" element={<VerPago />} />
            <Route element={<GerenteRoutes />}>
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/contabilidad" element={<Contabilidad />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route path="/usuarios" element={<Usuarios />} />
              <Route
                path="/usuarios/registrar"
                element={<RegistrarUsuario />}
              />
              <Route
                path="/usuarios/modificar/:id"
                element={<ModificarUsuario />}
              />
              <Route path="/usuarios/:id" element={<VerUsuario />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
