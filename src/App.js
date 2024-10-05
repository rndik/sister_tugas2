import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

// Komponen RequestResponse untuk menangani interaksi permintaan dan respons
const RequestResponse = () => {
  // State untuk menyimpan permintaan, respons, dan umpan balik
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState('');

  // Fungsi untuk mengirim permintaan dan mendapatkan respons
  const handleRequest = () => {
    setResponse(`Response for: ${request}`); // Set respons berdasarkan permintaan
    setFeedback('Permintaan berhasil dikirim'); // Set umpan balik sukses
    setRequest(''); // Kosongkan input permintaan
  };

  return (
    <div className="mb-8 border p-4 rounded shadow-lg">
      <h3 className="text-lg font-semibold">Model Request-Response</h3>
      <input
        type="text"
        value={request}
        onChange={(e) => setRequest(e.target.value)} // Update state saat input berubah
        placeholder="Masukkan permintaan (mis. 'Dapatkan data')"
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={handleRequest} // Kirim permintaan saat tombol diklik
        className="bg-blue-500 text-white p-2 rounded transition-transform transform hover:scale-105 w-full"
      >
        Kirim Permintaan
      </button>
      <div className="mt-4 border-t pt-2">
        <strong>Respons:</strong> {response} {/* Menampilkan respons */}
      </div>
      {feedback && <div className="text-green-600 mt-2">{feedback}</div>} {/* Menampilkan umpan balik jika ada */}
    </div>
  );
};

// Komponen PublishSubscribe untuk menerbitkan dan menerima pesan
const PublishSubscribe = () => {
  // State untuk menyimpan pesan dan daftar pesan
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [warning, setWarning] = useState(''); // Untuk menyimpan peringatan

  // Fungsi untuk menerbitkan pesan
  const publishMessage = () => {
    if (!message.trim()) {
      setWarning('Pesan tidak boleh kosong!'); // Set peringatan jika pesan kosong
      return;
    }
    setMessages([...messages, message]); // Tambahkan pesan ke daftar pesan
    setMessage(''); // Kosongkan input pesan
    setWarning(''); // Hapus peringatan jika pesan diterbitkan
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <h3 className="text-lg font-semibold">Model Publish-Subscribe</h3>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value); // Update state saat input berubah
          if (warning) setWarning(''); // Hapus peringatan saat mengetik
        }}
        placeholder="Masukkan pesan untuk diterbitkan"
        className="border p-2 rounded mb-2 w-full"
      />
      <button
        onClick={publishMessage} // Terbitkan pesan saat tombol diklik
        className="bg-green-500 text-white p-2 rounded transition-transform transform hover:scale-105 w-full"
      >
        Terbitkan Pesan
      </button>
      {warning && <div className="text-red-600 mt-2">{warning}</div>} {/* Menampilkan peringatan jika ada */}
      <div className="mt-4 border-t pt-2">
        <strong>Pesan Diterbitkan:</strong>
        <ul className="list-disc pl-4">
          {messages.map((msg, index) => (
            <li key={index} className="mt-1">{msg}</li> // Menampilkan daftar pesan yang diterbitkan
          ))}
        </ul>
      </div>
    </div>
  );
};

