/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X, Camera, Loader2, AlertCircle, ArrowRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClientScanner() {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState('');
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScan = async () => {
    setScanning(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setTimeout(() => {
        stopStream(stream);
        navigate('/menu/rest-1/7');
      }, 3000);
    } catch (err) {
      setError("L'accès à la caméra est requis pour scanner le code QR.");
      setScanning(false);
    }
  };

  const stopStream = (stream: MediaStream) => {
    stream.getTracks().forEach(track => track.stop());
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.length > 0) {
      navigate(`/menu/rest-1/${manualCode}`);
    }
  };

  return (
    <div className="min-h-screen bg-forest flex flex-col text-white selection:bg-sage/30">
      {/* Header */}
      <header className="p-8 flex items-center justify-between z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"><ChevronLeft size={20} /></button>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="PayDish" className="h-8 w-auto" />
          <span className="text-xl font-black tracking-tighter uppercase">PayDish Scan</span>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {!scanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center w-full max-w-sm"
          >
            <div className="relative mx-auto w-72 h-72 mb-16">
               <div className="absolute inset-0 bg-white/5 rounded-[4rem] border-2 border-dashed border-white/20 animate-pulse"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                  <QrCode size={120} className="text-white/10" />
               </div>
               <button 
                onClick={startScan}
                className="absolute inset-0 flex items-center justify-center group"
               >
                 <div className="bg-sage w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-sage/40 group-hover:scale-110 transition-transform active:scale-95">
                   <Camera size={40} className="text-forest" />
                 </div>
               </button>
            </div>
            
            <h1 className="text-3xl font-black mb-4 tracking-tight">Prêt à commander ?</h1>
            <p className="text-white/40 mb-12 font-medium">Scannez simplement le code QR présent sur votre table pour accéder au menu digital.</p>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Ou entrez le code manuellement</span>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                  placeholder="EX: T7"
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 font-black text-center outline-none focus:border-sage transition-colors" 
                />
                <button type="submit" className="bg-white text-forest p-4 rounded-2xl hover:bg-sage transition-colors active:scale-95">
                  <ArrowRight size={24} />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {scanning && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col">
            <video ref={videoRef} autoPlay playsInline className="flex-1 object-cover opacity-60" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-72 h-72 border-2 border-white/20 rounded-[3rem]">
                <div className="absolute inset-x-0 h-1 bg-sage shadow-[0_0_20px_rgba(79,111,82,0.8)] animate-scan-line"></div>
                {/* Visual corners */}
                <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-sage rounded-tl-3xl"></div>
                <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-sage rounded-tr-3xl"></div>
                <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-sage rounded-bl-3xl"></div>
                <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-sage rounded-br-3xl"></div>
              </div>
            </div>
            
            <div className="absolute bottom-24 inset-x-0 text-center flex flex-col items-center gap-6">
               <div className="bg-forest/80 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 inline-flex items-center gap-4">
                  <Loader2 size={20} className="animate-spin text-sage" />
                  <span className="font-bold text-sm">Lecture du menu PayDish...</span>
               </div>
               <button 
                onClick={() => {
                  setScanning(false);
                  if (videoRef.current?.srcObject) stopStream(videoRef.current.srcObject as MediaStream);
                }} 
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
               >
                 <X size={24} />
               </button>
            </div>
          </div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-10 left-8 right-8 bg-danger p-5 rounded-3xl flex items-center gap-4 shadow-2xl">
            <AlertCircle size={24} className="shrink-0" />
            <p className="font-bold text-sm">{error}</p>
          </motion.div>
        )}
      </main>

      <footer className="p-10 text-center opacity-20">
         <p className="text-[10px] font-black uppercase tracking-[0.4em]">PayDish Technologies 2026</p>
      </footer>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 2s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
}
