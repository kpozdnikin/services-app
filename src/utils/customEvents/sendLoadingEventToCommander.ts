export const sendLoadingEventToCommander = (loading: boolean) => {
  window.dispatchEvent(
    new CustomEvent('service-form-loading', {
      detail: loading,
    }),
  );
};
