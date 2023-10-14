function formatClockTimeToHHMMSS(totalSeconds: number): string {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor(totalSeconds / 60) % 60;
	const seconds = totalSeconds % 60;

	return [hours, minutes, seconds]
		.map((item) => item.toString().padStart(2, "0"))
		.filter((item, index) => item !== "00" || index > 0)
		.join(":");
}

export { formatClockTimeToHHMMSS };
