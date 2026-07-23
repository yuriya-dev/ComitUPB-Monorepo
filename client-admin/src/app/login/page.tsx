'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, ShieldCheck, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { DotMap } from '@/components/DotMap';
import { setAdminAuth } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.message || 'Email atau kata sandi admin tidak valid.');
        setLoading(false);
        return;
      }

      // Simpan JWT token dan data user ke storage & cookies
      setAdminAuth(data.token, data.user);

      // Redirect ke dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg('Terjadi kesalahan saat menghubungkan ke server.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl overflow-hidden rounded-[24px] flex bg-white shadow-[0_20px_60px_-15px_rgba(6,104,198,0.12),_0_0_0_1px_rgba(214,233,250,0.8)]"
      >
        {/* Left Side - Interactive Tech Canvas & Brand */}
        <div className="hidden md:block w-1/2 min-h-[580px] relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-slate-50 border-r border-slate-100">
          <DotMap />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-between p-10 z-10 select-none">
            {/* Top Tag */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full flex justify-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-primary/20 text-xs font-bold text-primary shadow-sm">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Portal Administrator</span>
              </div>
            </motion.div>

            {/* Center Brand Identity */}
            <div className="flex flex-col items-center text-center my-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-5 relative"
              >
                <div className="w-16 h-16 rounded-[20px] bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(6,104,198,0.4)] border-2 border-white">
                  <img src="/logo.svg" alt="ComitUPB Logo" className="w-10 h-10 object-contain drop-shadow" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2"
              >
                Comit<span className="text-primary">UPB</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xs text-slate-600 font-medium max-w-xs leading-relaxed"
              >
                Kelola kegiatan, anggota, modul workshop, dan ekosistem Komunitas IT Universitas Pelita Bangsa secara terpusat.
              </motion.p>
            </div>

            {/* Bottom Footer Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-[11px] text-slate-400 font-medium tracking-wide"
            >
              © {new Date().getFullYear()} ComitUPB • Secured Management System
            </motion.div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Mobile / Title */}
            <div className="flex items-center gap-3 mb-6 md:hidden">
              <div className="w-10 h-10 rounded-[12px] bg-primary flex items-center justify-center">
                <img src="/logo.svg" alt="ComitUPB Logo" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h1 className="font-extrabold text-slate-900 text-base leading-tight">ComitUPB</h1>
                <p className="text-xs text-primary font-bold">Admin Portal</p>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Selamat Datang
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mb-8">
              Masukkan akun kredensial pengurus untuk mengakses Dashboard.
            </p>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5 font-medium"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Admin <span className="text-primary">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@comitupb.org"
                    required
                    className="w-full h-11 pl-10 pr-4 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Kata Sandi <span className="text-primary">*</span>
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full h-11 pl-10 pr-10 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none font-medium"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    tabIndex={-1}
                  >
                    {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 relative overflow-hidden bg-primary hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm tracking-wide shadow-[0_4px_14px_0_rgba(6,104,198,0.35)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}

                  {isHovered && !loading && (
                    <motion.span
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                      style={{ filter: 'blur(4px)' }}
                    />
                  )}
                </button>
              </motion.div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Kesulitan masuk?</span>
              <a
                href="mailto:admin@comitupb.org"
                className="text-primary font-bold hover:underline transition-all"
              >
                Hubungi IT Support
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