// Komponen Visualization untuk menggambar model Request-Response dan Publish-Subscribe menggunakan D3.js
const Visualization = () => {
  useEffect(() => {
    // Menggambar grafik ketika komponen dipasang
    const svg = d3.select('#visualization')
      .attr('width', 600)
      .attr('height', 400);

    // Menghapus konten yang ada sebelumnya
    svg.selectAll('*').remove();

    // Model Request-Response
    const requestResponseGroup = svg.append('g').attr('class', 'request-response');

    requestResponseGroup.append('text')
      .attr('x', 150)
      .attr('y', 25)
      .text('Model Request-Response')
      .attr('class', 'font-semibold text-lg');

    const clientRect = requestResponseGroup.append('rect')
      .attr('x', 50)
      .attr('y', 50)
      .attr('width', 100)
      .attr('height', 50)
      .attr('fill', 'blue')
      .on('mouseover', function () {
        d3.select(this).attr('fill', 'darkblue'); // Ubah warna saat mouse hover
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', 'blue'); // Kembalikan warna saat mouse keluar
      })
      .on('click', () => alert('Client: Mengirim permintaan')); // Aksi saat diklik

    requestResponseGroup.append('text')
      .attr('x', 75)
      .attr('y', 80)
      .text('Client')
      .attr('fill', 'white');

    const serverRect = requestResponseGroup.append('rect')
      .attr('x', 450)
      .attr('y', 50)
      .attr('width', 100)
      .attr('height', 50)
      .attr('fill', 'green')
      .on('mouseover', function () {
        d3.select(this).attr('fill', 'darkgreen'); // Ubah warna saat mouse hover
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', 'green'); // Kembalikan warna saat mouse keluar
      })
      .on('click', () => alert('Server: Mengirim respons')); // Aksi saat diklik

    requestResponseGroup.append('text')
      .attr('x', 475)
      .attr('y', 80)
      .text('Server')
      .attr('fill', 'white');

    requestResponseGroup.append('text')
      .attr('x', 250)
      .attr('y', 50)
      .text('Kirim Permintaan')
      .attr('text-anchor', 'middle');

    requestResponseGroup.append('text')
      .attr('x', 250)
      .attr('y', 110)
      .text('Kembali Respons')
      .attr('text-anchor', 'middle');

    // Gambar panah
    const arrowMarker = svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", 5)
      .attr("refY", 5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,0 L10,5 L0,10 L2,5 L0,0")
      .attr("fill", "gray");

    // Gambar panah dari Client ke Server
    requestResponseGroup.append("line")
      .attr("x1", 150)
      .attr("y1", 60)
      .attr("x2", 450)
      .attr("y2", 60)
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)"); // Gunakan marker panah

    // Gambar panah dari Server ke Client (untuk menunjukkan respons)
    requestResponseGroup.append("line")
      .attr("x1", 450)
      .attr("y1", 90)
      .attr("x2", 150)
      .attr("y2", 90)
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    // Model Publish-Subscribe
    const publishSubscribeGroup = svg.append('g').attr('class', 'publish-subscribe');

    publishSubscribeGroup.append('text')
      .attr('x', 150)
      .attr('y', 185)
      .text('Model Publish-Subscribe')
      .attr('class', 'font-semibold text-lg');

    const publisherRect = publishSubscribeGroup.append('rect')
      .attr('x', 50)
      .attr('y', 220)
      .attr('width', 100)
      .attr('height', 50)
      .attr('fill', 'purple')
      .on('mouseover', function () {
        d3.select(this).attr('fill', 'darkpurple'); // Ubah warna saat mouse hover
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', 'purple'); // Kembalikan warna saat mouse keluar
      })
      .on('click', () => alert('Publisher: Menerbitkan pesan')); // Aksi saat diklik

    publishSubscribeGroup.append('text')
      .attr('x', 67)
      .attr('y', 250)
      .text('Publisher')
      .attr('fill', 'white');

    const subscriberRect = publishSubscribeGroup.append('rect')
      .attr('x', 450)
      .attr('y', 220)
      .attr('width', 100)
      .attr('height', 50)
      .attr('fill', 'orange')
      .on('mouseover', function () {
        d3.select(this).attr('fill', 'darkorange'); // Ubah warna saat mouse hover
      })
      .on('mouseout', function () {
        d3.select(this).attr('fill', 'orange'); // Kembalikan warna saat mouse keluar
      })
      .on('click', () => alert('Subscriber: Menerima pesan')); // Aksi saat diklik

    publishSubscribeGroup.append('text')
      .attr('x', 465)
      .attr('y', 250)
      .text('Subscriber')
      .attr('fill', 'white');

    publishSubscribeGroup.append('text')
      .attr('x', 250)
      .attr('y', 230)
      .text('Terbitkan Pesan')
      .attr('text-anchor', 'middle');

    publishSubscribeGroup.append('text')
      .attr('x', 250)
      .attr('y', 270)
      .text('Diterima Pesan')
      .attr('text-anchor', 'middle');

    // Gambar panah
    publishSubscribeGroup.append("line")
      .attr("x1", 150)
      .attr("y1", 245)
      .attr("x2", 450)
      .attr("y2", 245)
      .attr("stroke", "gray")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)"); // Gunakan marker panah

    return () => {
      // Cleanup D3 effects on component unmount
      svg.selectAll('*').remove(); // Menghapus semua elemen dari SVG saat komponen dihapus
    };
  }, []); // Menjalankan sekali saat komponen dipasang

  return (
    <svg id="visualization" className="border mt-4"></svg> // Menampilkan SVG untuk visualisasi
  );
};

// Komponen utama yang menggabungkan semua bagian
const App = () => {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Visualisasi Model Request-Response dan Publish-Subscribe</h1>
      <RequestResponse />
      <PublishSubscribe />
      <Visualization />
    </div>
  );
};

export default App; // Mengekspor komponen utama
