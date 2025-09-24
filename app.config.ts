export default defineAppConfig({
  ui: {
    colors: {
      secondary: "slate",
      neutral: "black",
    },
    button: {
      slots: {
        base: ["rounded-sm cursor-pointer"],
      },
    },
    container: {
      base: "mx-auto max-w-(--ui-container) px-4 w-full sm:px-6 lg:px-8 py-4",
    },
    input: {
      slots: {
        base: ["placeholder:text-gray-500"],
      },
    },
  },
});
