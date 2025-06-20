import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import React from 'react';

export const Toaster = () => {
  const { toasts } = useToast();

  // Sukuriame masyvą Toast komponentų
  const toastElements = toasts.map(({ id, title, description, action, ...props }) => (
    <Toast key={id} {...props}>
      <div className="grid gap-1">
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>
      {action}
      <ToastClose />
    </Toast>
  ));

  return (
    <ToastProvider>
      {toastElements}
      <ToastViewport />
    </ToastProvider>
  );
};
