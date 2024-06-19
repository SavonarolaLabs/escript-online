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
		githubUsername,
	} from "./firebaseUtils";
	import { getAuth } from "firebase/auth";
	let newRepoName = "test-repo";

	export let params = {
		address:
			"D1CKW3rNasJySb7cWbBiuoEAxym6wHSRukwRHex2P2Lgp1SQMTM2joSgRGK25fnXYArm533zmgtYupVWfDUY5RXjFDcPXzm3YJg25vbVM2QpSrhaXzXt5ZtwNntU2h19YgLYuBu4wy2yY3ibAVHg24jbqfTfV8vQTCy7p2N9zvfSUVujHe5qXWMHNmhGUskYSwFrKdbhHXrKuuD1EpcRAs6iaAz7A93LRfJuq6B31vWBM7HodyTpARhJzwT99ko5Rs3SQsEBKSuhifhSrpaSGbzAR7Z7F5E39Qee4vsgvjd3qiPzqe36bTU1xvtraDvWAjFMjj5ZfJLJgTuMEsekDuhssKVCFVuWVa6APunBeAbaTWSNqiGoYzDevJ8ZTsHWwrxD9S2NzumU6wiEPzgvbYPTbA3hqK15t1aq4P2P9UPYwNJp7w",
		parties: [
			{
				address: "19g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW",
				name: "pkAlice",
			},
			{
				address: "29g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW",
				name: "pkBob",
			},
			{
				address: "39g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW",
				name: "pkCharlie",
			},
			{
				address: "49g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW",
				name: "pkDick",
			},
			{
				address: "59g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW",
				name: "pkEma",
			},
		],
	};

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
				localStorage.setItem(
					"githubUser",
					JSON.stringify(firebaseUser)
				);
			} else {
				localStorage.removeItem("githubUser");
			}
		});
	});

	async function deployPages() {
		let username;
		githubUsername.subscribe((value) => (username = value))();
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
			<button class="btn" on:click={() => createRepo(newRepoName, params)}
				>Create Repository</button
			>
		</div>
	{:else}
		<button on:click={login}>Login with GitHub</button>
	{/if}
</div>

<a
	class="text-blue-400 underline"
	href={`https://${$githubUsername}.github.io/${newRepoName}/`}
	>{newRepoName} pages</a
>

<style>
	.hidden {
		display: none;
	}
</style>
