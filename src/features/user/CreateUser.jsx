import { useState } from 'react';
import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='w-72 p-2 mt-4 input mb-8'
      />

      {username !== '' && (
        <div>
          <Button type={'primary'}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
