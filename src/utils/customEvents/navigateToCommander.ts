export function navigateToCommander(basename?: string): void {
  const path = basename ?? '/';

  window.dispatchEvent(
    new CustomEvent('navigate-parent-app', {
      detail: path,
    }),
  );
}
