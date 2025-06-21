import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParksPage from './pages/ParksPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParksPage />} />
        <Route path="/parks" element={<ParksPage />} />
      </Routes>
    </Router>
  );
}

export default App;