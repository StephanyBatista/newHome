$( document ).ajaxError(function(event, request, settings) {
  
  if(request.status == 500 && request.responseJSON && request.responseJSON.error)
    toastr.error(request.responseJSON.error);
});