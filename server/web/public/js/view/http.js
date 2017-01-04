function postForm(formName, api, callbackSucess, calbackFail){

    var data = $('#' + formName).serialize();

    $.post(api, data)
            .success((result) => {
                if(callbackSucess)
                    callbackSucess();
            });
}
