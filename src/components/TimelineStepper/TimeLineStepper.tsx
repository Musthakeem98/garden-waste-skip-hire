import {
  FaMapMarkerAlt,
  FaTrash,
  FaTruck,
  FaShieldAlt,
  FaCalendarAlt,
  FaCreditCard,
} from 'react-icons/fa';
import './TimelineStepper.css';

const steps = [
  { icon: <FaMapMarkerAlt />, label: 'Postcode', active: true },
  { icon: <FaTrash />, label: 'Waste Type', active: true },
  { icon: <FaTruck />, label: 'Select Skip', active: true },
  { icon: <FaShieldAlt />, label: 'Permit Check', active: false },
  { icon: <FaCalendarAlt />, label: 'Choose Date', active: false },
  { icon: <FaCreditCard />, label: 'Payment', active: false },
];

export default function TimelineStepper() {
  return (
    <div className="timeline-pill-wrapper">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`timeline-pill ${step.active ? 'active' : ''}`}
        >
          <span className="pill-icon">{step.icon}</span>
          <span className="pill-label">{step.label}</span>
        </div>
      ))}
    </div>
  );
}
