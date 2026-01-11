import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ToastProvider } from './components/common';
import { Dashboard } from './pages/Dashboard';
import { Create } from './pages/Create';
import { View } from './pages/View';
import { Settings } from './pages/Settings';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Create wizard is full-page without sidebar */}
          <Route path="/create" element={<Create />} />

          {/* Other pages use the sidebar layout */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/presentation/:id" element={<View />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
