function createUser(){
    const name = document.getElementById('name-signup').value;
    const email = document.getElementById('email-signup').value;
    const phno = document.getElementById('ph-signup').value;
    const password = document.getElementById('password-signup').value;
    axios.post('http://localhost:3000/createuser',{
        name:`${name}`
        ,email:`${email}`
        ,phno:`${phno}`,
        password:`${password}`
    })
    .then(res=>alert(res.data))
    .then(res=>{
        document.getElementById('name-signup').value='';
        document.getElementById('email-signup').value='';
        document.getElementById('ph-signup').value='';
        document.getElementById('password-signup').value='';
    })
    .catch(err=>console.log(err));
    
}

function loginUser(){
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;
    axios.post('http://localhost:3000/login',{email,password})
    .then(res=>{
        if(res.data.success){
            alert('Login Successfull');
        }else{
            alert('Login Failed');
        }
    });


}