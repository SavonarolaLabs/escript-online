<script lang="ts">
	const address = "7W3rNasJySb7cWbBiuoEAxym6wHSRukwRHex2P2Lgp1SQMTM2joSgRGK25fnXYArm533zmgtYupVWfDUY5RXjFDcPXzm3YJg25vbVM2QpSrhaXzXt5ZtwNntU2h19YgLYuBu4wy2yY3ibAVHg24jbqfTfV8vQTCy7p2N9zvfSUVujHe5qXWMHNmhGUskYSwFrKdbhHXrKuuD1EpcRAs6iaAz7A93LRfJuq6B31vWBM7HodyTpARhJzwT99ko5Rs3SQsEBKSuhifhSrpaSGbzAR7Z7F5E39Qee4vsgvjd3qiPzqe36bTU1xvtraDvWAjFMjj5ZfJLJgTuMEsekDuhssKVCFVuWVa6APunBeAbaTWSNqiGoYzDevJ8ZTsHWwrxD9S2NzumU6wiEPzgvbYPTbA3hqK15t1aq4P2P9UPYwNJp7w";
	const parties = [
		{ address: "", name: "pkAlice" },
		{ address: "", name: "pkBob" },
		{ address: "", name: "pkCharli" },
		{ address: "", name: "pkDick" },
		{ address: "", name: "pkEma" },
	];
</script>

<div class="nav flex items-center gap-2 justify-between p-4">
	<div class="text-2xl">LIONGUARD</div>
	<div class="flex items-center gap-4">
		<a href="https://explorer.ergoplatform.com/en/"> Explorer </a>
		<div>KYA</div>
		<div>Support</div>
		<div class="connect">Connect Wallet</div>
	</div>
</div>
<div class="top-section flex items-center gap-8">
	<div class="py-2">
		<img class="main-img" src="lionguard.webp" alt="" />
	</div>
	<div>
		<div>SMART CONTRACT::</div>
		<div class="address pr-6">
			{address}
		</div>
	</div>
</div>
<div class="flex flex-col gap-2 p-2" style="overflow-y:scroll;">
	{#each parties as x}
		<div class="flex rounded-sm p-4 items-center gap-5 dark-bg">
			<div
				class="rounded-full gray-bg items-center justify-center flex font-bold"
				style="height:3em;width:3em; border-right: 1px solid var(--color-cyan);"
			>
				{x.name.charAt(2) ?? "x"}
			</div>
			<div class="flex flex-col w-full">
				<div>{x.name}</div>
				<input
					class="w-full thin text-xl rounded"
					bind:value={x.address}
				/>
			</div>
		</div>
	{/each}
</div>
<div
	class="footer p2 absolute bottom-0 w-full items-center dark-bg flex justify-between p-6 px-10"
>
	<div class="flex gap-5" style="color:var(--color-light-gray);">
		<div>
			Status: <span class="text-white">READY</span>
		</div>
		<div>{parties.filter(x => x.address.length >0).length}/{parties.length} Addreses set</div>
	</div>
	<div class="flex">
		<input
			class="flex rounded-sm p-3 gap-5"
			value="10000"
			style="border-top-left-radius: 20px;"
		/>
		<div>
			<button
				class="px-6 py-3 cyan-bg text-black rounded-sm font-bold"
				style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-bottom-right-radius:10px"
				>DEPOSIT</button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	:root {
		--color-dark-gray: #5e6262;
		--color-very-dark-gray: #141413;
		--color-white: #fbfcfc;
		--color-light-gray: #a5abac;
		--color-cyan: #3ce6ef;
	}
	.nav {
		border-bottom: 1px solid rgb(75, 75, 75);
	}
	.footer {
		border-top: 1px solid rgb(75, 75, 75);
	}
	.connect {
		background: var(--color-light-gray);
		color: var(--color-very-dark-gray);
		line-height: 1em;
		font-family: "Courier New", Courier, monospace;
		font-size: larger;
		@apply rounded-full px-4 py-2;
	}

	.top-section {
		background-color: var(--color-very-dark-gray);
	}
	.main-img {
		width: auto;
		max-width: 300px;
	}
	.address {
		word-break: break-all;
		font-weight: 100;
	}
	.thin {
		font-weight: 100;
	}
	.dark-bg {
		background-color: var(--color-very-dark-gray);
	}
	.gray-bg {
		background-color: var(--color-dark-gray);
	}
	.cyan-bg {
		background-color: var(--color-cyan);
	}
</style>
