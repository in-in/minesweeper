import type { RootState } from "@/store/store";

export function isRootState(state: unknown, sliceName: string): state is RootState {
	return typeof state === "object" && state !== null && sliceName in state;
}
