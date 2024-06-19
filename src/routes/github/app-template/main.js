import { connectWallet, deposit } from './wallet.js';

document.addEventListener("DOMContentLoaded", async () => {
	const address = "7W3rNasJySb7cWbBiuoEAxym6wHSRukwRHex2P2Lgp1SQMTM2joSgRGK25fnXYArm533zmgtYupVWfDUY5RXjFDcPXzm3YJg25vbVM2QpSrhaXzXt5ZtwNntU2h19YgLYuBu4wy2yY3ibAVHg24jbqfTfV8vQTCy7p2N9zvfSUVujHe5qXWMHNmhGUskYSwFrKdbhHXrKuuD1EpcRAs6iaAz7A93LRfJuq6B31vWBM7HodyTpARhJzwT99ko5Rs3SQsEBKSuhifhSrpaSGbzAR7Z7F5E39Qee4vsgvjd3qiPzqe36bTU1xvtraDvWAjFMjj5ZfJLJgTuMEsekDuhssKVCFVuWVa6APunBeAbaTWSNqiGoYzDevJ8ZTsHWwrxD9S2NzumU6wiEPzgvbYPTbA3hqK15t1aq4P2P9UPYwNJp7w";
	const parties = [
		{ address: "9g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW", name: "pkAlice" },
		{ address: "9g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW", name: "pkBob" },
		{ address: "9g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW", name: "pkCharlie" },
		{ address: "9g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW", name: "pkDick" },
		{ address: "9g2hgnrfmsRjruxdyhD96UfWnQB4NmqmiovVPVETy4AHeTPpBkW", name: "pkEma" },
	];

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