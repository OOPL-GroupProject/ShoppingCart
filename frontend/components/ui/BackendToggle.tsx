"use client";

import React, { useEffect, useState } from 'react';

export const BackendToggle = () => {
  const [selected, setSelected] = useState<'CSHARP' | 'ELIXIR'>('CSHARP');

  useEffect(() => {
    // When the component loads, see what's currently in storage
    const saved = localStorage.getItem('backend_preference');
    if (saved === 'ELIXIR' || saved === 'CSHARP') {
      setSelected(saved as 'CSHARP' | 'ELIXIR');
    }
  }, []);

  const handleSwitch = (choice: 'CSHARP' | 'ELIXIR') => {
    // THIS IS THE MISSING PIECE:
    localStorage.setItem('backend_preference', choice); 
    
    setSelected(choice);
    
    // Now we reload. When the app restarts, resolveApiBaseUrl() 
    // will see the NEW value in localStorage.
    window.location.reload(); 
  };

  return (
    <div className="fixed bottom-6 right-6 p-4 bg-white shadow-2xl border rounded-xl z-[9999] flex flex-col gap-2">
      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Backend</span>
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button 
          onClick={() => handleSwitch('CSHARP')}
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${selected === 'CSHARP' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
        >
          .NET
        </button>
        <button 
          onClick={() => handleSwitch('ELIXIR')}
          className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${selected === 'ELIXIR' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}
        >
          Elixir
        </button>
      </div>
    </div>
  );
};