import React, { useState } from 'react';

const PublishSubscribe = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const publishMessage = () => {
    setMessages([...messages, message]);
    setMessage('');
  };

  return (
    <div className="mb-4 border p-4 rounded bg-gray-50">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Masukkan pesan untuk diterbitkan"
        className="border p-2 rounded mb-2"
      />
      <button onClick={publishMessage} className="bg-green-500 text-white p-2 rounded">
        Terbitkan Pesan
      </button>
      <div className="mt-4">
        <strong>Pesan Diterbitkan:</strong>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublishSubscribe;
