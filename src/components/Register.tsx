import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './../style/register.css'

// Définition de la mutation GraphQL pour enregistrer un utilisateur
const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($input: UsersPermissionsRegisterInput!) {
    register(input: $input) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

const Register = () => {
  // États pour les champs du formulaire
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Mutation GraphQL pour enregistrer l'utilisateur
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER_MUTATION);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await registerUser({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });

      console.log('Utilisateur enregistré :', data.register.user);
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', err);
    }
  };

  return (
    <div className="register-container">
    <h2>Formulaire d'inscription</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nom d'utilisateur :</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'En cours...' : 'S\'inscrire'}
      </button>
      {error && <p className="error-message">Erreur : {error.message}</p>}
    </form>
  </div>
  );
};

export default Register;
