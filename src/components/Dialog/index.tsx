import {
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Dialog as MUIDialog,
} from "@mui/material";
import React from "react";

import {
	restart,
	selectClockTime,
	selectFinishMessage,
	selectIsFinishStatus,
	selectOpenCellCount,
} from "@/store/mainSlice";
import { formatClockTime } from "@/utils/formatClockTime";
import { getSuffix } from "@/utils/getSuffix";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { replaceStubsInString } from "@/utils/replaceStubsInString";

const Dialog = (): React.ReactNode => {
	const isFinishStatus = useAppSelector(selectIsFinishStatus);
	const { title, text } = useAppSelector(selectFinishMessage);
	const clockTime = useAppSelector(selectClockTime);
	const turns = useAppSelector(selectOpenCellCount);
	const dispatch = useAppDispatch();

	return (
		<MUIDialog
			aria-describedby="alert-dialog-description"
			aria-labelledby="alert-dialog-title"
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
				<Button autoFocus variant="contained" onClick={() => dispatch(restart())}>
					Restart
				</Button>
			</DialogActions>
		</MUIDialog>
	);
};

export { Dialog };
