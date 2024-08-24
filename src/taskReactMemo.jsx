/* eslint-disable react/prop-types */
import React, { memo } from 'react';

const UserProfile = memo(function UserProfile({ user }) {
  console.log('UserProfile render');
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
})

const user = { name: 'John Doe', email: 'john@example.com' };

function App() {
  const [count, setCount] = React.useState(0);
 

  return (
    <div>
      <UserProfile user={user} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>{count}</p>
    </div>
  );
}

export default App;