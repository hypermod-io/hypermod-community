const fs = require("fs");

const mappings = require("./mappings.json");

Object.entries(mappings).forEach(([k, v]) => {
	v.toNormalized = [];

	v.to.forEach((name) => {
		if (!name.length) {
			return;
		}

		name = name.replace(/--pd-color-/, "");

		name = toCamelCase(name.split("-"));

		v.toNormalized.push(name);
	});

	mappings[k] = v;
});

function toCamelCase(xs) {
	return (
		xs[0].toLowerCase() +
		xs
			.slice(1)
			.map((part) => ((part = part[0].toUpperCase() + part.slice(1)), part))
			.join("")
	);
}

fs.writeFileSync("mappings-with-normalized.json", JSON.stringify(mappings, null, 4), { encoding: "utf-8" });
