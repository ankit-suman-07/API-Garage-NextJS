import React from 'react';
import { useApiContext } from '@/app/context/api-context/page';

const Headers = () => {
  const { headers, addHeader, updateHeader } = useApiContext();

  return (
    <div>
      <button onClick={addHeader}>Add Header</button>
      <div>
        {headers.map((header, index) => (
          <div key={index} className="flex gap-4">
            <input
              type="text"
              className="flex-1"
              placeholder={`Key ${index + 1}`}
              value={header.key}
              onChange={(e) => updateHeader(index, e.target.value, header.value)} // Update key
            />
            <input
              type="text"
              className="flex-1"
              placeholder={`Value ${index + 1}`}
              value={header.value}
              onChange={(e) => updateHeader(index, header.key, e.target.value)} // Update value
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Headers;
