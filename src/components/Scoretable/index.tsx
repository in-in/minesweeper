import { lazy } from "react";

const LazyScoretable = lazy(async () => {
	const { Scoretable } = await import("@/components/Scoretable/Scoretable");
	return {
		default: Scoretable,
	};
});

export { LazyScoretable };
