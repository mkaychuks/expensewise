<script setup lang="ts">
const { logOut } = useAuth();
const toast = useToast();
const signOut = async () => {
  await logOut().then(() => {
    navigateTo("/signin");
    toast.add({
      title: "Success",
      description: "User logout successful",
      color: "primary",
    });
  });
};

const route = useRoute();
</script>

<template>
  <!-- the navigation bar of the dashboard -->
  <nav class="flex items-center justify-between relative">
    <!-- the logo -->
    <NuxtLink to="/" class="font-bold"
      ><div class="flex gap-1 items-center">
        <img src="/logo.png" alt="logo" width="30" height="30" />
        <h1>Expensewise</h1>
      </div></NuxtLink
    >
    <!-- the dashboard links -->
    <div>
      <!-- the dashboard link -->
      <ul class="sm:flex items-center gap-8 cursor-pointer">
        <li class="hover:underline">
          <NuxtLink
            to="/dashboard"
            :active-class="route.path === '/dashboard' ? 'underline' : 'none'"
            >Dashboard</NuxtLink
          >
        </li>
        <li class="hover:underline">
          <NuxtLink
            to="/dashboard/income"
            :active-class="
              route.path.startsWith('/dashboard/income') ? 'underline' : 'none'
            "
            >Income</NuxtLink
          >
        </li>
        <li class="hover:underline">
          <NuxtLink
            to="/dashboard/expenses"
            :active-class="
              route.path.startsWith('/dashboard/expenses')
                ? 'underline'
                : 'none'
            "
            >Expenses</NuxtLink
          >
        </li>
        <li>
          <Button
            @click="signOut"
            class="text-base font-normal"
            leading-icon="lucide:log-out"
            >Logout</Button
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
