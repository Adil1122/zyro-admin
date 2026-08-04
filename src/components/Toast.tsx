'use client';
import React from 'react';
import { useApp } from '@/lib/context';

export default function Toast() {
  const { toast } = useApp();
  return (
    <div className={`toast${toast.visible ? ' show' : ''}`}>
      {toast.msg}
    </div>
  );
}
