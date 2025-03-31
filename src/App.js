import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import UploadModal from './components/UploadModal';

function App() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Sidebar onUploadClick={handleUploadClick} />
        <div className="ml-64 pt-16">
          <Routes>
            <Route path="/portfolio" element={<Portfolio onUpload={() => setIsUploadModalOpen(true)} />} />
            {/* Add other routes here as needed */}
          </Routes>
          <UploadModal 
            isOpen={isUploadModalOpen} 
            onClose={() => setIsUploadModalOpen(false)} 
          />
        </div>
      </div>
    </Router>
  );
}

export default App; 