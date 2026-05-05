'use client';

import { Modal } from '@/components/Modal';
import type { Role } from '@/lib/types';
import { postedStamp } from '@/lib/dateRelative';
import { dispatchApplyRole } from '@/lib/applyEvent';

type RoleDetailModalProps = {
  role: Role | null;
  onClose: () => void;
};

export function RoleDetailModal({ role, onClose }: RoleDetailModalProps) {
  if (!role) return null;

  const handleApply = () => {
    dispatchApplyRole(role.slug);
    onClose();
    setTimeout(() => {
      const target = document.getElementById('apply');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 80);
  };

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy={`role-modal-title-${role.slug}`}
      variant="overlay"
      innerClassName="max-w-2xl"
    >
      <div className="bg-paper p-6 md:p-10 max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <p
            aria-hidden="true"
            className="font-mono text-memo-stamp text-mid-purple-2 uppercase"
          >
            {postedStamp(role.postedDate)}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close role detail"
            className="font-mono text-[18px] text-mid-purple-1 hover:text-ink leading-none"
          >
            ×
          </button>
        </div>

        <h3
          id={`role-modal-title-${role.slug}`}
          className="mt-4 font-mono text-[22px] font-bold text-ink uppercase leading-tight"
        >
          {role.title}
        </h3>
        <p className="mt-2 font-mono text-memo-meta text-mid-purple-1 uppercase tracking-wide">
          {role.location} <span aria-hidden="true">·</span> {role.type}
        </p>

        <hr className="my-5 border-rule" />

        <div
          className="font-mono text-[13px] text-ink leading-[1.7] [&_p]:mb-3 [&_p:last-child]:mb-0 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: role.description }}
        />

        <div className="mt-8 border-t border-rule pt-5">
          <p className="font-mono text-memo-cta text-mid-purple-1 uppercase tracking-wide mb-2">
            How to apply
          </p>
          <p className="font-mono text-[13px] text-ink leading-[1.7]">
            {role.applicationInstructions}
          </p>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="group mt-8 inline-flex items-center gap-3 bg-deep-purple text-paper font-mono text-[13px] uppercase tracking-[0.04em] rounded-full px-7 py-3.5 hover:bg-accent-purple transition-all"
        >
          <span>Apply now</span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </button>
      </div>
    </Modal>
  );
}
