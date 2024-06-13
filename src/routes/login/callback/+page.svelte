<script lang="ts">
	import { onMount } from "svelte";
	import { createAuth0Client, Auth0Client } from "@auth0/auth0-spa-js";
	import { goto } from "$app/navigation";
	import { isAuthenticated } from "$lib/store";

	let auth0Client: Auth0Client | null = null;

	import { Octokit } from "@octokit/rest";

	async function createRepo(octo) {
		try {
			const response = await octo.repos.createForAuthenticatedUser({
				name: "new-repo-name",
				private: false,
			});
			console.log("Repository created successfully:", response.data);
		} catch (error) {
			console.error("Error creating repository:", error);
		}
	}

	onMount(async () => {
		await configureClient();
		const query = window.location.search;
		const shouldParseResult =
			query.includes("code=") && query.includes("state=");

		if (shouldParseResult) {
			try {
				const result = await auth0Client?.handleRedirectCallback();
				if (result) {
					const token = await auth0Client?.getTokenSilently();
					const user = await auth0Client?.getUser();
					const claims = await auth0Client?.getIdTokenClaims();

          const octokit = new Octokit({
            auth: token,
          });
          await createRepo(octokit);

					console.log({ user, claims, token });
					localStorage.setItem("authToken", token);
					localStorage.setItem("isAuthenticated", "true");
					isAuthenticated.set(true);

					if (result.appState && result.appState.targetUrl) {
						goto(result.appState.targetUrl);
					} else {
						goto("/github");
					}
				}
				console.log("Logged in!");
			} catch (err) {
				console.log("Error parsing redirect:", err);
				localStorage.setItem("isAuthenticated", "false");
				isAuthenticated.set(false);
			}
		}
	});

	const configureClient = async () => {
		auth0Client = await createAuth0Client({
			domain: "dev-p2vt4a2r3z7lnna4.us.auth0.com",
			clientId: "uxd2OTEJV5e94Qszy0MyMPPZnbbh5S2U",
		});
	};
</script>

<p>Loading...</p>
