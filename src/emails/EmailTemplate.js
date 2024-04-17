export const EmailTemplate = ({ name, email, message }) => (
  <div>
    <h1>Missatge nou!</h1>
    <h2>Nom del client: {name}!</h2>
    <h2>Email: {email}!</h2>
    <p>Missatge: {message}</p>
  </div>
);
