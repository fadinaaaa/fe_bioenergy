import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Register from './pages/register';
import Login from './pages/login';
import News from './pages/news';
import Peta from './pages/peta';
import Layanan from './pages/layanan';
import Profile from './pages/profile';
import Alamat from './pages/alamat';
import Berlangganan from './pages/berlangganan';
import Pengaduan from './pages/pengaduan'
import Profiles from '././pages/admin/profiles';
import AccountPengguna from './pages/admin/accountpengguna';
import PengaduanPage from '././pages/admin/pengaduanpage';
import LayananPage from '././pages/admin/layananpage';
import AlamatPage from '././pages/admin/alamatpage';
import NewsPage from '././pages/admin/newspage';
import Dashboard from '././pages/admin/dashboard';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/peta" element={<Peta />} />
                    <Route path="/layanan" element={<Layanan />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/alamat" element={<Alamat />} />
                    <Route path="/berlangganan" element={<Berlangganan />} />
                    <Route path="/pengaduan" element={<Pengaduan />} />
                    <Route path="/admin/profiles" element={<Profiles />} />
                    <Route path="/admin/accountpengguna" element={<AccountPengguna />} />
                    <Route path="/admin/pengaduanpage" element={<PengaduanPage />} />
                    <Route path="/admin/layananpage" element={<LayananPage />} />
                    <Route path="/admin/alamatpage" element={<AlamatPage />} />
                    <Route path="/admin/newspage" element={<NewsPage />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
