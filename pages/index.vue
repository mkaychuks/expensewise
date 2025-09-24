<script setup lang="ts">
useHead({
  title: "Expensewise",
});
const { isDesktop } = useDesktop();

</script>

<template>
  <!-- the hero section  -->
  <div v-if="isDesktop">
    <section id="hero" class="relative overflow-hidden">
      <!-- Animated background (example SVG wave) -->
      <div class="absolute inset-0 pointer-events-none">
        <svg viewBox="0 0 1440 320" class="w-full h-32 sm:h-48">
          <path
            fill="#f3f4f6"
            fill-opacity="1"
            d="M0,160L1440,32L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div
        class="relative flex flex-col items-center justify-center text-center sm:pt-12 pt-4"
      >
        <h1 class="text-4xl lg:text-5xl font-bold max-w-4xl">
          <span class="text-primary">Effortlessly</span> Manage Your Expenses
          with
          <span class="text-secondary">ExpenseWise</span>
        </h1>
        <p class="font-semibold tracking-tight my-3 text-lg">
          Take control of your money—track, plan, and thrive. <br />
          <span class="text-green-600 font-bold">No more money mysteries.</span>
        </p>
        <div class="flex gap-4 my-5 lg:my-10">
          <NuxtLink
            to="/signup"
            class="bg-primary px-3 py-2 text-base gap-2 rounded-md text-white"
            >Get Started Free</NuxtLink
          >
          <NuxtLink
            to="/signup"
            class="bg-secondary px-3 py-2 text-base gap-2 rounded-md text-white"
            >View Demo</NuxtLink
          >
        </div>
        <!-- Trust badge or testimonial -->
        <div class="mt-4 text-sm text-gray-500 mb-10">
          <span>⭐ Trusted by 1,000+ users</span>
        </div>
      </div>
    </section>
    <!-- the features section -->
    <section id="features" class="bg-gray-50 py-10">
      <div class="max-w-6xl mx-auto">
        <h2 class="font-extrabold text-3xl lg:text-4xl mb-2">Key Features</h2>
        <p class="mb-6 text-gray-600">
          ExpenseWise offers a range of features to help you manage your
          finances effectively.
        </p>
        <!-- the features card -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- #1 -->
          <Card class="transition-transform hover:scale-105 hover:shadow-lg">
            <Icon name="lucide:circle-dollar-sign" class="size-5" />
            <p class="font-bold">Real-Time Tracking</p>
            <small
              >Track your expenses as they happen, ensuring you're always aware
              of your spending.</small
            >
          </Card>
          <!-- #2 -->
          <Card class="transition-transform hover:scale-105 hover:shadow-lg">
            <Icon name="lucide:list" class="size-5" />
            <p class="font-bold">Expense Categorization</p>
            <small
              >Categorize your expenses to understand where your money is
              going.</small
            >
          </Card>
          <!-- #3 -->
          <Card class="transition-transform hover:scale-105 hover:shadow-lg">
            <Icon name="lucide:chart-no-axes-combined" class="size-5" />
            <p class="font-bold">AI Assistant Reports</p>
            <small
              >Generate detailed reports to analyze your spending habits over
              time.</small
            >
          </Card>
        </div>
      </div>
    </section>
    <!-- the Action section  -->
    <section id="action">
      <div
        class="flex flex-col items-center justify-center text-center sm:pt-12 pt-4"
      >
        <h1 class="text-4xl lg:text-5xl font-bold max-w-4xl">
          Ready to Take Control of Your Finances?
        </h1>
        <p class="font-semibold tracking-tight my-3">
          Sign up for ExpenseWise today and start managing your expenses like a
          pro.
        </p>
        <div class="flex gap-4 my-5 lg:my-10">
          <NuxtLink
            to="/signup"
            class="bg-primary px-3 py-2 text-base gap-2 rounded-md text-white"
            >Start Tracking Now</NuxtLink
          >
        </div>
      </div>
    </section>
  </div>
  <!-- show this when not desktop -->
  <div class="w-full h-dvh justify-center items-center flex flex-col" v-else>
    <div class="flex gap-1 items-center mb-2">
      <img src="/logo.png" alt="logo" width="30" height="30" />
      <h1>Expensewise</h1>
    </div>
    <p class="leading-tight text-center w-full">
      This app is only available on larger screens.Please rotate your device or
      use a desktop.
    </p>
  </div>
</template>
