import React from 'react'
import { useState } from 'react';
import { useApiContext } from '@/app/context/api-context/page';

const API_URL = () => {
  const { verb, url, setVerb, setUrl, axiosCall } = useApiContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("verb : ", verb);
    console.log("url : ", url);
  };
  return (
    <div>
      <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <form onSubmit={handleSubmit}>
        {/* Select Verb */}        
        <select
          id="verb"
          value={verb}
          onChange={(e) => setVerb(e.target.value)}
          required
        >
          <option defaultValue="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        {/* URL Input */}
        <input
          type="text"
          id="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="Enter URL or paste text..."
        />
        {/* Submit Button */}
        <button type="submit" onClick={axiosCall}>Send</button>
      </form>
      <div>
        <p>Verb: {verb}</p>
        <p>URL: {url}</p>
      </div>
      
    </div>
  
    </div>
  )
}

export default API_URL
