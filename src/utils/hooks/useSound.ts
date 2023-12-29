import { selectIsSoundEnabled } from "@/store/selectors";
import { useAppSelector } from "@/utils/hooks/store";

const useSound = (src: string): (() => void) => {
	const isSoundEnabled = useAppSelector(selectIsSoundEnabled);

	return (): void => {
		if (isSoundEnabled) {
			void new Audio(src).play();
		}
	};
};

export { useSound };
