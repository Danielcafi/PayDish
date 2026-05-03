/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X, Camera, SwitchCamera, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
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
      
      // Simulate detection after 3 seconds
      setTimeout(() => {
        stopStream(stream);
        navigate('/menu/rest-1/7');
      }, 3000);
    } catch (err) {
      setError("Désolé, l'accès à la caméra est nécessaire pour scanner le QR code.");
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
    <div className="min-h-screen bg-brand-dark flex flex-col text-white">
      <div className="p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-full">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <QrCode className="text-brand-green w-6 h-6" />
          <span className="font-bold tracking-tight">PayDish Scan</span>
        </div>
        <div className="w-10"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {!scanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-64 h-64 bg-white/5 border-2 border-dashed border-white/20 rounded-[40px] flex items-center justify-center mb-12 relative">
              <QrCode className="w-32 h-32 text-white/30" />
              <button 
                onClick={startScan}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="bg-brand-green w-16 h-16 rounded-full flex items-center justify-center shadow-xl shadow-brand-green/40 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8" />
                </div>
              </button>
            </div>
            
            <h1 className="text-2xl font-black mb-4">Prêt à commander ?</h1>
            <p className="text-white/60 mb-12 max-w-xs mx-auto">
              Pointez votre caméra vers le QR code PayDish sur votre table.
            </p>

            <form onSubmit={handleManualSubmit} className="w-full max-w-xs mx-auto space-y-4">
              <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Ou entrez le code manuellement</div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Ex: T7" 
                  className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-green uppercase font-bold" 
                />
                <button type="submit" className="bg-brand-green p-3 rounded-xl">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {scanning && (
          <div className="fixed inset-0 z-50 bg-black flex flex-col">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="flex-1 object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-72 h-72 border-4 border-brand-green/50 rounded-[48px]">
                <div className="absolute inset-x-0 h-1 bg-brand-green shadow-[0_0_15px_#1DB954] animate-scan-line"></div>
                {/* Corners */}
                <div className="absolute -top-1 -left-1 w-12 h-12 border-t-8 border-l-8 border-brand-green rounded-tl-xl"></div>
                <div className="absolute -top-1 -right-1 w-12 h-12 border-t-8 border-r-8 border-brand-green rounded-tr-xl"></div>
                <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-8 border-l-8 border-brand-green rounded-bl-xl"></div>
                <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-8 border-r-8 border-brand-green rounded-br-xl"></div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-44 text-center w-full px-8 pointer-events-none">
              <div className="bg-brand-dark/80 backdrop-blur-md p-4 rounded-2xl inline-flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-brand-green animate-spin" />
                <span className="font-bold text-sm tracking-tight text-white">Lecture du menu en cours...</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setScanning(false);
                if (videoRef.current?.srcObject) {
                  stopStream(videoRef.current.srcObject as MediaStream);
                }
              }} 
              className="absolute top-6 right-6 p-3 bg-brand-dark/50 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed bottom-10 left-6 right-6 bg-red-500 p-4 rounded-2xl flex items-start gap-3 shadow-2xl">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <div className="font-bold">Erreur de caméra</div>
              <div className="text-sm text-red-100">{error}</div>
            </div>
          </motion.div>
        )}
      </main>

      <div className="p-8 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
        PayDish Bénin 2025
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scan-line {
          animation: scan-line 2.5s ease-in-out infinite;
          position: absolute;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
