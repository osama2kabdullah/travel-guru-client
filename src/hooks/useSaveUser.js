import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSaveUser = ({error, setError, doc}) => {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    useEffect(() => {
        if (!error && doc) {
          fetch("http://localhost:5000/insertUser", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(doc),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setData(data);
              localStorage.setItem('authorization_token', JSON.stringify(data.token));
              setError(true);
              //redirecting
              navigate('/');
            });
        }
      }, [error, doc, navigate, setError]);
      
      return [data, setData];
};

export default useSaveUser;