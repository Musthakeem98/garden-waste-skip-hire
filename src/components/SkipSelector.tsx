import React, { useEffect, useState } from 'react';

type Skip = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function SkipSelector() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  useEffect(() => {
    fetch(
      'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
    )
      .then((res) => res.json())
      .then((data) => {
        setSkips(data.items);
      })
      .catch((err) => {
        console.error('Failed to fetch skips:', err);
      });
  }, []);

  return (
    <div>
      <h2>Select a Skip</h2>
      <select
        onChange={(e) => {
          const skip = skips.find((s) => s.id === parseInt(e.target.value));
          setSelectedSkip(skip || null);
        }}
      >
        <option value="">-- Select Skip --</option>
        {skips.map((skip) => (
          <option key={skip.id} value={skip.id}>
            {skip.name} (£{skip.price})
          </option>
        ))}
      </select>

      {selectedSkip && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Selected Skip Details</h3>
          <p><strong>Name:</strong> {selectedSkip.name}</p>
          <p><strong>Price:</strong> £{selectedSkip.price}</p>
          <p><strong>Description:</strong> {selectedSkip.description}</p>
        </div>
      )}
    </div>
  );
}
