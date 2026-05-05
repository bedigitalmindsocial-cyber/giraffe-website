'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  /** Visual variant — 'window' for the Win-95 frame, 'overlay' for a plain dim backdrop. */
  variant?: 'window' | 'overlay';
  /** Tailwind classes for the inner box. */
  innerClassName?: string;
};

/**
 * Generic modal with backdrop click-to-close, ESC handling, and a focus
 * trap. Rendered through a React portal at <body> root so it escapes any
 * `transform` ancestor and is always positioned relative to the viewport.
 *
 * The backdrop covers the full viewport. Clicking anywhere outside the
 * dialog box closes the modal.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  children,
  variant = 'overlay',
  innerClassName = '',
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Required for SSR — only render the portal client-side.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while open and restore focus on close.
  useEffect(() => {
    if (!open) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog without scrolling the page.
    const dialog = dialogRef.current;
    if (dialog) {
      const firstFocusable = dialog.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (firstFocusable ?? dialog).focus({ preventScroll: true });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      previousActiveElement.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [],
  );

  const handleBackdropClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  if (!open || !mounted) return null;

  const dialogShape =
    variant === 'window'
      ? 'bg-paper border border-ink/20 shadow-card-hover rounded-sm'
      : 'bg-paper rounded-sm shadow-card-hover';

  const node = (
    <div
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/60 p-3 sm:p-5 animate-[fadeIn_150ms_ease-out]"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`relative overflow-hidden flex flex-col max-h-full w-full ${dialogShape} ${innerClassName || 'max-w-3xl'}`}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
