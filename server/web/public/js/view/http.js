function requestAjax(method, formName, api, successCallbackOrUrl){
    
    var data = $('#' + formName).serialize();
    
    $.ajax({
        url: api,
        type: method,
        data: data,
        success: (result) => {
            if(successCallbackOrUrl)
            {
                if(typeof(successCallbackOrUrl) == "string")
                    window.location = successCallbackOrUrl;
                else
                    successCallbackOrUrl();
            }    
        }
    });
}

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

function putForm(formName, api, successCallbackOrUrl){

    var data = $('#' + formName).serialize();

    $.put(api, data)
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
