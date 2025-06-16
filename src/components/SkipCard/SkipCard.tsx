import React from 'react';
import './SkipCard.css';

type SkipCardProps = {
  image: string;
  yardSize: string;
  title: string;
  price: number;
  restricted?: boolean;
  selected?: boolean;
  onClick?: () => void;
};
const SkipCard: React.FC<SkipCardProps> = ({
  image,
  yardSize,
  title,
  price,
  restricted = false,
  selected = false,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={`skip-card ${selected ? 'selected' : 'not-selected'}`}>
      <div className="image-wrapper">
        <img src={image} alt={title} className="skip-image" />
        <div className="yard-badge">{yardSize}</div>
        {restricted && (
          <div className="restricted-badge">
            ⚠️ Not Allowed On The Road
          </div>
        )}
      </div>

      <div className="details-wrapper">
        <h3 className="skip-title">{title}</h3>
        <p className="skip-subtitle">14 day hire period</p>
        <p className="skip-price">£{price}</p>
        {!selected ? 
          <button onClick={onClick ?? (() => {})} className="skip-button">Select This Skip →</button> :
          <button onClick={onClick ?? (() => {})} className="skip-button-select">✓ Selected</button>
        }
      </div>
    </div>
  );
};

export default SkipCard;
