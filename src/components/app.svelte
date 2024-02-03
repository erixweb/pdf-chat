<script>
	import { Alert } from "flowbite-svelte"
	import { appStatus, APP_STATUS } from "../store"
	import StepChat from "./step-chat.svelte"
	import StepLoad from "./step-load.svelte"
	import StepUpload from "./step-upload.svelte"
</script>

<main class="flex w-full max-w-[750px] min-h-screen justify-center items-center">
	<div class="px-[16px] w-full">
		<h1 class="text-[45px] font-bold text-center py-[25px]">PDF Chat</h1>
		<section class="w-full text-center">
			{#if $appStatus === APP_STATUS.INIT}
				<StepUpload />
			{:else if $appStatus === APP_STATUS.ERROR}
				<Alert color="yellow">
					<span class="font-medium">Ha ocurrido un error en la aplicación!</span>
				</Alert>
			{:else if $appStatus === APP_STATUS.LOADING}
				<StepLoad />
			{:else if $appStatus === APP_STATUS.CHAT_MODE}
				<StepChat />
			{/if}
		</section>
	</div>
</main>
