'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import {
  HiArrowLeft,
  HiChatAlt2,
  HiOfficeBuilding,
  HiUser,
  HiUsers,
  HiShoppingBag,
  HiPaperAirplane,
  HiEmojiHappy,
  HiPhotograph,
} from 'react-icons/hi';

export default function ChatPage() {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState<number | null>(1); // default chat pertama
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ [key: number]: { text: string; sender: 'user' | 'petani'; time: string }[] }>({
    1: [
      { text: 'Selamat pagi, pak. Untuk punya banyak kredisi?', sender: 'petani', time: '10:30' },
      { text: 'Selamat pagi, ada stok singkong 500kg?', sender: 'user', time: '10:32' },
    ],
    2: [
      { text: 'Kami ada panen pisang kepok 300kg, harga kompetitif', sender: 'petani', time: '09:15' },
    ],
    3: [
      { text: 'Bisa kirim sampai jahe merah? butuh 150kg', sender: 'petani', time: 'Kemarin' },
    ],
  });

  const chats = [
    { id: 1, name: 'Dikel. Nadi Pasar "Segar"', avatar: HiShoppingBag, lastMessage: 'Selamat pagi, pak...', time: '10:30', unread: true, online: true },
    { id: 2, name: 'Petani Binaan Lestari', avatar: HiUser, lastMessage: 'Kami ada panen pisang...', time: '09:15', unread: false, online: false },
    { id: 3, name: 'Gabungan Tani Sejahtera', avatar: HiUsers, lastMessage: 'Bisa kirim sampel jahe?', time: 'Kemarin', unread: false, online: true },
  ];

  const currentChat = chats.find(c => c.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat] || [] : [];

  const handleSendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    const newMessage = {
      text: message,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Chat" />

        <div className="page-content">
          {/* Tombol Kembali */}
          <button
            onClick={() => router.back()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#2a7a3b',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginBottom: '1.25rem',
              padding: '0.25rem 0',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#1a5c28')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#2a7a3b')}
          >
            <HiArrowLeft style={{ fontSize: '1rem' }} /> Kembali
          </button>

          {/* Chat Container */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #efefef',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 180px)',
              minHeight: 500,
            }}
          >
            {/* Header dengan daftar chat dan area chat */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Daftar Chat - Sidebar kiri */}
              <div
                style={{
                  width: 320,
                  borderRight: '1px solid #f0f0f0',
                  overflowY: 'auto',
                  flexShrink: 0,
                }}
              >
                <div style={{ padding: '1rem', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HiChatAlt2 style={{ color: '#2a7a3b', fontSize: '1.2rem' }} />
                    <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a2e1c', margin: 0 }}>
                      Percakapan
                    </h2>
                  </div>
                </div>
                <div>
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        cursor: 'pointer',
                        transition: 'background 0.12s',
                        background: selectedChat === chat.id ? '#f8fdf8' : 'transparent',
                        borderLeft: selectedChat === chat.id ? '3px solid #2a7a3b' : '3px solid transparent',
                      }}
                      onMouseOver={(e) => {
                        if (selectedChat !== chat.id) e.currentTarget.style.background = '#fafafa';
                      }}
                      onMouseOut={(e) => {
                        if (selectedChat !== chat.id) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ position: 'relative' }}>
                        <div
                          style={{
                            width: 44,
                            height: 44,
                            borderRadius: 12,
                            background: '#e8f5eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <chat.avatar style={{ color: '#2a7a3b', fontSize: '1.2rem' }} />
                        </div>
                        {chat.online && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 2,
                              right: 2,
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              background: '#22c55e',
                              border: '2px solid #fff',
                            }}
                          />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <p style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1a2e1c', margin: 0 }}>
                            {chat.name}
                          </p>
                          <span style={{ fontSize: '0.65rem', color: '#bbb' }}>{chat.time}</span>
                        </div>
                        <p
                          style={{
                            fontSize: '0.75rem',
                            color: chat.unread ? '#1a2e1c' : '#8a9e8d',
                            margin: '0.2rem 0 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: chat.unread ? 600 : 400,
                          }}
                        >
                          {chat.lastMessage}
                        </p>
                      </div>
                      {chat.unread && (
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: '#2a7a3b',
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Area Chat Kanan */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {selectedChat && currentChat ? (
                  <>
                    {/* Header chat */}
                    <div
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderBottom: '1px solid #f0f0f0',
                        background: '#fafafa',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          background: '#e8f5eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <currentChat.avatar style={{ color: '#2a7a3b', fontSize: '1.1rem' }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1a2e1c', margin: 0 }}>
                          {currentChat.name}
                        </p>
                        <p style={{ fontSize: '0.7rem', color: '#8a9e8d', margin: 0 }}>
                          {currentChat.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>

                    {/* Pesan-pesan */}
                    <div
                      style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      }}
                    >
                      {currentMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                          }}
                        >
                          <div
                            style={{
                              maxWidth: '70%',
                              background: msg.sender === 'user' ? '#2a7a3b' : '#f0f0f0',
                              color: msg.sender === 'user' ? '#fff' : '#1a2e1c',
                              padding: '0.6rem 1rem',
                              borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                              fontSize: '0.85rem',
                              wordWrap: 'break-word',
                            }}
                          >
                            <p style={{ margin: 0 }}>{msg.text}</p>
                            <p
                              style={{
                                fontSize: '0.65rem',
                                margin: '0.2rem 0 0',
                                opacity: 0.7,
                                textAlign: msg.sender === 'user' ? 'right' : 'left',
                              }}
                            >
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input pesan */}
                    <div
                      style={{
                        padding: '1rem 1.5rem',
                        borderTop: '1px solid #f0f0f0',
                        background: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: 30,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = '#f0f0f0')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <HiEmojiHappy style={{ color: '#8a9e8d', fontSize: '1.2rem' }} />
                      </button>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.5rem',
                          borderRadius: 30,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = '#f0f0f0')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <HiPhotograph style={{ color: '#8a9e8d', fontSize: '1.2rem' }} />
                      </button>
                      <input
                        type="text"
                        placeholder="Ketik pesan..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{
                          flex: 1,
                          padding: '0.6rem 1rem',
                          border: '1px solid #e0e0e0',
                          borderRadius: 30,
                          fontSize: '0.85rem',
                          outline: 'none',
                          transition: 'border 0.2s',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2a7a3b')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#e0e0e0')}
                      />
                      <button
                        onClick={handleSendMessage}
                        style={{
                          background: '#2a7a3b',
                          border: 'none',
                          borderRadius: 30,
                          width: 36,
                          height: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = '#1a5c28')}
                        onMouseOut={(e) => (e.currentTarget.style.background = '#2a7a3b')}
                      >
                        <HiPaperAirplane style={{ color: '#fff', fontSize: '1rem' }} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8a9e8d',
                      fontSize: '0.85rem',
                    }}
                  >
                    Pilih chat untuk memulai percakapan
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}