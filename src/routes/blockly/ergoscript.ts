import * as Blockly from "blockly/core";

export const ergoScriptGenerator = new Blockly.Generator("ErgoScript");

ergoScriptGenerator.ORDER_ATOMIC = 0;
ergoScriptGenerator.ORDER_LOGICAL_AND = 1;
ergoScriptGenerator.ORDER_LOGICAL_OR = 1;
ergoScriptGenerator.ORDER_CONDITIONAL = 2;

let uniqueKeys

ergoScriptGenerator.init = function (workspace) {
	uniqueKeys = new Set();
};

ergoScriptGenerator.finish = function (code) {
	const uniqueKeysArray = Array.from(uniqueKeys).map((k,i) =>`  val ${k} = SELF.R4[Coll[SigmaProp]].get(${i})`).join("\n");
	return `{\n${uniqueKeysArray}\n\n${code.split('\n').map(line => '  '+line).join("\n")}\n}`;
};

ergoScriptGenerator.forBlock = Object.create(null);

ergoScriptGenerator.forBlock["public_key"] = function (block) {
	const key = block.getFieldValue("key");
	const code = `pk${key}`;
	uniqueKeys.add(code);
	return [code, ergoScriptGenerator.ORDER_ATOMIC];
};

ergoScriptGenerator.forBlock["public_key_threshold"] = function (block) {
	const key = block.getFieldValue("key");
	const code = `pk${key}`;
	uniqueKeys.add(code);
	return code;
};

ergoScriptGenerator.forBlock["and"] = function (block) {
	const valueA = ergoScriptGenerator.valueToCode(
		block,
		"A",
		ergoScriptGenerator.ORDER_ATOMIC
	);
	const valueB = ergoScriptGenerator.valueToCode(
		block,
		"B",
		ergoScriptGenerator.ORDER_ATOMIC
	);
	const code = `${valueA} && ${valueB}`;
	return [code, ergoScriptGenerator.ORDER_LOGICAL_AND];
};

ergoScriptGenerator.forBlock["or"] = function (block) {
	const valueA = ergoScriptGenerator.valueToCode(
		block,
		"A",
		ergoScriptGenerator.ORDER_ATOMIC
	);
	const valueB = ergoScriptGenerator.valueToCode(
		block,
		"B",
		ergoScriptGenerator.ORDER_ATOMIC
	);
	const code = `${valueA} || ${valueB}`;
	return [code, ergoScriptGenerator.ORDER_LOGICAL_OR];
};

ergoScriptGenerator.forBlock["timelock"] = function (block) {
	const blockheight = block.getFieldValue("blockheight");
	const valueDo = ergoScriptGenerator.valueToCode(
		block,
		"DO",
		ergoScriptGenerator.ORDER_ATOMIC
	);
	const valueElse = ergoScriptGenerator.valueToCode(
		block,
		"ELSE",
		ergoScriptGenerator.ORDER_ATOMIC
	);
	let code = `if(HEIGHT <= ${blockheight}){${valueDo}}`;
	
	if(valueElse){
		code += `else{${valueElse}}`
	}
	return [code, ergoScriptGenerator.ORDER_CONDITIONAL];
};

ergoScriptGenerator.forBlock["threshold"] = function (block) {
	const min = block.getFieldValue("min");

	let max = 0;
	let cb = block.getInputTargetBlock("KEYS");
	let txt = "";

	while (cb) {
		const key = cb.getFieldValue("key");
		if (key) {
			txt += `pk${key}, `;
			uniqueKeys.add(`pk${key}`);
			max++;
		}
		cb = cb.getNextBlock();
	}

	if (txt.length > 0) {
		txt = txt.slice(0, -2); // Remove the trailing comma and space
	}

	block.setFieldValue(max.toString(), "max");

	const code = `atLeast(${min}, Coll(${txt}))`;
	return [code, ergoScriptGenerator.ORDER_ATOMIC];
};

export const blocks = [
	{
		type: "public_key",
		message0: "pk %1",
		args0: [
			{
				type: "field_input",
				name: "key",
				text: "1",
			},
		],
		output: "Boolean",
		colour: 230,
		tooltip: "Public key",
		helpUrl: "",
	},
	{
		type: "and",
		message0: "%1 && %2",
		args0: [
			{
				type: "input_value",
				name: "A",
				check: "Boolean",
			},
			{
				type: "input_value",
				name: "B",
				check: "Boolean",
			},
		],
		output: "Boolean",
		colour: 120,
		tooltip: "AND operation",
		helpUrl: "",
	},
	{
		type: "or",
		message0: "%1 || %2",
		args0: [
			{
				type: "input_value",
				name: "A",
				check: "Boolean",
			},
			{
				type: "input_value",
				name: "B",
				check: "Boolean",
			},
		],
		output: "Boolean",
		colour: 210,
		tooltip: "OR operation",
		helpUrl: "",
	},
	{
		type: "timelock",
		message0: "blockheight <= %1 do %2 else %3",
		args0: [
			{
				type: "field_number",
				name: "blockheight",
				value: 0,
			},
			{
				type: "input_value",
				name: "DO",
				check: "Boolean",
			},
			{
				type: "input_value",
				name: "ELSE",
				check: "Boolean",
			},
		],
		output: "Boolean",
		colour: 210,
		tooltip: "Timelock conditional",
		helpUrl: "",
	},
	{
		type: "threshold",
		message0: "atLeast %1 of %2 keys %3",
		args0: [
			{
				type: "field_number",
				name: "min",
				value: 1,
			},
			{
				type: "field_label",
				name: "max",
				text: "0",
			},
			{
				type: "input_statement",
				name: "KEYS",
				check: "Key",
			},
		],
		output: "Boolean",
		colour: 120,
		tooltip: "Threshold signature scheme",
		helpUrl: "",
	},
	{
		type: "public_key_threshold",
		message0: "pk %1",
		args0: [
			{
				type: "field_input",
				name: "key",
				text: "1",
			},
		],
		previousStatement: "Key",
		nextStatement: "Key",
		colour: 230,
		tooltip: "Public key for threshold",
		helpUrl: "",
	},
];
