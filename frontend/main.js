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
    if(document.getElementById('email-login').value!='' && document.getElementById('password-login').value!=''){
        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;
        axios.post('http://localhost:3000/login',{email,password})
        .then(res=>{
            console.log(res)
        })
        .then(res1=>{
            document.getElementById('email-login').value='';
            document.getElementById('password-login').value='';
        })
        .catch(err=>{
            if(err.response.status==401) document.getElementById('login-error').innerText='*Incorrect Password';
            else if (err.response.status==404) document.getElementById('login-error').innerText='*Email Not Found';
            else alert('Something went wrong,Please try again')
            // console.log(err);
        });    
    }else{
        document.getElementById('login-error').innerText='*Please dont leave credentials blank';
    }
}