const txtArea= document.querySelector('.tinymce')

tinymce.init({
    language:"pt_BR",
    selector:"#article",
    plugins:[
        'advlist', 'autolink', 'link', 'image' ,'lists' ,'print' ,'preview' ,'hr', 'searchreplace' ,'wordcount' ,'fullscreen' ,'insertdatetime' ,'media' ,'save', 'table' ,'paste', 'emoticons'
    ],

})

