function changeGame(){
    $('#actual-setting').fadeOut()
    $('#showGameQ').fadeOut()
    $('#settings-selection').animate({ width: '75%' })
    $('#main-space').animate({ width: '25%' }, function(){
        $("#toUp").delay(100).animate({ height: '100%' }, function () {
            $("#validate-settings").fadeIn()
            $("#showState").css('background-color', '#d5e4e6')
            })
        })
    }

function start_game() {
    
    $(this).css('opacity', '1')
    $("#validate-settings").fadeOut()
    $("#showState").css('background-color', '#f5f9f9')
    $("#toUp").animate({ height: '0' }, function () {
        $('#settings-selection').animate({ width: '16.66%' })
        $('#main-space').animate({ width: '83.33%' }, function () {
            $('#actual-setting').fadeIn()
            $('#showGameQ').fadeIn()
        })
    })

    var filter = {
        year: $('#year').val(),
        unit: $('#unit').val(),
        module: $('#module').val(),
        q_num: $('#q_num').val(),
        t: $('#t').val()
    }

    var allq = new Array()
    qDisplay = ""

    fetch('/challenge/offline', {
        method: 'POST',
        body: JSON.stringify(filter),
        credentials: "include",
        headers: {
            'content-type': 'application/json'
        }
    }).then(function (responce) {
        responce.json().then(function (data) {
            var allq = data
            for (i = 0; i < allq.length; i++) {
                var prop_content = ''
                var r_prop_content = ''
                var refferer= 'r_answers'+String(i)
                
                var prop = allq[i].proposition.split('ks_sp')
                var r_prop = window.atob(allq[i].r_prop).split('ks_sp')
                
                for (j = 0; j < prop.length; ++j) {
                    var pforq = "pforq"+String(i)
                    prop_content = prop_content
                        + "<li class='"+pforq+" proposition stander-margin stander-padding no-edges'>" + window.atob(prop[j]) + "</li>"
                }
                for (k = 0; k < r_prop.length; ++k) {
                    r_prop_content = r_prop_content
                        + "<div id='"+refferer+"' class='' style=' opacity: 0; float:right; top:0; right:4rem;'>" + r_prop[k] + "</div>"
                }
                if (i === (Number(allq.length) - 1)) {
                    qDisplay = qDisplay + "<div class='col-12 full-height' style='float: left;'>"
                        + "<div class='flex flex-centerize col-12' style='font-size:larger; font-weight:600; height: 20%;'>"
                        + allq[i].question
                        + "</div>"
                        + "<div class='col-12 flex flex-centerize' style='height: 60%;'>"
                        + "<div class='col-6 flex flex-centerize'>"
                        + "<ol style='list-style: upper-alpha; list-style-position:inside; max-width:100%; height:100%; overflow:scroll;'>"
                        + prop_content
                        + "<br/>"
                        + r_prop_content
                        + "</ol>"
                        + "</div>"
                        + "</div>"
                        + "<div class='col-12 flex flex-centerize' style=' height: 20%;'>"
                        + "<div class='col-12' style='position: relative;'>"
                        + "<button id='"+"valid"+String(i)+"' onclick='checkIfRight(refferer="+refferer+", bName="+"valid"+String(i)+")' class='writing-padding no-edges'"
                        + "style='float: right; margin-right: 4rem;'> Validate"
                        + "</button>"
                        + "</div>"
                        + "</div>"
                        + "</div>";
                }
                else {
                    qDisplay = qDisplay + "<div class='col-12 full-height' style='float: left;'>"
                        + "<div class='flex flex-centerize col-12' style='font-size:larger; font-weight:600; height: 20%;'>"
                        + allq[i].question
                        + "</div>"
                        + "<div class='col-12 flex flex-centerize' style='height: 60%;'>"
                        + "<div class='col-6 flex flex-centerize'>"
                        + "<ol style='list-style: upper-alpha; list-style-position:inside; max-width:100%; height:100%; overflow:scroll;'>"
                        + prop_content
                        + "<br/>"
                        + r_prop_content
                        + "</ol>"
                        + "</div>"
                        + "</div>"
                        + "<div class='col-12 flex flex-centerize' style=' height: 20%;'>"
                        + "<div class='col-12'>"
                        + "<button onclick="+"next_q(toreset='"+pforq+"')"+" class='writing-padding no-edges'"
                        + "style='float: right; margin-right: 4rem;'> Next"
                        + "</button>"
                        + "<button id='"+"valid"+String(i)+"' onclick='checkIfRight(refferer="+refferer+", bName="+"valid"+String(i)+")' class='writing-padding no-edges'"
                        + "style='float: right; margin-right: 4rem;'> Validate"
                        + "</button>"
                        + "</div>"
                        + "</div>"
                        + "</div>";
                }
            }
            if (qDisplay==''){
                document.getElementById('questions_drawable_container').innerHTML =""
                +"<div class='col-12 full-height flex flex-centerize'>"
                +"no questions available yet for this filter"
                +"</div>"
            }
            else{
                document.getElementById('questions_drawable_container').innerHTML = qDisplay;
            }

            $('.proposition').mouseup(function(){
                if ($(this).attr('style')){
                    $(this).attr('style','')
                    $(this).removeClass('userChoice')
                } 
                else{
                    $(this).attr('style','background-color:orange')
                    $(this).addClass('userChoice')
                }
            })
        })
    })
}


function next_q(toreset) {
    var x = '.'+toreset
    $(x).removeClass('userChoice')

    left = Number(document.getElementById('questions_drawable_container').style.left.split('p')[0])

    container_width = document.getElementById('questions_fix_container').clientWidth
    to_left = left - container_width

    y = String(to_left) + 'px'
    $('#questions_drawable_container').animate({ left: y })
}

