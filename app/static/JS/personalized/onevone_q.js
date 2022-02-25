setInterval(function () {
    var x=document.getElementById('right-image').clientWidth/2;
    var y =document.getElementById('right-list').clientWidth;
    var z= String(y-x)
    var all= z+'px'
    document.getElementById('right-image-container').style.right= all;

    var x=document.getElementById('left-image').clientWidth/2;
    var y =document.getElementById('left-list').clientWidth;
    var z= String(y-x)
    var all= z+'px'
    document.getElementById('left-image-container').style.left= all;

}, 50); 
