<script lang="ts">
    import { onMount } from "svelte";
    import {
        user,
        login,
        logout,
        createRepo,
        createFile,
        deployAsGithubPage,
        fetchGitHubUsername,
        githubToken,
        githubUsername
    } from "./firebaseUtils";
    import { getAuth } from "firebase/auth";

    let newRepoName = "test-repo";

    onMount(() => {
        const storedToken = localStorage.getItem("githubToken");
        const storedUser = localStorage.getItem("githubUser");

        if (storedToken && storedUser) {
            githubToken.set(storedToken);
            user.set(JSON.parse(storedUser));
            fetchGitHubUsername();
            console.log("State restored from local storage");
        }

        const auth = getAuth();
        auth.onAuthStateChanged(async (firebaseUser) => {
            user.set(firebaseUser);
            if (firebaseUser) {
                localStorage.setItem("githubUser", JSON.stringify(firebaseUser));
            } else {
                localStorage.removeItem("githubUser");
            }
        });
    });

    async function deplotPages() {
        let username;
        githubUsername.subscribe(value => username = value)();
        await deployAsGithubPage(octokit, username, newRepoName);
    }
</script>

<div class="auth-container">
    {#if $user}
        <p>Welcome, {$user.email}</p>
        <button on:click={logout}>Logout</button>
        <div class="flex">
            <input
                type="text"
                bind:value={newRepoName}
                placeholder="New repository name"
            />
            <button class="btn" on:click={() => createRepo(newRepoName)}>Create Repository</button>
        </div>
    {:else}
        <button on:click={login}>Login with GitHub</button>
    {/if}
</div>

<div class="flex flex-col items-start mb-4">
    <button class="btn" on:click={() => createFile(newRepoName)}>create file</button>
    <button class="btn" on:click={deplotPages}>deploy pages</button>
</div>

<a class="text-blue-400 underline" href={`https://${$githubUsername}.github.io/${newRepoName}`}>{newRepoName} pages</a>

<style>
    .hidden {
        display: none;
    }
</style>
