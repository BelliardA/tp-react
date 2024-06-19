import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './../style/profil.css'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $data: UsersPermissionsUserInput!) {
  updateUsersPermissionsUser(id: $id, data: $data) {
    data {
      id
      attributes {
        username
        email
      }
    }
  }
}
`;

const Profil = () => {
  const [username, setUsername] = useState(localStorage.getItem('Username'));
  const [email, setEmail] = useState(localStorage.getItem('Email'));
  const [password, setPassword] = useState('');

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await updateUser({
        variables: {
          id: localStorage.getItem("UserId"),
          data: {
            username,
            email,  
          },
        },
      });

      console.log('Utilisateur mis à jour :', data.updateUsersPermissionsUser.data);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', err);
    }
  };

  return (
    <div className="update-user-container">
      <h2>Formulaire de mise à jour d'utilisateur</h2>
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
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'Mettre à jour'}
        </button>
        {error && <p className="error-message">Erreur : {error.message}</p>}
      </form>
    </div>
  );
};

export default Profil;
