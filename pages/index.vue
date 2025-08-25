<script setup lang="ts"></script>

<template>
  <!-- the hero section  -->
  <section id="hero">
    <div
      class="flex flex-col items-center justify-center text-center sm:pt-12 pt-4"
    >
      <h1 class="text-4xl lg:text-5xl font-bold max-w-4xl">
        Manage Your Expenses Easily With ExpenseWise
      </h1>
      <p class="font-semibold tracking-tight my-3">
        No more money mysteries. Track expenses effortlessly and feel confident
        about your finances.
      </p>
      <div class="flex gap-4 my-5 lg:my-10">
        <Button size="xl">Get Started Free</Button>
        <Button color="secondary" size="xl">View Demo</Button>
      </div>
    </div>
  </section>
  <!-- the features section -->
  <section id="features">
    <div class="max-w-6xl mx-auto">
      <h2 class="font-extrabold text-3xl lg:text-4xl">Key Features</h2>
      <p class="mb-4">
        ExpenseWise offers a range of features to help you manage your finances
        effectively.
      </p>
      <!-- the features card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- #1 -->
        <Card>
          <p class="font-bold">Real-Time Tracking</p>
          <small
            >Track your expenses as they happen, ensuring you're always aware of
            your spending.</small
          >
        </Card>
        <!-- #2 -->
        <Card>
          <p class="font-bold">Expense Categorization</p>
          <small
            >Categorize your expenses to understand where your money is
            going.</small
          >
        </Card>
        <!-- #3 -->
        <Card>
          <p class="font-bold">Budget Planning</p>
          <small
            >Set monthly budgets and receive alerts when you're approaching your
            limits.</small
          >
        </Card>
        <!-- #4 -->
        <Card>
          <p class="font-bold">Monthly Reports</p>
          <small
            >Generate detailed reports to analyze your spending habits over
            time.</small
          >
        </Card>
      </div>
    </div>
  </section>
  <!-- the benefits section -->
  <section id="benefits">
    <div class="max-w-6xl mx-auto mt-6">
      <h2 class="font-extrabold text-3xl lg:text-4xl">Benefits</h2>
      <p class="mb-4">
        Experience the benefits of organized financial management with
        ExpenseWise.
      </p>
      <!-- the features card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- #1 -->
        <Card>
          <p class="font-bold">Track income and expenses effortlessly</p>
          <small
            >Easily monitor your income and expenses in one place, simplifying
            your financial overview.</small
          >
        </Card>
        <!-- #2 -->
        <Card>
          <p class="font-bold">Stay within your monthly budget</p>
          <small
            >Keep your spending in check with our intuitive budget planning
            tools.</small
          >
        </Card>
        <!-- #3 -->
        <Card>
          <p class="font-bold">Get insights in plain numbers</p>
          <small
            >Understand your financial health with clear, easy-to-understand
            reports and analytics.</small
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
       Sign up for ExpenseWise today and start managing your expenses like a pro.
      </p>
      <div class="flex gap-4 my-5 lg:my-10">
        <Button size="xl">Start Tracking Now</Button>
      </div>
    </div>
  </section>
</template>
