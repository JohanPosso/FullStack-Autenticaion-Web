<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Empresas Spyware
        </q-toolbar-title>
        <div class="q-gutter-xs">
          <router-link to="/login">
            <q-btn style="background: #10a97e; color: white" label="Login" />
          </router-link>
          <router-link to="/register">
            <q-btn style="background: #cc6f0d; color: white" label="Register" />
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
