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
				<DialogContentText id="alert-dialog-description">{text}</DialogContentText>
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
