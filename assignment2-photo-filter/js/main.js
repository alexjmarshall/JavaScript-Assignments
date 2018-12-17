//document.addEventListener('"DOMContentLoaded"', function (event){
	let thumbnails = document.querySelectorAll('.thumb-display');

	document.querySelector('.frm-control').addEventListener('input', function (evt) {
		if(evt.target.value){
			document.querySelector('.reset').classList.remove('hidden');
		}else{
			document.querySelector('.reset').classList.add('hidden');
		}
		let searchString = evt.target.value;
			for(i = 0; i < thumbnails.length; i++){
				if(!thumbnails[i].querySelector('.tags').innerHTML.includes(searchString)){
					thumbnails[i].classList.add('hidden');
				}
				else{
					thumbnails[i].classList.remove('hidden');
				}
			}
		evt.preventDefault();
	});

	document.querySelector('.reset').addEventListener('click', function (evt) {   
		for(i = 0; i < thumbnails.length; i++){
			if(thumbnails[i].classList.contains('hidden')){
				thumbnails[i].classList.remove('hidden');
			}
		}
			document.querySelector('.frm-control').value = '';
			document.querySelector('.reset').classList.add('hidden');
		evt.preventDefault();
	});
//})

