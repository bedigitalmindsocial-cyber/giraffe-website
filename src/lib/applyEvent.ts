/**
 * Tiny pub/sub for "user picked a role to apply to from somewhere on the
 * page; scroll to the apply form and pre-select it." A custom DOM event keeps
 * the cross-section coupling explicit and avoids pulling in a state library
 * for one wire.
 *
 * The detail string is either a role slug, or 'general' for the no-specific-
 * role option.
 */

export const APPLY_EVENT = 'lwg:apply-role';

export type ApplyEventDetail = {
  roleSlug: string | 'general';
};

export function dispatchApplyRole(roleSlug: string | 'general'): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent<ApplyEventDetail>(APPLY_EVENT, {
      detail: { roleSlug },
    }),
  );
}
