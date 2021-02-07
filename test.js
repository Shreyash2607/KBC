function changeButtonColor()
{
    
}
function call(){
alert("According to Dr Khetmalis the correct answer would be <%= ans %>");
}
function half(){
if ("<%= ans %>" =='a')
{
   $('.c').prop('disabled', true);
   $('.d').prop('disabled', true);
}
else if ("<%= ans %>"=='b')
{
   $('.a').prop('disabled', true);
   $('.d').prop('disabled', true);
}
else if ("<%= ans %>"=='c')
{
   $('.a').prop('disabled', true);
   $('.b').prop('disabled', true);
}
else if ("<%= ans %>"=='d')
{
   $('.b').prop('disabled', true);
   $('.c').prop('disabled', true);
}
}    