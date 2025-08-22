export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: ["rounded-sm cursor-pointer"],
      },
    },
    container: {
      base: "mx-auto max-w-(--ui-container) px-4 w-full sm:px-6 lg:px-8 bg-red-500 py-4",
    },
  },
});
