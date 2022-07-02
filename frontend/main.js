function createUser(){
    const name = document.getElementById('name-signup').value;
    const email = document.getElementById('email-signup').value;
    const phno = document.getElementById('ph-signup').value;
    const password = document.getElementById('password-signup').value;
    const mobileValid=(phno[0]==9 || phno[0]==8 || phno[0]==7 || phno[0]==6);
    if(name.length===0 || email.length===0 || phno.length===0) return(document.getElementById('signup-error').innerText='*Please dont leave credentials blank');
    else if(phno.length!=10 || !mobileValid) return(document.getElementById('signup-error').innerText='*Please enter a valid phone number')
    else if(password.length<7 || !/\d/.test(password)) return(document.getElementById('signup-error').innerText='*Please enter a valid password with atleast 6 characters and includes numbers');
    console.log(1)
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
        location.href('http://localhost:3000/login.html');
    })
    .catch(err=>console.log(err));
    
}

function loginUser(){
    if(document.getElementById('email-login').value!='' && document.getElementById('password-login').value!=''){
        const email = document.getElementById('email-login').value;
        const password = document.getElementById('password-login').value;
        axios.post('http://localhost:3000/login',{email,password})
        .then(res=>{
            console.log(`token=${res.data}`)
            return localStorage.setItem('token',`${res.data}`);
            // axios.get('http://localhost:3000/loginpermit',{
            //     headers: {
            //       'Authorization': `Bearer ${localStorage.getItem('token')}` 
            //     }
            //   })
        })
        .then(res1=>{
            window.location.replace('http://localhost:3000/expense.html');
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

async function sendMail(){
    try{
        const email=document.getElementById('email-reset').value;
        const res=await axios.post('http://localhost:3000/password/forgotpassword',{email});
        alert(res.data);
}
    catch{
        console.error();
}
}
async function setPassword(){
    try{
        const email=document.getElementById('email-reset').value;
        const res=await axios.post('http://localhost:3000/password/forgotpassword',{email});
        alert(res.data);
}
    catch{
        console.error();
}
}