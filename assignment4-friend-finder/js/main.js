document.addEventListener('DOMContentLoaded', function(){
    let friendsList;
    let xhr = new XMLHttpRequest();
    let preventRender = document.querySelector('.content');

    function renderFriendListView(friendsList){
        preventRender.innerHTML='';
        let contentDiv = document.createElement('div');
        contentDiv.setAttribute('class','pure-menu custom-restricted-width');
        let spanFriends = document.createElement('span');
        spanFriends.setAttribute('class','pure-menu-heading');
        spanFriends.innerHTML = 'Friends';
        let ulFriendMenu = document.createElement('ul');
        ulFriendMenu.setAttribute('class','pure-menu-list');
        let liFriendList = 'placeholder';
        friendsList.forEach(function (fListInfo){
            liFriendList += '<li class="pure-menu-item"><a href="#" class="pure-menu-link" data-id="' + fListInfo.id + '">' 
            + fListInfo.firstName + ' ' + fListInfo.lastName + '</a></li>';
        });
        ulFriendMenu.innerHTML = liFriendList;
        ulFriendMenu.removeChild(ulFriendMenu.firstChild);
        contentDiv.appendChild(spanFriends);
        contentDiv.appendChild(ulFriendMenu);
        document.querySelector('.content').appendChild(contentDiv);
    };

    xhr.addEventListener('load',function(e){
        if(xhr.status == 200) {
            friendsList = JSON.parse(xhr.responseText);
            console.log(friendsList);		
            renderFriendListView(friendsList);
        } else {
            console.error('Failed to load data: ' + xhr.status);
        }

    });

    document.querySelector('.friends').addEventListener('click',function(e){
        xhr.open('GET','friends/friends.json', true);
        xhr.send();
        e.preventDefault();	
    });

    let xhrP2 = new XMLHttpRequest();

    function renderFriendInfoView(friendInfo){
        let divFriend = document.createElement('div');
        divFriend.setAttribute('class','friend');
        let contentDiv = document.createElement('div');
        contentDiv.setAttribute('class','identity');
        let contentP = document.createElement('p');
        contentP.setAttribute('class','bio');
        contentP.innerHTML = friendInfo.bio;
        let imgFriend = document.createElement('img');
        imgFriend.setAttribute('src','img/'+friendInfo.avatar);
        imgFriend.setAttribute('class','photo');
        let h2Friend = document.createElement('h2');
        h2Friend.setAttribute('class','name');
        let ulFriend = document.createElement('ul');
        let liSpan1 = document.createElement('span');
        liSpan1.setAttribute('class','label');
        liSpan1.innerHTML = 'email: ';
        let liSpan2 = document.createElement('span');
        liSpan2.setAttribute('class','label');
        liSpan2.innerHTML = 'hometown: ';
        let liEmail = document.createElement('li');
        liEmail.appendChild(liSpan1);
        liEmail.innerHTML += friendInfo.email;
        let liHomeTown = document.createElement('li');
        liHomeTown.appendChild(liSpan2);
        liHomeTown.innerHTML += friendInfo.hometown;
        ulFriend.appendChild(liEmail);
        ulFriend.appendChild(liHomeTown);
        contentDiv.appendChild(imgFriend);
        contentDiv.appendChild(h2Friend);
        contentDiv.appendChild(ulFriend);
        divFriend.appendChild(contentDiv);
        divFriend.appendChild(contentP);
        document.querySelector('.content').appendChild(divFriend);
    };

    xhrP2.addEventListener('load',function(e){
        if(xhr.status == 200) {
            friendsInfo = JSON.parse(xhrP2.responseText);
            console.log(friendsInfo);
            preventRender.removeChild(preventRender.firstChild);
            renderFriendInfoView(friendsInfo);		
        } else {
            console.error('Failed to load data: ' + xhr.status);
        }
    });

    document.querySelector('.content').addEventListener('click',function(e){
        if (e.target.classList.contains('pure-menu-link')) {
            let friendId = e.target.getAttribute('data-id');
            console.log(friendId);
            xhrP2.open('GET','friends/'+ friendId + '.json', true);
            xhrP2.send();
            e.preventDefault();	
        }
    });

    document.querySelector('.home').addEventListener('click',function(){	
        location.reload();	
    });
})