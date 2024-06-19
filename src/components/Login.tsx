import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import './../style/login.css'
import { Link } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

const Login = (props) => {

    const { setIsConnected } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [sendLoginRequest, { data, loading, error }] =
    useMutation(LOGIN_MUTATION);

  const onLogin = async () => {
    try {
      const result = await sendLoginRequest({
        variables: { identifier: username, password: password },
      });
      console.log("TOKEN RÉCUPÉRÉ: ", result.data.login.jwt);
      localStorage.setItem("token-jwt", result.data.login.jwt);
      localStorage.setItem("Username", username);
      localStorage.setItem("Email", result.data.login.user.email );
      localStorage.setItem("UserId", result.data.login.user.id);
      setIsConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-container">
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <div className="form-group">
          <label>Nom d'utilisateur :</label>
          <input
            className="login-input"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            className="login-input"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
          />
        </div>
        <button className="login-button" type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'Connexion'}
        </button>
        {error && <p className="error-message">Erreur : {error.message}</p>}
      </form>
    </div>
  </div>
  );
};

export default Login;
