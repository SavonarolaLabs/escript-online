<script lang="ts">
    import { onMount } from "svelte";
    import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";
    import { isAuthenticated } from "$lib/store";
  
    let auth0Client: Auth0Client | null = null;
    let url = "http://localhost:5173";
    // let url = 'https://escript.online';
    let newRepoName = '';
    let githubToken = ''; // Retrieve or set your GitHub token here.
  
    onMount(async () => {
      await configureClient();
  
      const authenticated = localStorage.getItem("isAuthenticated") === "true";
      isAuthenticated.set(authenticated);
  
      if (authenticated) {
        const token = localStorage.getItem("authToken");
        console.log("User is authenticated with token:", token);
        githubToken = token;
      }
  
      const query = window.location.search;
      const shouldParseResult = query.includes("code=") && query.includes("state=");
  
      if (shouldParseResult) {
        try {
          const result = await auth0Client?.handleRedirectCallback();
          if (result && result.appState && result.appState.targetUrl) {
            sessionStorage.setItem("appState", result.appState.targetUrl); // Save state
            window.history.replaceState({}, document.title, result.appState.targetUrl);
          }
          console.log("Logged in!");
          isAuthenticated.set(true);
          localStorage.setItem("isAuthenticated", "true");
          const token = await auth0Client?.getTokenSilently();
          localStorage.setItem("authToken", token);
          githubToken = token;
        } catch (err) {
          console.log("Error parsing redirect:", err);
        }
  
        window.history.replaceState({}, document.title, "/");
      } else {
        const savedState = sessionStorage.getItem("appState");
        if (savedState) {
          window.history.replaceState({}, document.title, savedState);
        }
      }
    });
  
    const login = async (targetUrl?: string) => {
      await auth0Client?.loginWithRedirect({
        authorizationParams: {
          redirect_uri: `${url}/login/callback`,
          connection: "github",
        },
      });
    };
  
    const logout = async () => {
      await auth0Client?.logout({
        logoutParams: {
          returnTo: url,
        },
      });
      isAuthenticated.set(false);
      localStorage.removeItem("authToken");
      localStorage.setItem("isAuthenticated", "false");
    };
  
    const configureClient = async () => {
      auth0Client = await createAuth0Client({
        domain: "dev-p2vt4a2r3z7lnna4.us.auth0.com",
        clientId: "uxd2OTEJV5e94Qszy0MyMPPZnbbh5S2U",
      });
    };
  
    const createRepo = async () => {
      if (newRepoName && githubToken) {
        try {
          const response = await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
              name: newRepoName,
              private: false
            })
          });
  
          if (response.ok) {
            console.log('Repository created successfully');
            newRepoName = ''; // Clear the input field
          } else {
            const errorData = await response.json();
            console.error('Error creating repository:', errorData);
          }
        } catch (error) {
          console.error('Error creating repository:', error);
        }
      } else {
        console.error('Repository name or GitHub token is missing');
      }
    };
  </script>
  
  <div class="w-full flex justify-end p-2">
    <button id="loginButton" on:click={() => login()} class:hidden={$isAuthenticated}>Login with GitHub</button>
    <button id="logoutButton" on:click={logout} class:hidden={!$isAuthenticated}>Logout</button>
  </div>
  <div class="flex p-2">
    {#if $isAuthenticated}
    <input type="text" bind:value={newRepoName} placeholder="New repository name" />
    <button class="btn" on:click={createRepo}>Create Repository</button>
  {/if}
  </div>
  
  <style>
    .hidden {
      display: none;
    }
  </style>
  