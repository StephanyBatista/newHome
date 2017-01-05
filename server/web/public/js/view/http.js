function postForm(formName, api, successCallbackOrUrl){

    var data = $('#' + formName).serialize();

    $.post(api, data)
            .success((result) => {
                if(successCallbackOrUrl)
                {
                    if(successCallbackOrUrl instanceof String)
                        window.location = successCallbackOrUrl;
                    else
                        successCallbackOrUrl();
                }    
            });
}
