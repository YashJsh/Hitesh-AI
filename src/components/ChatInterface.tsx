"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Send, User, ArrowLeft, Sparkles } from 'lucide-react';
import { hitesh_Bio } from '@/constants/hitesh_bio';
import axios from "axios"

interface Message {
  id: number;
  text: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Haanji, kaise hain aap? Swagat hai aapka yahan pe.",
      role : 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputMessage.trim()) return;

  const userMessage: Message = {
    id: Date.now(),
    text: inputMessage,
    role: 'user',
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsTyping(true);

  try {
    // Prepare conversation for backend
    const apiMessages = [
      ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      })),
      { role: 'user', content: inputMessage }
    ];

    const { data } = await axios.post("/api/ai", { messages: apiMessages });
    console.log(data);
    if (data.message.content) {
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: data.message.content,
        role : data.message.role,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    } else {
      console.error("Error from API:", data.error);
    }
  } catch (err) {
    console.error("Request failed", err);
  } finally {
    setIsTyping(false);
  }
};

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2 hover:bg-slate-700 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-3">
              <img src={hitesh_Bio.image} alt="" className='h-10 w-10 rounded-full' />
              <div>
                <h1 className="font-bold text-lg">Hitesh Chaudhary</h1>
                <p className="text-sm text-slate-400">Humesha sikhane ko taiyaar</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-400">Online</span>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-8 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <img src={hitesh_Bio.image} alt="" className='h-10 w-10 rounded-full' />
                  </div>
                )}
                
                <div className={`max-w-md lg:max-w-lg ${message.role === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-slate-800 border border-slate-700'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 px-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.role === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <img src={hitesh_Bio.image} alt="" className='h-10 w-10 rounded-full' />
                </div>
                <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-slate-800 border border-slate-600 rounded-full px-6 py-4 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                disabled={isTyping}
              />
            </div>
            <button
              title="submit"
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-600 disabled:to-slate-600 p-4 rounded-full transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          <p className="text-xs text-slate-500 text-center mt-3">
            Hitesh AI can make mistakes. For double check watch his YouTube videos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
