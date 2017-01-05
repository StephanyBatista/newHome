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


