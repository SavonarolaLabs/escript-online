<script lang="ts">
	import { onMount } from "svelte";
	import {
		user,
		login,
		logout,
		createRepo,
		fetchGitHubUsername,
		githubToken,
		githubUsername,
	} from "./firebaseUtils";
	import { getAuth } from "firebase/auth";
	import { showToast } from "$lib/toaster";
	let newRepoName = "demo-app";

	export let params = {
		address:
			"D1CKW3rNasJySb7cWbBiuoEAxym6wHSRukwRHex2P2Lgp1SQMTM2joSgRGK25fnXYArm533zmgtYupVWfDUY5RXjFDcPXzm3YJg25vbVM2QpSrhaXzXt5ZtwNntU2h19YgLYuBu4wy2yY3ibAVHg24jbqfTfV8vQTCy7p2N9zvfSUVujHe5qXWMHNmhGUskYSwFrKdbhHXrKuuD1EpcRAs6iaAz7A93LRfJuq6B31vWBM7HodyTpARhJzwT99ko5Rs3SQsEBKSuhifhSrpaSGbzAR7Z7F5E39Qee4vsgvjd3qiPzqe36bTU1xvtraDvWAjFMjj5ZfJLJgTuMEsekDuhssKVCFVuWVa6APunBeAbaTWSNqiGoYzDevJ8ZTsHWwrxD9S2NzumU6wiEPzgvbYPTbA3hqK15t1aq4P2P9UPYwNJp7w",
		parties: [
			{
				address: "19g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW",
				name: "pkAlice",
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

	async function clickCreateRepo() {
		if(!params.address){
			showToast('Please create a valid contract first.','error')
			return;
		}
		if($user){
			createRepo(newRepoName, params)
		}else{
			showToast('Please connect a Github account.','error')
		}
	}

</script>

<div class="flex gap-4 items-center">
	<div class="flex">
		<input
			type="text"
			bind:value={newRepoName}
			placeholder="New repository name"
		/>
		<button
			class="btn-secondary"
			style="border-top-left-radius:0;border-bottom-left-radius:0;"
			on:click={clickCreateRepo}
			>Create App</button
		>
	</div>
	<a
		class="flex items-center gap-1 text-blue-400"
		target="_blank"
		href={`https://github.com/${$githubUsername}/${newRepoName}/`}
		>github <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1em" height="1em"
			><path
				d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
			/></svg
		>
	</a>
	<a
		class="flex items-center gap-1 text-blue-400"
		target="_blank"
		href={`https://${$githubUsername}.github.io/${newRepoName}/`}>pages <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1em" height="1em"
		><path
			d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"
		/></svg
	></a
	>
</div>

<div class="flex gap-4 items-center mr-6">
	{#if $user}
		<p>{$user.email}</p>
		<button class="btn-secondary" on:click={logout}>Logout</button>
	{:else}
		<button class="btn" on:click={login}>Login with GitHub</button>
	{/if}
</div>

<style>
	.btn-secondary:hover {
		border-color: #60a5fa;
		color: #60a5fa;
	}
	a > svg{
		fill: #60a5fa;
	}
</style>
