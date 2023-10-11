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
} from "@/store/mainSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const Dialog = (): React.ReactNode => {
	const isFinishStatus = useAppSelector(selectIsFinishStatus);
	const { title, text } = useAppSelector(selectFinishMessage);
	const clockTime = useAppSelector(selectClockTime);
	const dispatch = useAppDispatch();

	function replaceStubsInString({
		text,
		slot1,
	}: {
		text: string;
		slot1: number;
	}): string {
		return text.replace("_stub_", String(slot1));
	}

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
					{replaceStubsInString({ text, slot1: clockTime })}
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
