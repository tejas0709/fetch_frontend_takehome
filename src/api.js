/**
 * API utility functions to interact with the Fetch Dog Finder backend.
 */

const BASE_URL = "https://frontend-take-home-service.fetch.com";

/**
 * Authenticates a user by sending their name and email to the login endpoint.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @throws Will throw an error if the login request fails.
 */
export const login = async (name, email) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  if (!response.ok) throw new Error("Login failed");
};

/**
 * Fetches the list of available dog breeds.
 * @returns {Promise<string[]>} A list of breeds.
 */
export const fetchBreeds = async () => {
  const response = await fetch(`${BASE_URL}/dogs/breeds`, { credentials: "include" });
  return response.json();
};

/**
 * Searches for dogs based on provided query parameters.
 * @param {string} query - The query string for the search.
 * @returns {Promise<Object>} The search results, including dog IDs and pagination info.
 */
export const searchDogs = async (query) => {
  const response = await fetch(`${BASE_URL}/dogs/search?${query}`, {
    credentials: "include",
  });
  return response.json();
};

/**
 * Fetches details for a list of dog IDs.
 * @param {string[]} ids - The IDs of the dogs to fetch.
 * @returns {Promise<Object[]>} A list of dog objects.
 */
export const fetchDogs = async (ids) => {
  const response = await fetch(`${BASE_URL}/dogs`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
  });
  return response.json();
};

/**
 * Finds the best match for adoption from a list of favorite dog IDs.
 * @param {string[]} ids - The IDs of the favorite dogs.
 * @returns {Promise<Object>} The matched dog object.
 */
export const fetchMatch = async (ids) => {
  const response = await fetch(`${BASE_URL}/dogs/match`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
  });
  return response.json();
};
