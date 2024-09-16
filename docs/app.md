# App.vue Documentation

## Overview

The `App.vue` file is the root component of a Vue 3 application that leverages Vuetify for UI components. This component structures the layout of the app by including a navigation bar, a main content area, and a dynamic view rendered through Vue Router's `RouterView` component. Vuetify is used for styling and layout, ensuring a responsive and consistent UI.

## Template Structure

The template defines the following layout elements:

### 1. `<v-app>`

This is the main wrapper provided by Vuetify. It establishes a Vuetify application context, which applies Vuetify's styling and layout system across the entire app.

### 2. `<v-app-bar>`

A Vuetify component used as the app's top navigation bar. It includes a slot for custom content and holds an avatar (logo) on the left side of the bar.

- **v-slot:prepend**: This slot is used to prepend custom content inside the app bar. In this case, a logo is inserted using the `v-avatar` component.

  - **`<v-avatar>`**: Displays an avatar or image, which in this case is a 64x64 pixel container holding a logo image.
  - **`<img>`**: The image tag inside `v-avatar` displays the logo image located at `/img/aiko.png`. It has an `alt` attribute for accessibility, and a `title` attribute for displaying a tooltip on hover.

### 3. `<v-main>`

The primary content area of the app. This is where the main content is displayed dynamically based on the current route.

- **`<v-container>`**: A fluid container from Vuetify that takes up 100% of the height (`h-100`) with no margins or padding (`ma-0 pa-0`), ensuring the main content expands fully within the layout.

- **`<RouterView>`**: Vue Router's component that renders the matched component for the current route. It acts as a placeholder for displaying pages or components based on the active route.

## Script Setup

The `<script setup>` block is written in TypeScript, using Vue 3's composition API to manage the component's logic.

### Imported Modules

- **`RouterView`**: Imported from `vue-router`, this component is used to dynamically render the appropriate component based on the current route.

## Summary

This `App.vue` component serves as the root layout for the application. It uses Vuetify's layout system to create a consistent UI structure, including an application bar with a logo and a dynamic main content area where different pages can be rendered based on the active route.

## Key Features

- Vuetify-based responsive layout.
- Dynamic routing with `RouterView`.
- Custom navigation bar with a logo.
