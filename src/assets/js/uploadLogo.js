export default class UploadLogo {
	constructor() {}

	previewFile(file, sceneLogo) {
		let reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onloadend = () => {
			sceneLogo.src = reader.result;
		};
	}
}
