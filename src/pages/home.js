import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api';




function Home() {
    const navigate = useNavigate()
    const [user, setuser] = useState(null);
    useEffect(() => {
       let token = localStorage.getItem('token')
       if(!token){
navigate('/login')
       
return
       }
       api.defaults.headers['Authorization'] = token ;

     api.get('/').then((response)=>setuser(response.data.user)).catch(()=>navigate('/login'))
    }, []);
    if(!user){
        return ''
    }

    function onHandle(){
    
  var  userloginstatus = localStorage.setItem(userloginstatus,'false')
    navigate('/login')
}

  return (<div>
    <div className="header">
       
        <button className='logout' onClick={onHandle}>Logout</button>
        </div>
    <div>
      <h1>HELLO {user.role}</h1>
    
    </div>
    </div>
  );
}

export default Home;
