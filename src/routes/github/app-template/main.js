import { connectWallet, deposit } from './wallet.js';

document.addEventListener("DOMContentLoaded", async () => {
    const configDataElement = document.getElementById('configData');
    const config = JSON.parse(configDataElement.textContent);
    const address = config.address;
    const parties = config.parties;

	document.getElementById('contract-address').textContent = address;
	// @ts-ignore
	document.getElementById("explorerLink").href = "https://explorer.ergoplatform.com/en/addresses/" + address;
	document.getElementById("connectWallet").addEventListener("click", connectWallet);

	document.getElementById("depositBtn").addEventListener("click", ()=>deposit(address,parties.map(p =>p.address)));


	const partiesContainer = document.getElementById('parties-container');
	parties.forEach(party => {
		const partyDiv = document.createElement('div');
		partyDiv.className = 'flex rounded-sm p-4 items-center gap-5 dark-bg';
		partyDiv.innerHTML = `
			<div class="rounded-full gray-bg items-center justify-center flex font-bold"
				 style="height:3em;width:3em; border-right: 1px solid var(--color-cyan);">
				${party.name.charAt(2) ?? "x"}
			</div>
			<div class="flex flex-col w-full">
				<div>${party.name}</div>
				<input class="address-input w-full thin text-xl rounded" value="${party.address}" />
			</div>
		`;
		partiesContainer.appendChild(partyDiv);
	});

	function updateStatus() {
		const addressInputs = document.querySelectorAll('.address-input');
		const allFilled = Array.from(addressInputs).every(input => input.value.trim() !== '');
		const filledCount = Array.from(addressInputs).filter(input => input.value.trim() !== '').length;
		const statusElement = document.getElementById('status');
		const statusNotReadyElement = document.getElementById('statusNotReady');

		document.getElementById('addresses-set').textContent = `${filledCount}/${parties.length} Addresses set`;

		if (allFilled) {
			statusElement.style.display = 'inline-block';
			statusNotReadyElement.style.display = 'none';
		} else {
			statusElement.style.display = 'none';
			statusNotReadyElement.style.display = 'inline-block';
		}
	}

	document.querySelectorAll('.address-input').forEach(input => {
		input.addEventListener('input', updateStatus);
	});

	updateStatus(); // Initial check
});