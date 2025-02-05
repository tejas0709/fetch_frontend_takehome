# Fetch Dog Finder

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)

## Description

Welcome to **Fetch Dog Finder**, a web application designed to help dog lovers find their next furry friend. With this app, users can browse, filter, and favorite dogs from a vast database of shelter dogs. The ultimate goal? Finding the perfect match for adoption!

## Description

Welcome to **Fetch Dog Finder**, a web application designed to help dog lovers find their next furry friend. With this app, users can browse, filter, and favorite dogs from a vast database of shelter dogs. The ultimate goal? Finding the perfect match for adoption!

[Try the app here!](https://fetch-frontend-takehome-five.vercel.app/).

---

## Installation

If you’d like to run this app locally, follow these steps:

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```bash
   cd fetch-dog-finder
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env.local` file in the root directory and add the following:
   ```
   REACT_APP_BASE_URL=https://frontend-take-home-service.fetch.com
   ```
5. Run the development server:
   ```bash
   npm start
   ```
6. Open the app in your browser at `http://localhost:3000`.

---

## Usage

Upon launching the app, you'll encounter the following features:

1. **Login**  
   Users provide their name and email to authenticate. This ensures access to the Fetch API.

2. **Dog Search**  
   - Filter dogs by breed, zip code, or age range(After selecting your filters click apply filters).
   - Sort results alphabetically or by age.
   - Paginate through available dogs.

3. **Favorites and Matching**  
   - Add dogs to your favorites by double clicking on the dogcards or the heart icon.
   - Generate a "perfect match" based on your favorites.
   - View detailed information about your match.


4. **Logout**  
   End your session securely by logging out.

---

## Features

- **Dynamic Filters:** Refine searches by age, breed, or location.
- **Favorites List:** Save your favorite dogs for later.
- **Matching Algorithm:** Get matched with your ideal dog based on your favorites.
- **Responsive Design:** Enjoy a seamless experience on desktop and mobile devices.
- **Interactive Animations:** Delightful animations, including confetti on successful matches.

---

## Technologies Used

This app is built using the following technologies:

- **Frontend Framework:** React.js
- **Styling:** Material-UI (MUI)
- **State Management:** React Hooks
- **API Integration:** Fetch and Axios
- **Deployment:** Vercel
- **Tooling:** ESLint, Prettier

---
