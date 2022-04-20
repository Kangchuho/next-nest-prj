import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);  
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);  
      //console.log('url', url);
      const response = await axios[method](url, { ...body, ...props });
      if (onSuccess) {
        onSuccess(response.data);        
      }
      return response.data;
    } catch (err) {
      //console.log('err', err.response.data);
      const {
        statusCode,
        message,
        error
      } = err.response.data;

      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">            
            {/*          
            {err.response.data.message.map((err) => (
              <li key={err}>{err}</li>
            ))} */}
            <li >{message}</li>
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
