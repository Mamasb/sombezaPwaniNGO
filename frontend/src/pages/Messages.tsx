import React, { useState } from 'react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'Admin',
    content: 'Welcome to ITEPADS messaging platform!',
    timestamp: new Date().toISOString(),
  },
  {
    id: 2,
    sender: 'User1',
    content: 'Thank you for the updates.',
    timestamp: new Date().toISOString(),
  },
];

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const messageToAdd: Message = {
      id: Date.now(),
      sender: 'You',
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages([messageToAdd, ...messages]);
    setNewMessage('');
  };

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <h1>Messages</h1>

      <section style={{ marginTop: '1rem' }}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your message here..."
          rows={4}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
        <button
          onClick={handleSend}
          style={{
            marginTop: '0.5rem',
            backgroundColor: '#0077b6',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            borderRadius: 4,
            fontWeight: 'bold',
          }}
        >
          Send
        </button>
      </section>

      <section style={{ marginTop: '2rem' }}>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {messages.map(({ id, sender, content, timestamp }) => (
              <li
                key={id}
                style={{
                  marginBottom: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f0f8ff',
                  borderRadius: 8,
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  {sender}{' '}
                  <span style={{ fontWeight: 'normal', color: '#666', fontSize: '0.85rem' }}>
                    {new Date(timestamp).toLocaleString()}
                  </span>
                </div>
                <div>{content}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Messages;
