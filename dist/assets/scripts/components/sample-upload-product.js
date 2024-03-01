// TODO 1: Get Template HTML and remove it from document
var previewNode = document.querySelector('#template');
previewNode.id = '';

var previewTemplate = previewNode.parentNode.innerHTML;
previewNode.parentNode.removeChild(previewNode);

var dropzoneTarget = document.getElementById('dropArea');

var cpDropzone = new Dropzone(dropzoneTarget, {
	url: 'http://cyberprimatama.co.id', // please change to image processing php or backend handling
	previewTemplate: previewTemplate,
	thumbnailHeight: 80,
	thumbnailWidth: 80,
	parallelUploads: 20,
	autoQueue: true,
	previewsContainer: '#previews',
	clickable: '.js-fileinput-btn',
	maxFiles: 5
});

cpDropzone.on('complete', function(file) {
	file.previewElement.querySelector('.delete').style.display = 'block';
	file.previewElement.querySelector('.delete').onclick = function() {
		var r = confirm('Are You Sure for your action?');
		if (r == true) {
			cpDropzone.removeFile(file);
		}
	};

	// Reload Feather icons
	feather.replace();
});

cpDropzone.on('maxfilesexceeded', function(file) {
	alert('Max Files Limit has reached!!');
	cpDropzone.removeFile(file);
});

// Now fake the file upload, since GitHub does not handle file uploads
// and returns a 404

// var minSteps = 6,
// 	maxSteps = 60,
// 	timeBetweenSteps = 100,
// 	bytesPerStep = 100000;

// cpDropzone.uploadFiles = function(files) {
// 	var self = this;

// 	for (var i = 0; i < files.length; i++) {
// 		var file = files[i];
// 		totalSteps = Math.round(
// 			Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep))
// 		);

// 		for (var step = 0; step < totalSteps; step++) {
// 			var duration = timeBetweenSteps * (step + 1);
// 			setTimeout(
// 				(function(file, totalSteps, step) {
// 					return function() {
// 						file.upload = {
// 							progress: (100 * (step + 1)) / totalSteps,
// 							total: file.size,
// 							bytesSent: ((step + 1) * file.size) / totalSteps
// 						};

// 						self.emit(
// 							'uploadprogress',
// 							file,
// 							file.upload.progress,
// 							file.upload.bytesSent
// 						);
// 						if (file.upload.progress == 100) {
// 							file.status = Dropzone.SUCCESS;
// 							self.emit('success', file, 'success', null);
// 							self.emit('complete', file);
// 							self.processQueue();
// 						}
// 					};
// 				})(file, totalSteps, step),
// 				duration
// 			);
// 		}
// 	}
// };
