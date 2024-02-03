<script>
	import { appInfo } from "../store"

	const { id, url, pages } = $appInfo
	const maxPages = Math.min(pages, 4)

	const images = Array.from({ length: maxPages }, (_, i) => {
		return url
			.replace("/upload/", `/upload/w_400,h_500,c_fill,pg_${i + 1}/`)
			.replace(".pdf", ".jpg")
	})
</script>

<div class="grid grid-cols-4 gap-2">
	{#each images as image}
		<img src={image} alt="PDF Image" />
	{/each}
</div>
