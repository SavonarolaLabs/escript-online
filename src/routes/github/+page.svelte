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
	provider.addScope("repo"); // Request the 'repo' scope

	let user: any = null;
	let newRepoName = "test-repo";
	let githubToken = "";
	let result: any;

	let octokit;

	let githubUsername = "";

	onMount(() => {
		const storedToken = localStorage.getItem("githubToken");
		const storedUser = localStorage.getItem("githubUser");

		if (storedToken && storedUser) {
			githubToken = storedToken;
			user = JSON.parse(storedUser);
			octokit = new Octokit({ auth: githubToken });
			fetchGitHubUsername();
			console.log("State restored from local storage");
		}

		auth.onAuthStateChanged(async (firebaseUser) => {
			user = firebaseUser;
			if (user) {
				localStorage.setItem("githubUser", JSON.stringify(user));
			} else {
				localStorage.removeItem("githubUser");
			}
		});
	});

	const login = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			user = result.user;
			const credential = GithubAuthProvider.credentialFromResult(result);
			if (credential) {
				githubToken = credential.accessToken as string;
				localStorage.setItem("githubToken", githubToken);
			}
			console.log("GitHub Access Token:", githubToken);
			console.log("User Info:", user);
			octokit = new Octokit({ auth: githubToken });
			await fetchGitHubUsername();
		} catch (error) {
			console.error("Error during sign-in:", error);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			user = null;
			githubToken = "";
			localStorage.removeItem("githubToken");
			localStorage.removeItem("githubUser");
		} catch (error) {
			console.error("Error during sign-out:", error);
		}
	};

	const createRepo = async () => {
		if (newRepoName && githubToken) {
			octokit = new Octokit({
				auth: githubToken,
			});

			try {
				const response = await octokit.request("POST /user/repos", {
					name: newRepoName,
					description: "This is your first repo!",
					homepage: "https://github.com",
					private: false,
					is_template: true,
					headers: {
						"X-GitHub-Api-Version": "2022-11-28",
					},
				});
				console.log("Repository created successfully:", response.data);

				// Create a simple file in the new repository
				await createFile();
				await deployAsGithubPage(octokit, githubUsername, newRepoName);
			} catch (error) {
				console.error("Error creating repository or file:", error);
			}
		} else {
			console.error("Repository name or GitHub token is missing");
		}
	};

	const fetchGitHubUsername = async () => {
		if (githubToken) {
			const octokit = new Octokit({
				auth: githubToken,
			});

			try {
				const { data } = await octokit.request("GET /user");
				githubUsername = data.login;
				console.log("GitHub Username:", githubUsername);
			} catch (error) {
				console.error("Error fetching GitHub username:", error);
			}
		}
	};

	const deployAsGithubPage = async (
		octokit: any,
		owner: string,
		repo: string
	) => {
		try {
			// Set the main branch as the GitHub Pages source
			const response = await octokit.request(
				"PUT /repos/{owner}/{repo}/pages",
				{
					owner: owner,
					repo: repo,
					source: {
						branch: "main",
						path: "/",
					},
				}
			);
			console.log(
				"GitHub Pages deployed from main branch:",
				response.data
			);
		} catch (error) {
			console.error("Error deploying GitHub Pages:", error);
		}
	};

	async function createFile() {
		octokit = new Octokit({
			auth: githubToken,
		});
		console.log(user);
		const createFileResponse = await octokit.request(
			"PUT /repos/{owner}/{repo}/contents/{path}",
			{
				owner: githubUsername,
				repo: newRepoName,
				path: "index.html",
				message: "Initial commit",
				content: btoa("<h1>Hello world</h1>"),
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			}
		);
		console.log(createFileResponse);
	}
</script>

<div class="auth-container">
	{#if user}
		<p>Welcome, {user.email}</p>
		<button on:click={logout}>Logout</button>
		<div class="flex">
			<input
				type="text"
				bind:value={newRepoName}
				placeholder="New repository name"
			/>
			<button class="btn" on:click={createRepo}>Create Repository</button>
		</div>
	{:else}
		<button on:click={login}>Login with GitHub</button>
	{/if}

	{#if result}
		{JSON.stringify(result, null, 2)}
	{/if}
</div>
<div class="flex flex-col items-start">
	<button class="btn" on:click={createFile}>create file</button>
	<button class="btn" on:click={fetchGitHubUsername}>deploy pages</button>
</div>

<style>
	.hidden {
		display: none;
	}
</style>
