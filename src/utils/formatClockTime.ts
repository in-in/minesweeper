import { getSuffix } from "@/utils/getSuffix";

function formatClockTime(seconds: number): string {
	if (seconds === 0) {
		return "no time";
	}

	const MINUTE = 60;
	const HOUR = MINUTE * 60;
	const DAY = HOUR * 24;

	const units = {
		hour: Math.trunc((seconds % DAY) / HOUR),
		minute: Math.trunc((seconds % HOUR) / MINUTE),
		second: seconds % MINUTE,
	};

	const createUnitText = (n: number, unit: string): string =>
		n > 0 ? `${n} ${unit}${getSuffix(n)}` : "";

	const unitTexts: string[] = [];
	for (const [key, val] of Object.entries(units)) {
		if (createUnitText(val, key).length > 0) {
			unitTexts.push(createUnitText(val, key));
		}
	}

	const result: string[] = [];
	unitTexts.forEach((el, index) => {
		if (unitTexts.length > 0 && index !== 0) {
			result.push(index === unitTexts.length - 1 ? "and" : ",");
		}
		result.push(el);
	});

	return result.join(" ").replace(/\s,/g, ",");
}

export { formatClockTime };
