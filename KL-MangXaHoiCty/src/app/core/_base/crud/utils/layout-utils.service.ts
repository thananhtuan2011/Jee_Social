// Angular
import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
// Partials for CRUD
import { ActionNotificationComponent,
	DeleteEntityDialogComponent,
	FetchEntityDialogComponent,
	UpdateStatusDialogComponent
} from '../../../../views/partials/content/crud';

export enum MessageType {
	Create,
	Read,
	Update,
	Delete
}

@Injectable()
export class LayoutUtilsService {
	/**
	 * Service constructor
	 *
	 * @param snackBar: MatSnackBar
	 * @param dialog: MatDialog
	 */
	constructor(private snackBar: MatSnackBar,
		           private dialog: MatDialog) { }

	/**
	 * Showing (Mat-Snackbar) Notification
	 *
	 * @param message: string
	 * @param type: MessageType
	 * @param duration: number
	 * @param showCloseButton: boolean
	 * @param showUndoButton: boolean
	 * @param undoButtonDuration: number
	 * @param verticalPosition: 'top' | 'bottom' = 'top'
	 */
	showActionNotification(
		_message: string,
		_type: MessageType = MessageType.Create,
		_duration: number = 10000,
		_showCloseButton: boolean = true,
		_showUndoButton: boolean = true,
		_undoButtonDuration: number = 3000,
		_verticalPosition: 'top' | 'bottom' = 'bottom'
	) {
		const _data = {
			message: _message,
			snackBar: this.snackBar,
			showCloseButton: _showCloseButton,
			showUndoButton: _showUndoButton,
			undoButtonDuration: _undoButtonDuration,
			verticalPosition: _verticalPosition,
			type: _type,
			action: 'Undo'
		};
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: _duration,
			data: _data,
			verticalPosition: _verticalPosition
		});
	}

	showInfo(
		message: string,
	) {
		let type: MessageType = MessageType.Create,
			duration: number = 100000,
			showCloseButton: boolean = true,
			showUndoButton: boolean = false,
			undoButtonDuration: number = 3000,
			verticalPosition: 'top' | 'bottom' = 'top',
			mean: 0 | 1 = 1
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: duration,
			data: {
				message,
				snackBar: this.snackBar,
				showCloseButton: showCloseButton,
				showUndoButton: showUndoButton,
				undoButtonDuration,
				verticalPosition,
				type,
				action: 'Undo',
				meanMes: mean
			},
			verticalPosition: verticalPosition
		});
	}
	/**
	 * Showing Confirmation (Mat-Dialog) before Entity Removing
	 *
	 * @param title: stirng
	 * @param description: stirng
	 * @param waitDesciption: string
	 */
	deleteElement(title: string = '', description: string = '', waitDesciption: string = '') {
		return this.dialog.open(DeleteEntityDialogComponent, {
			data: { title, description, waitDesciption },
			width: '440px'
		});
	}

	/**
	 * Showing Fetching Window(Mat-Dialog)
	 *
	 * @param _data: any
	 */
	fetchElements(_data) {
		return this.dialog.open(FetchEntityDialogComponent, {
			data: _data,
			width: '400px'
		});
	}

	/**
	 * Showing Update Status for Entites Window
	 *
	 * @param title: string
	 * @param statuses: string[]
	 * @param messages: string[]
	 */
	updateStatusForEntities(title, statuses, messages) {
		return this.dialog.open(UpdateStatusDialogComponent, {
			data: { title, statuses, messages },
			width: '480px'
		});
	}
	showWaitingDiv() {
		let v_idWaiting: string = 'nemo-process-waiting-id';//id waiting
		let v_idWaitingLoader: string = 'nemo-process-waiting-loader';//id waiting
		let _show: string = 'nemo-show-wait';
		let _hide: string = 'nemo-hide-wait';
		let divWait = document.getElementById(v_idWaiting);
		let loader = document.getElementById(v_idWaitingLoader);

		if (divWait.classList.contains(_show)) {
			divWait.classList.remove(_show);
			divWait.classList.add(_hide);

			loader.classList.remove(_show);
			loader.classList.add(_hide);
		}
		else {
			if (divWait.classList.contains(_hide)) {
				divWait.classList.remove(_hide);
				divWait.classList.add(_show);

				loader.classList.remove(_hide);
				loader.classList.add(_show);
			}
			else {
				divWait.classList.remove(_show);
				divWait.classList.add(_hide);

				loader.classList.remove(_show);
				loader.classList.add(_hide);
			}
		}
	}

	OffWaitingDiv() {
		let v_idWaiting: string = 'nemo-process-waiting-id';//id waiting
		let v_idWaitingLoader: string = 'nemo-process-waiting-loader';//id waiting
		let _show: string = 'nemo-show-wait';
		let _hide: string = 'nemo-hide-wait';
		let divWait = document.getElementById(v_idWaiting);
		let loader = document.getElementById(v_idWaitingLoader);

		divWait.classList.remove(_show);
		divWait.classList.add(_hide);

		loader.classList.remove(_show);
		loader.classList.add(_hide);

	}
}
