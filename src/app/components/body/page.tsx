import React, { useState } from 'react';
import { useApiContext } from '@/app/context/api-context/page';

const Body = () => {
  const { setBody } = useApiContext(); // Assuming you have a setBody function in your context
  const [bodyContent, setBodyContent] = useState(''); // State for the body content

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyContent(event.target.value); // Update the body content state
    setBody(event.target.value); // Update the context with the body content
  };
  
  return (
    <div>
      <h3>Body</h3>
      <textarea
        value={bodyContent}
        onChange={handleChange}
        rows={10}
        placeholder="Enter plain text or JSON object"
        className="w-full border p-2"
      />
    </div>
  );
};

export default Body;
