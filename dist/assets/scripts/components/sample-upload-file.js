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
	autoQueue: false,
	previewsContainer: '#previews',
	clickable: '.js-fileinput-btn'
});

// TODO 2: Button Functionality
cpDropzone.on('addedfile', function(file) {
	file.previewElement.querySelector('.start').onclick = function() {
		cpDropzone.enqueueFile(file);
	};

	file.previewElement.querySelector('.cancel').onclick = function() {
		cpDropzone.removeFile(file);
		//console.log(cpDropzone.getFilesWithStatus(Dropzone.ADDED).length);

		if (cpDropzone.getFilesWithStatus(Dropzone.ADDED).length < 1) {
			document.querySelector('.js-drop-btn').style.display = 'none';
			document.querySelector('.js-process-btn').style.display = 'none';
		}
	};

	document.querySelector('.js-drop-btn').style.display = 'inline-block';
	document.querySelector('.js-process-btn').style.display = 'inline-block';

	// Reload Feather icons
	feather.replace();
});

cpDropzone.on('complete', function(file) {
	file.previewElement.querySelector('.start').style.display = 'none';
	file.previewElement.querySelector('.cancel').style.display = 'none';
	file.previewElement.querySelector('.progress').style.opacity = '0';
	file.previewElement.querySelector('.delete').style.display = 'block';
	file.previewElement.querySelector('.delete').onclick = function() {
		var r = confirm('Are You Sure for your action?');
		if (r == true) {
			var y = confirm('Ciyus Ga boong?');
			if (y == true) {
				var z = confirm('Brian Siliiiit!!! Bener ya?');
				if (z == true) {
					cpDropzone.removeFile(file);
				}
			}
		}
	};
});

document.querySelector('.js-process-btn').onclick = function() {
	cpDropzone.enqueueFiles(cpDropzone.getFilesWithStatus(Dropzone.ADDED));
};

document.querySelector('.js-drop-btn').onclick = function() {
	var r = confirm('Yakin nih diapus aja semua?');
	if (r == true) {
		var y = confirm('Bukan PHP?');
		if (y == true) {
			var z = confirm('Setuju kalau Brian Son of Hades?');
			if (z == true) {
				cpDropzone.removeAllFiles(true);
				document.querySelector('.js-drop-btn').style.display = 'none';
				document.querySelector('.js-process-btn').style.display = 'none';
			}
		}
	}
};

// Now fake the file upload, since GitHub does not handle file uploads
// and returns a 404

var minSteps = 6,
	maxSteps = 60,
	timeBetweenSteps = 100,
	bytesPerStep = 100000;

cpDropzone.uploadFiles = function(files) {
	var self = this;

	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		totalSteps = Math.round(
			Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep))
		);

		for (var step = 0; step < totalSteps; step++) {
			var duration = timeBetweenSteps * (step + 1);
			setTimeout(
				(function(file, totalSteps, step) {
					return function() {
						file.upload = {
							progress: (100 * (step + 1)) / totalSteps,
							total: file.size,
							bytesSent: ((step + 1) * file.size) / totalSteps
						};

						self.emit(
							'uploadprogress',
							file,
							file.upload.progress,
							file.upload.bytesSent
						);
						if (file.upload.progress == 100) {
							file.status = Dropzone.SUCCESS;
							self.emit('success', file, 'success', null);
							self.emit('complete', file);
							self.processQueue();
						}
					};
				})(file, totalSteps, step),
				duration
			);
		}
	}
};
