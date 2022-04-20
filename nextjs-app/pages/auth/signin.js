import { useState, useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors, accessToken } = useRequest({
    url: '/api/auth/signin',
    method: 'post',
    body: {
      username,
      password
    },
    onSuccess: (reponseData) => {
      console.log(reponseData.accessToken);
      
      // Router.push('/');
    }
  });

  const onSubmit = async event => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>User Name</label>
        <input
          value={username}
          onChange={e => setUserName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};
