import React, { useState } from 'react';

const RequestResponse = () => {
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [responseTime, setResponseTime] = useState(null);

  const handleRequest = () => {
    const startTime = Date.now();
    
    // Simulasi pengiriman permintaan dan mendapatkan respons
    setResponse(`Response for: ${request}`);
    
    const endTime = Date.now();
    setResponseTime(endTime - startTime);
    setRequest('');
  };

  return (
    <div className="mb-4 border p-4 rounded bg-gray-50">
      <input
        type="text"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        placeholder="Masukkan permintaan"
        className="border p-2 rounded mb-2"
      />
      <button onClick={handleRequest} className="bg-blue-500 text-white p-2 rounded">
        Kirim Permintaan
      </button>
      <div className="mt-4">
        <strong>Respons:</strong> {response}
      </div>
      <div className="mt-2">
        {responseTime !== null && (
          <p className="text-green-600">Waktu Respons: {responseTime} ms</p>
        )}
      </div>
    </div>
  );
};

export default RequestResponse;
