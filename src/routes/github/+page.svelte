<script lang="ts">
	import { onMount } from "svelte";
	import { initializeApp } from "firebase/app";
	import {
		getAuth,
		GithubAuthProvider,
		signInWithPopup,
		signOut,
	} from "firebase/auth";
	import { Octokit } from "@octokit/rest";
	import { firebaseConfig } from "./firebaseConfig";

	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const provider = new GithubAuthProvider();
	provider.addScope('repo'); // Request the 'repo' scope

	let user:any= null;
	let newRepoName = "test-repo";
	let githubToken = "";
	let result: any;

	onMount(() => {
		auth.onAuthStateChanged(async (firebaseUser) => {
			user = firebaseUser;
		});
	});

	const login = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			user = result.user;
			const credential = GithubAuthProvider.credentialFromResult(result);
			if (credential) {
				githubToken = credential.accessToken as string;
			}
			console.log("GitHub Access Token:", githubToken);
			console.log("User Info:", user);
		} catch (error) {
			console.error("Error during sign-in:", error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			user = null;
			githubToken = "";
		} catch (error) {
			console.error("Error during sign-out:", error);
		}
	};

	const createRepo = async () => {
		if (newRepoName && githubToken) {
			const octokit = new Octokit({
				auth: githubToken,
			});

			try {
				const response = await octokit.request('POST /user/repos', {
					name: newRepoName,
					description: 'This is your first repo!',
					homepage: 'https://github.com',
					private: false,
					is_template: true,
					headers: {
						'X-GitHub-Api-Version': '2022-11-28'
					}
				});
				console.log("Repository created successfully:", response.data);
				newRepoName = ""; // Clear the input field
			} catch (error) {
				console.error("Error creating repository:", error);
			}
		} else {
			console.error("Repository name or GitHub token is missing");
		}
	};
</script>

<div class="auth-container">
	{#if user}
		<p>Welcome, {user.email}</p>
		<button on:click={logout}>Logout</button>
		<div>
			<input
				type="text"
				bind:value={newRepoName}
				placeholder="New repository name"
			/>
			<button on:click={createRepo}>Create Repository</button>
		</div>
	{:else}
		<button on:click={login}>Login with GitHub</button>
	{/if}

	{#if result}
		{JSON.stringify(result, null, 2)}
	{/if}
</div>

<style>
	.hidden {
		display: none;
	}
</style>
