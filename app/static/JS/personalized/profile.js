$(document).ready(function () {
    $('#MyFlashCardsContainer').click(function () {
        if($('#full_user_details').css('height')==='0px'){}
        else{
            $('#MyFlashCards').animate({ opacity: '1' })
            $('#MyFlashCardOver').fadeOut(function () {
                $('#MyFlashCardDetails').animate({ height: '100%' }, function () {
                    $('#full_user_details').animate({ height: '0' })
                    $('#full-navbar').animate({ height: '6.8vh' })
                    $('#main-content').animate({ height: '93.2vh' })
                    $('#initialate_page').animate({ height: '4rem' })
                })
                $('#MyFlashCardDetails').fadeIn()
            })
            $(this).animate({ width: '100%' })
        }
    })

    $('#initialate_page').click(function () {
        $('#full_user_details').animate({ height: '70%' })
        $('#full-navbar').animate({ height: '16vh' })
        $('#main-content').animate({ height: '84vh' })
        $('#initialate_page').animate({ height: '0' })
        $('#MyFlashCardDetails').fadeOut(function () {
            $('#MyFlashCardDetails').css('height', '0')
            $('#MyFlashCardOver').fadeIn()
            $('#MyFlashCardsContainer').animate({ width: '50%' })
        })
        $('#MyFlashCards').css('opacity', '')
    })

    $('#to_myquizzDesc').mouseup(function(){
        $('#MyFlashCardsContainer').animate({width:'0', padding:'0'})
        $('#to_myquizzes').animate({ opacity: '1' })
        $('#to_myquizzDesc').fadeOut(function () {
                $('#full_user_details').animate({ height: '0' })
                $('#full-navbar').animate({ height: '6.8vh' })
                $('#main-content').animate({ height: '93.2vh' })
            $('#to_myquizzContent').fadeIn()
        })
        $('#to_myquizzesContainer').animate({ width: '100%' })
    })

    $('#to_myqizzBack').mouseup(function(){
        $('#MyFlashCardsContainer').animate({width:'50%', padding:'1vh 1vw'})
        $('#to_myquizzes').css('opacity',' ')
        $('#to_myquizzContent').fadeOut(function () {
                $('#full_user_details').animate({ height: '70%' })
                $('#full-navbar').animate({ height: '16vh' })
                $('#main-content').animate({ height: '84vh' })
                $('#to_myquizzDesc').fadeIn()
        })
        $('#to_myquizzesContainer').animate({ width: '50%' })
    }) 
})