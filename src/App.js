import './App.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from './firebase';
import SignUp from './components/SignUp';
import { Home } from './components/Home';
import { LogIn } from './components/Login'
import { MyAccount } from './components/MyAccount';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { PrivateRoute } from './PrivateRoute';


const auth = getAuth(app);

function App() {

  return (
    <>

      <Router>
        <Header />
        <hr/>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/myaccount" element={<PrivateRoute Component={MyAccount} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
