export const useDesktop = () => {
  const isDesktop = ref(false);
  const checkOrientation = () => {
    isDesktop.value = window.innerWidth > 480;
  };

  // composables
  onMounted(() => {
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", checkOrientation);
  });
  return { isDesktop };
};
