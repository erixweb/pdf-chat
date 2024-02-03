import { writable } from "svelte/store"

export enum APP_STATUS {
	INIT,
	LOADING,
	ERROR,
	CHAT_MODE,
}
export type APP_INFO = {
	id: string,
	url: string,
	pages: number
}

export const appStatus = writable<APP_STATUS>(APP_STATUS.INIT)
export const appInfo = writable<APP_INFO>({ id: "", url: "", pages: 0 })
