import type { RootState } from "@/store/store";

export function isRootState(value: unknown, sliceName: string): value is RootState {
	return typeof value === "object" && value !== null && sliceName in value;
}
