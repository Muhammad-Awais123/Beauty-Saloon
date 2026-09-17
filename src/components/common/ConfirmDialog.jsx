import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // danger | warning | info | success
  confirmLoading = false
}) {
  const iconConfig = {
    danger: { icon: AlertTriangle, color: 'text-rose-600 bg-rose-50 border-rose-200', btnVariant: 'danger' },
    warning: { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-200', btnVariant: 'primary' },
    info: { icon: Info, color: 'text-sky-600 bg-sky-50 border-sky-200', btnVariant: 'primary' },
    success: { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', btnVariant: 'primary' }
  }[type] || { icon: AlertTriangle, color: 'text-rose-600 bg-rose-50 border-rose-200', btnVariant: 'danger' };

  const Icon = iconConfig.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full border shrink-0 ${iconConfig.color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-charcoal-600 leading-relaxed">{message}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-charcoal-100">
        <Button variant="outline" size="sm" onClick={onClose} disabled={confirmLoading}>
          {cancelText}
        </Button>
        <Button
          variant={iconConfig.btnVariant}
          size="sm"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          disabled={confirmLoading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
