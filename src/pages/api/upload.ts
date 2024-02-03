import type { APIRoute } from "astro"
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary"

cloudinary.config({
	cloud_name: "dzkvtynuw",
	api_key: "195751847545627",
	api_secret: import.meta.env.CLOUDINARY_SECRET,
})

const uploadStream = (
	buffer: Uint8Array,
	options: { folder: string }
): Promise<UploadApiResponse> => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader
			.upload_stream(options, (error, result) => {
				if (result) return resolve(result)

				return reject(error)
			})
			.end(buffer)
	})
}

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData()
	const file = formData.get("file") as File
	if (!file)
		return new Response(
			JSON.stringify({
				message: "No file found",
			})
		)
	const arrBuffer = new Uint8Array(await file.arrayBuffer())
	const result = await uploadStream(arrBuffer, {
		folder: "pdf",
	})

	const { asset_id: id, secure_url: url, pages } = result

	await new Promise((resolve: any) => setTimeout(resolve, 1000))

	return new Response(
		JSON.stringify({
			id,
			url,
			pages,
		})
	)
}
