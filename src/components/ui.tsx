/**
 * UI-компоненты приложения RankKursant
 * Переиспользуемые компоненты: Button, Input, Badge, Modal, Skeleton, Toast
 */

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

// ============ BUTTON ============
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  children, 
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-500 shadow-sm',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-400',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ============ INPUT ============
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-slate-300'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// ============ SELECT ============
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      )}
      <select
        className={`w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

// ============ BADGE ============
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'silver' | 'bronze' | 'default' | 'danger' | 'success';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    silver: 'bg-slate-100 text-slate-700 border-slate-300',
    bronze: 'bg-orange-100 text-orange-800 border-orange-300',
    default: 'bg-blue-50 text-blue-700 border-blue-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    success: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
}

// ============ MODAL ============
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${sizes[size]} max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>
        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// ============ SKELETON ============
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
  );
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-8 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

// ============ CARD ============
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
}

// ============ TOAST (простая реализация) ============
interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastListeners: ((toasts: ToastItem[]) => void)[] = [];
let toasts: ToastItem[] = [];

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const id = `toast-${Date.now()}`;
  toasts = [...toasts, { id, message, type }];
  toastListeners.forEach(l => l(toasts));
  
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== id);
    toastListeners.forEach(l => l(toasts));
  }, 3000);
}

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    toastListeners.push(setItems);
    return () => {
      toastListeners = toastListeners.filter(l => l !== setItems);
    };
  }, []);

  const typeStyles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-700 text-white',
  };

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {items.map((toast: ToastItem) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-right duration-300 ${typeStyles[toast.type]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}

// ============ EMPTY STATE ============
export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="text-center py-12">
      <p className="text-slate-500 text-lg font-medium">{title}</p>
      {description && <p className="text-slate-400 text-sm mt-1">{description}</p>}
    </div>
  );
}
