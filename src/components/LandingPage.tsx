"use client"

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Sparkles, Zap, Shield, ArrowRight, Bot } from 'lucide-react';
import { hitesh_Bio } from '@/constants/hitesh_bio';

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={hitesh_Bio.image} alt="" className='h-10 w-10 rounded-full' />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hitesh AI
            </span>
          </div>
         
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Chat with
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent ml-4">
                AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Experience the talking of hitesh Chaudhary, and ask him about anything related coding, Hitesh AI will guide you 
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/chat"
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <MessageCircle className="h-5 w-5" />
              Start Chatting
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Preview Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-slate-400 text-sm">Hitesh Chaudhary</span>
              </div>
              <div className="space-y-4 text-left">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                    U
                  </div>
                  <div className="bg-slate-700 rounded-2xl px-4 py-3 max-w-xs">
                    <p className="text-sm">Hello Sir, kaise hain aap?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <img src={hitesh_Bio.image} alt="" className='h-8 w-8 rounded-full' />
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl px-4 py-3 flex-1">
                    <p className="text-sm">Haanji, hum ekdum bdiyaa hain, chliye padai suru ki jaaye.</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={hitesh_Bio.image} alt="" className='h-6 w-6 rounded-full' />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hitesh AI
            </span>
          </div>
          <p className="text-slate-400">© 2025 HiteshAI. Built with modern web technologies.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;