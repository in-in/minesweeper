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
	selectFinishMessage,
	selectIsFinishStatus,
} from "@/store/mainSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

const Dialog = (): React.ReactNode => {
	const isFinishStatus = useAppSelector(selectIsFinishStatus);
	const { title, text } = useAppSelector(selectFinishMessage);
	const dispatch = useAppDispatch();

	return (
		<MUIDialog
			sx={{
				"& .MuiDialog-paper": {
					alignItems: "center",
				},
			}}
			aria-describedby="alert-dialog-description"
			aria-labelledby="alert-dialog-title"
			open={isFinishStatus}
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{text}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={() => dispatch(restart())} variant="contained">
					Restart
				</Button>
			</DialogActions>
		</MUIDialog>
	);
};

export { Dialog };
