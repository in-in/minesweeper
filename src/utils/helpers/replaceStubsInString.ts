function replaceStubsInString({
	text,
	slot1,
	slot2,
}: {
	text: string;
	slot1: string;
	slot2: string;
}): string {
	return text.replace("_slot1_", slot1).replace("_slot2_", slot2);
}

export { replaceStubsInString };
