$(function() {

    $('#saveForm').click(function() {
        submit();
        return false;
    });
});

function submit(){

    postForm('form', '/api/v1/user', successPost)
}

function successPost(){
    
    window.location = '/admin/user/list';
}

$( document ).ajaxError(function(event, request, settings) {
  
  if(request.status == 500 && request.responseJSON && request.responseJSON.error)
    toastr.error(request.responseJSON.error);
});

