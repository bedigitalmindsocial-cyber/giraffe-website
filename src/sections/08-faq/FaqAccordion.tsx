'use client';

import { useState, useId } from 'react';
import type { FaqItem } from '@/lib/types';

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const groupId = useId();

  return (
    <ul className="border-t border-rule">
      {items.map((item, i) => {
        const isOpen = i === openIndex;
        const buttonId = `${groupId}-q-${i}`;
        const panelId = `${groupId}-a-${i}`;
        return (
          <li key={i} className="border-b border-rule">
            <button
              type="button"
              id={buttonId}
              aria-controls={panelId}
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left flex items-center justify-between gap-6 py-4 px-2 min-h-[44px] hover:bg-mid-purple-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-purple focus-visible:outline-offset-[-2px]"
            >
              <span className="font-sans font-medium text-[16px] text-ink">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`text-mid-purple-2 transition-transform ${
                  isOpen ? 'rotate-180' : 'rotate-0'
                }`}
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="bg-mid-purple-5 px-4 py-4"
              >
                <p className="font-sans text-[15px] text-ink leading-[1.7]">
                  {item.answer}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
