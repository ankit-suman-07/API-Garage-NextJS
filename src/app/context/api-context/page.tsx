import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

// Define a type for the expected response data
type ApiResponseType = {
  // Define the structure of the expected response data
  dataField: string; // replace with actual fields
  // other fields...
};

type Header = {
  key: string;
  value: string;
};

type QueryParam = {
  key: string;
  value: string;
};

type ApiContextType = {
  verb: string; 
  url: string;
  response: ApiResponseType | null; // Use your expected type here
  status: number;
  time: number;
  size: string;
  headerCount: number;
  paramCount: number;
  headers: Header[];
  queryParams: QueryParam[];
  body: string;
  setVerb: (verb: string) => void;
  setUrl: (url: string) => void;
  setResponse: (response: ApiResponseType | null) => void;
  setStatus: (status: number) => void;
  setTime: (time: number) => void;
  setSize: (size: string) => void;
  setHeaderCount: (headerCount: number) => void;
  addHeader: () => void;
  updateHeader: (index: number, key: string, value: string) => void;
  setParamCount: (paramCount: number) => void;
  addQueryParam: () => void;
  updateQueryParam: (index: number, key: string, value: string) => void;
  setBody: (body: string) => void;
  axiosCall: () => Promise<void>; // Make axiosCall return a Promise
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [verb, setVerb] = useState("GET");
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<ApiResponseType | null>(null);
  const [status, setStatus] = useState(0);
  const [time, setTime] = useState(0);
  const [size, setSize] = useState("");

  const [headerCount, setHeaderCount] = useState(1);
  const [paramCount, setParamCount] = useState(1);

  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }]); // Initial state with one header
  const [queryParams, setQueryParams] = useState<QueryParam[]>([{ key: '', value: '' }]); // Initial state with one query param
  const [body, setBody] = useState<string>('');

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]); // Add a new header
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = { key, value }; // Update specific header
    setHeaders(newHeaders);
  };

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '' }]); // Add a new query param
  };

  const updateQueryParam = (index: number, key: string, value: string) => {
    const newParams = [...queryParams];
    newParams[index] = { key, value }; // Update specific query param
    setQueryParams(newParams);
  };

  const axiosCall = async () => {
    const startTime = performance.now(); // Start timing
    try {
      console.log("verb:", verb);
      console.log("url:", url);
  
      // Prepare headers and query params from state
      const requestHeaders = headers.reduce((acc: { [key: string]: string }, { key, value }) => {
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, { 'Content-Type': 'application/json' });
  
      const queryParameters = queryParams.reduce((acc: { [key: string]: string }, { key, value }) => {
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});
  
      const response: AxiosResponse<ApiResponseType> = await axios({
        method: verb,
        url: url,
        params: queryParameters,
        headers: requestHeaders,
        ...(verb === 'POST' || verb === 'PUT' ? { data: body } : {}),
      });
  
      const endTime = performance.now(); // End timing
      const timeTaken = endTime - startTime; // Calculate time taken
      const responseSize = JSON.stringify(response.data).length; // Get size of response data in bytes
      const responseSizeInKB = (responseSize / 1024).toFixed(2);
  
      console.log("Response:", response);
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);
      console.log("Data:", response.data);
      console.log("Time Taken (ms):", timeTaken.toFixed(2));
      console.log("Response Size (kb):", responseSizeInKB);
  
      setResponse(response.data);
      setStatus(response.status);
      setTime(timeTaken);
      setSize(responseSizeInKB);
    } catch (error) {
      console.error("Request failed:", error);
      setResponse(null); // Reset response on error
      setStatus(0); // Reset status on error
    }
  };
  
  

  return (
    <ApiContext.Provider value={{ 
            verb, url, response, status, time, size,
            headerCount, paramCount, headers, queryParams, body, 
            setVerb, setUrl, setResponse, setStatus, setTime, 
            setSize, setHeaderCount, addHeader, updateHeader, 
            setParamCount, addQueryParam, updateQueryParam, setBody,
            axiosCall 
            }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
};
