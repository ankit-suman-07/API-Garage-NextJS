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
      {
        response && (
          <div>
            {/* <h4>Time Taken : {time.toFixed(2)} ms</h4>
            <h4>Response Size : {size} kb</h4>
            <h4>Status: {status} {statusName}</h4>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre> */}
            <ReactJson src={response} />
          </div>
        )
      }
    </div>
  )
}

export default Response