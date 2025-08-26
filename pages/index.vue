<script setup lang="ts">
const navigateToRegister = () => {
  navigateTo("/signup");
};
</script>

<template>
  <!-- the hero section  -->
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
        <span class="text-primary">Effortlessly</span> Manage Your Expenses with
        <span class="text-secondary">ExpenseWise</span>
      </h1>
      <p class="font-semibold tracking-tight my-3 text-lg">
        Take control of your money—track, plan, and thrive. <br />
        <span class="text-green-600 font-bold">No more money mysteries.</span>
      </p>
      <div class="flex gap-4 my-5 lg:my-10">
        <Button size="xl" @click="navigateToRegister">Get Started Free</Button>
        <Button color="secondary" size="xl" @click="navigateToRegister"
          >View Demo</Button
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
        ExpenseWise offers a range of features to help you manage your finances
        effectively.
      </p>
      <!-- the features card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- #1 -->
        <Card class="transition-transform hover:scale-105 hover:shadow-lg">
          <Icon name="lucide:circle-dollar-sign" class="size-5" />
          <p class="font-bold">Real-Time Tracking</p>
          <small
            >Track your expenses as they happen, ensuring you're always aware of
            your spending.</small
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
          <Icon name="lucide:calendar-1" class="size-5" />
          <p class="font-bold">Budget Planning</p>
          <small
            >Set monthly budgets and receive alerts when you're approaching your
            limits.</small
          >
        </Card>
        <!-- #4 -->
        <Card class="transition-transform hover:scale-105 hover:shadow-lg">
          <Icon name="lucide:chart-no-axes-combined" class="size-5" />
          <p class="font-bold">Monthly Reports</p>
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
        <Button size="xl" @click="navigateToRegister"
          >Start Tracking Now</Button
        >
      </div>
    </div>
  </section>
</template>
