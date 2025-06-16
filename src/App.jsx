import TimelineStepper from './components/TimelineStepper/TimeLineStepper';
import SkipGrid from './components/SkipGrid/SkipGrid';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <TimelineStepper />
      <div className="header-section">
        <h1 className="skip-heading">Choose Your Skip Size</h1>
        <p className="skip-subheading">Select the skip size that best suits your needs</p>
      </div>
      <div className="skip-section">
        <SkipGrid />
      </div>
    </div>
  );
}

export default App;