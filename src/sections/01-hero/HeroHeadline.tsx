'use client';
import { useEffect, useRef } from 'react';

const HEADLINE = 'Two years here will change the next twenty.';
// Words to render in italic (Playfair Display em styling).
const ITALIC_WORDS = new Set(['change']);

/**
 * Hero H1 with the [giraffe.partners](http://giraffe.partners) word-reveal pattern: each word sits in
 * an overflow:hidden box; the inner span lifts from translateY(110%) → 0
 * with a staggered delay per word. Triggered after a short timeout on mount
 * (matches the live site's 240ms kickoff).
 */
export function HeroHeadline() {
  const ref = useRef<HTMLHeadingElement | null>(null);
  
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const node = ref.current;
    if (!node) return;
    const id = setTimeout(
      () => {
        node.classList.add('is-in');
      },
      reduce ? 0 : 240,
    );
    return () => clearTimeout(id);
  }, []);

  const words = HEADLINE.split(' ');
  
  return (
    <h1
      ref={ref}
      id="heroHeadline"
      className="display-h1 word-reveal text-paper mt-6"
    >
      {words.map((word, i) => {
        const stripped = word.replace(/[.,]/g, '').toLowerCase();
        const italic = ITALIC_WORDS.has(stripped);
        return (
          <span key={i}>
            <span className="word">
              <span>
                {italic ? <em>{word}</em> : word}
              </span>
            </span>
            {i < words.length - 1 && ' '}
          </span>
        );
      })}
    </h1>
  );
}
