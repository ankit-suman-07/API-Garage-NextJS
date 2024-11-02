import React from 'react';
import { useApiContext } from '@/app/context/api-context/page';

const Params = () => {
  const { queryParams, addQueryParam, updateQueryParam } = useApiContext();

  return (
    <div>
      <h3>Query Params</h3>
      <button onClick={addQueryParam}>Add</button>
      <div>
        {queryParams.map((param, index) => (
          <div key={index} className="flex gap-4">
            <input
              type="text"
              className="flex-1"
              placeholder={`Key ${index + 1}`}
              value={param.key}
              onChange={(e) => updateQueryParam(index, e.target.value, param.value)} // Update key
            />
            <input
              type="text"
              className="flex-1"
              placeholder={`Value ${index + 1}`}
              value={param.value}
              onChange={(e) => updateQueryParam(index, param.key, e.target.value)} // Update value
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Params;
