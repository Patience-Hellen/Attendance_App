/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  show: boolean;
  message: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ show, message }) => {
  if (!show) return null;

  return (
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-emerald-950/90 backdrop-blur-sm"
    >
      <div className="bg-white p-8 rounded-[40px] flex flex-col items-center text-center shadow-2xl">
        <div className="bg-emerald-100 text-emerald-800 p-4 rounded-full mb-4">
          <CheckCircle2 size={64} />
        </div>
        <h3 className="text-2xl font-black text-gray-800">Success!</h3>
        <p className="text-gray-500 mt-2">{message}</p>
      </div>
    </motion.div>
  );
};
