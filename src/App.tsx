import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import myApolloClient from './appoloClient';
import Login from './components/Login';
import Feed from './components/Feed';
import CreatePost from './components/CreatePost';
import Profil from './components/Profil';
import Register from './components/Register';
import Chat from './components/Chat';
import './style/menu.css'

function App() {
  const [isConnected, setIsConnected] = useState(localStorage.getItem('token-jwt') !== null);

  const handleLogout = () => {
    localStorage.removeItem('token-jwt');
    localStorage.removeItem('Username');
    localStorage.removeItem('Email');
    localStorage.removeItem('UserId');
    setIsConnected(false);
  };

  return (
    <ApolloProvider client={myApolloClient}>
      <Router>
        <nav className="nav">
          <ul>
            {isConnected ? (
              <>
                <li>
                  <Link to="/feed">Accueil</Link>
                </li>
                <li>
                  <Link to="/create-post">Créer un post</Link>
                </li>
                <li>
                  <Link to="/profil">Profil</Link>
                </li>
                <li>
                  <Link to="/chat">Chat</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Se Déconnecter</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Connexion</Link>
                </li>
                <li>
                  <Link to="/register">S'inscrire</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={!isConnected ? <Login setIsConnected={setIsConnected} /> : <Navigate to="/feed" />}
          />
          <Route
            path="/register"
            element={!isConnected ? <Register /> : <Navigate to="/feed" />}
          />
          <Route
            path="/feed"
            element={isConnected ? <Feed /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-post"
            element={isConnected ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/profil"
            element={isConnected ? <Profil /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={isConnected ? "/feed" : "/login"} />}
          />
          <Route
            path="/chat"
            element={isConnected ? <Chat /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
