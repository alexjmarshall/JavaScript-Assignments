//Event Listener for clicking a thumbnail image
document.querySelector('.thumbnails').addEventListener('click', function (evt) {    
    //copy the thumbnail image information to the fullsize image
    document.querySelector('.editor > img').src = evt.target.src.split('_thumb.png').join('.png'); 
    document.querySelector('.editor > img').title = evt.target.title;
    document.querySelector('.editor > img').alt = evt.target.alt;
    //update the title on the page
    document.querySelector('.editor > .title').innerHTML = evt.target.title;
    //copy the data tags of the thumbnail image to the tags on the page
    document.querySelector('.editor > .tags').innerHTML = evt.target.dataset.tags;    
    evt.preventDefault();
});

//Event Listener for submitting tags
document.querySelector('.editor > form ').addEventListener( 'submit', function (evt) {
    var input = evt.target.elements.tag;
    var errorMessage = document.querySelector('.error');
    //validate that tag is not empty and does not contain spaces
    if (input.value.trim() != '' && !input.value.includes(' ')) {
        document.querySelector('.editor > .tags').innerHTML += '#' + input.value + ' ';
        //also add the tags to the thumbnail image
        var thumbnailList = document.querySelectorAll('.thumbnails > li');
        for (var i = 0; i < thumbnailList.length; i++) {
            //if the thumbnail image has the same title as the full size image, add the tags
            if (thumbnailList[i].querySelector('img').title == document.querySelector('.editor > img').title) {
                thumbnailList[i].querySelector('img').dataset.tags = document.querySelector('.editor > .tags').innerHTML;
            }
        }
        //reset the form and hide the error message
        errorMessage.classList.add('hidden');   
        input.value = ''; 
    } else if (input.value.includes(' ')){
        //display the error message for a tag that includes spaces
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = "Tags cannot contain spaces.";
        input.value = '';
    } else {
        //display the error message for an empty tag
        errorMessage.classList.remove('hidden');
        errorMessage.innerHTML = "Tags cannot be empty.";            
    }
    evt.preventDefault();
});