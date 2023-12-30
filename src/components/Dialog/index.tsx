import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Dialog as MUIDialog,
} from "@mui/material";

import click from "@/assets/sounds/click.mp3";
import failure from "@/assets/sounds/failure.mp3";
import tada from "@/assets/sounds/tada.mp3";
import { restart } from "@/store/mainSlice";
import {
	selectClockTime,
	selectFinishMessage,
	selectIsFinishStatus,
	selectStatus,
	selectTurnCounter,
} from "@/store/selectors";
import { formatClockTime } from "@/utils/helpers/formatClockTime";
import { getSuffix } from "@/utils/helpers/getSuffix";
import { replaceStubsInString } from "@/utils/helpers/replaceStubsInString";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/store";
import { useSound } from "@/utils/hooks/useSound";

const Dialog = (): React.ReactNode => {
	const isFinishStatus = useAppSelector(selectIsFinishStatus);
	const { title, text } = useAppSelector(selectFinishMessage);
	const clockTime = useAppSelector(selectClockTime);
	const turns = useAppSelector(selectTurnCounter);
	const status = useAppSelector(selectStatus);
	const dispatch = useAppDispatch();
	const playClick = useSound(click);
	const playTada = useSound(tada);
	const playFailure = useSound(failure);

	const handleClickRestart = (): void => {
		dispatch(restart());
		playClick();
	};

	if (status === "win") playTada();
	if (status === "lose") playFailure();

	return (
		<MUIDialog
			aria-describedby="alert-dialog-description"
			aria-labelledby="alert-dialog-title"
			data-testid="dialog"
			open={isFinishStatus}
			sx={{
				"& .MuiDialog-paper": {
					alignItems: "center",
				},
			}}
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{replaceStubsInString({
						text,
						slot1: formatClockTime(clockTime),
						slot2: `${turns} move${getSuffix(Number(turns))}`,
					})}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus variant="contained" onClick={handleClickRestart}>
					Restart
				</Button>
			</DialogActions>
		</MUIDialog>
	);
};

export { Dialog };
