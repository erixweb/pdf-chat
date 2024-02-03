<script lang="ts">
	import Dropzone from "svelte-file-dropzone"
	import { APP_STATUS, appInfo, appStatus } from "../store"

	let files: any = {
		accepted: [],
		rejected: [],
	}

	async function handleFilesSelect(e: any) {
		const { acceptedFiles, fileRejections } = e.detail
		files.accepted = [...files.accepted, ...acceptedFiles]
		files.rejected = [...files.rejected, ...fileRejections]

		if (acceptedFiles.length > 0) {
			appStatus.set(APP_STATUS.LOADING)
			const formData = new FormData()

			formData.append("file", acceptedFiles[0])

			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			})
			if (!res.ok) {
				appStatus.set(APP_STATUS.ERROR)
				return
			}
			// @ts-ignore
			const result = await res.json()
			appInfo.set({ id: result.id, url: result.url, pages: result.pages })
			appStatus.set(APP_STATUS.CHAT_MODE)
		}
	}
</script>

{#if files.accepted.length === 0}
	<Dropzone accept="application/pdf" on:drop={handleFilesSelect} />
{/if}
