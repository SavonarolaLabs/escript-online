import { first } from "@fleet-sdk/common";
import {
	ErgoAddress,
	OutputBuilder,
	RECOMMENDED_MIN_FEE_VALUE,
	SByte,
	SColl,
	SGroupElement,
	SSigmaProp,
	TransactionBuilder,
} from "@fleet-sdk/core";

export async function connectWallet() {
	let wallet = "";
	let connected = false;
	let balanceInNanoErg = 0;
	// @ts-ignore
	if (!window.ergoConnector) {
		console.log("Please install Nautilus Wallet");
	} else {
		// @ts-ignore
		console.log("Detected wallets:", Object.keys(window.ergoConnector));
		// @ts-ignore
		wallet = Object.keys(window.ergoConnector)[0];
	}
	if (wallet) {
		// @ts-ignore
		connected = await ergoConnector[wallet].connect();
	}
	if (connected) {
		document.getElementById("connectWallet").style.display = "none";
		document.getElementById("disconnectWallet").style.display =
			"inline-block";

		// @ts-ignore
		balanceInNanoErg = await ergo.get_balance();
		console.log("balance", (balanceInNanoErg / 10 ** 9).toFixed(2));
	} else {
		console.log("canceled");
	}
}

// @ts-ignore
export async function deposit(contract, pks) {
    await connectWallet();
    // @ts-ignore
    const nanoErg = document.getElementById('nanoErgInput').value;
	const tx = await createDepositTx(contract, pks, nanoErg);
    // @ts-ignore
	const signedTx = await ergo.sign_tx(tx);
    console.log(signedTx);
}

async function createDepositTx(contract, pks, nanoErg) {
	const blockchainHeight = await fetchHeight();
	// @ts-ignore
	const inputBoxes = await ergo.get_utxos();
	// @ts-ignore
	const changeAddress = await ergo.get_change_address();

	const depositBox = new OutputBuilder(
		nanoErg,
		contract
	).setAdditionalRegisters({
		R4: SColl(SByte, pks.map(pk =>[
			SGroupElement(
				// @ts-ignore
				first(ErgoAddress.fromBase58(pk).getPublicKeys())
			),
		])).toHex(),
	});

	const unsignedTx = new TransactionBuilder(blockchainHeight)
		.from(inputBoxes)
		.to(depositBox)
		.sendChangeTo(changeAddress)
		.payFee(RECOMMENDED_MIN_FEE_VALUE)
		.build()
		.toEIP12Object();

	return unsignedTx;
}

async function fetchHeight() {
	try {
		const response = await fetch(
			"https://api.ergoplatform.com/api/v1/info"
		);
		const data = await response.json();
		return data.height;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}
