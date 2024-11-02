import React, { useEffect, useState } from 'react'
import { useApiContext } from '@/app/context/api-context/page';
import ReactJson from 'react-json-view';

const Response = () => {
  const { response, status, time, size } = useApiContext();
  const [statusName, setStatusName] = useState("");
  useEffect(() => {
    if(status == 200) {
      setStatusName("OK");
    } else if(status == 404) {
      setStatusName("Not Found");
    } else if(status == 500) {
      setStatusName("Internal Server Error"); 
    } else if(status == 400) {
      setStatusName("Bad Request");
    } else if(status == 401) {
      setStatusName("Unauthorized");
    }
  })
  return (
    <div>
      <span>Time Taken : {time.toFixed(2)} ms</span>
            <span>Response Size : {size} kb</span>
            <span>Status: {status} {statusName}</span>
            <span>Response:</span>
      {
        response && (
          <div className='response-outer' >
            <ReactJson src={response} />
          </div>
        )
      }
    </div>
  )
}

export default Response