import React, { useEffect, useState } from 'react';
import SkipCard from '../SkipCard/SkipCard';
import './SkipGrid.css';

type SkipData = {
  id: number;
  size: number;
  hire_period_days: number;
  price_before_vat: number;
  allowed_on_road: boolean;
};

const SkipGrid = () => {
  const [skips, setSkips] = useState<SkipData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
      .then((res) => res.json())
      .then((data) => {
        setSkips(data.items || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch skip data:', err);
        setLoading(false);
      });
  }, []);

  const getImageBySize = (size: number): string => {
    return `src/assets/images/${size}-yarder-skip.jpg`;
  };

  const onClickSkip = (id: number): void => {
    setSelectedSkipId(selectedSkipId === id ? null : id);
  };

  const selectedSkip = skips.find((skip) => skip.id === selectedSkipId);

  const closeModal = () => setSelectedSkipId(null);

  if (loading) return <p style={{ color: '#1f2937', textAlign: 'center' }}>Loading skips...</p>;

  return (
    <div className="skip-grid-container">
      <div className="skip-grid">
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            image={getImageBySize(skip.size)}
            yardSize={`${skip.size} Yard`}
            title={`${skip.size} Yard Skip`}
            price={skip.price_before_vat}
            restricted={!skip.allowed_on_road}
            selected={selectedSkipId === skip.id}
            onClick={() => onClickSkip(skip.id)}
          />
        ))}
      </div>

      {selectedSkip && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <p className="disclaimer-text">
              Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
            </p>
            <div className="modal-summary">
              <div className="skip-summary">
                <strong id="modal-title">{selectedSkip.size} Yard Skip</strong>
                <div className="skip-right">
                  <span className="price">£{selectedSkip.price_before_vat}</span>
                  <span className="bar-days">{selectedSkip.hire_period_days} days</span>
                </div>
              </div>
              <div className="modal-buttons">
                <button className="modal-back" onClick={closeModal}>Back</button>
                <button className="modal-continue">Continue →</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkipGrid;
