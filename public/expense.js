const table=document.getElementById('leaderboard');
var page=1;
var pageLast=1;
var expenses=[];

window.addEventListener('DOMContentLoaded',async ()=>{
    if(!localStorage.getItem('EPP')) localStorage.setItem('EPP',10);
    else document.getElementById('EPP').value=localStorage.getItem('EPP');
    const res=await axios.get('http://localhost:3000/addexpense',{
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
                }})
    expenses=res.data;
    showExpenseOnScreen();
});

function changeEPP(){
    EPP=document.getElementById('EPP').value;
    console.log(EPP);
    localStorage.setItem('EPP',EPP);
    showExpenseOnScreen();
}

function postVerification(x){
    if(x.data.success){
        location.reload();
    }else{
        alert(x.data.message);
    }
}
async function showPremiumFeatures(){
    const features=await axios.get('http://localhost:3000/getpremium',{
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` }});
    console.log(features.data);
    if(features.data.length===0) return;
    document.getElementById('addexpense').style.backgroundColor=features.data.backgroundColor
    document.getElementById('premium-pay').style.display="none";
    document.getElementById('leaderboard').style.display="block";
    const users=features.data.users
    const usersort=users.sort((a,b)=>{
        return((b.totalexp)-(a.totalexp))
    });
    console.log(users);
    const tbody=document.getElementById('userslist');
    tbody.innerHTML=``;

    for(x of usersort){
        const tr=document.createElement('tr');
        tr.id=`${x.id}`;
        const tdname=document.createElement('td');
        const tdexp=document.createElement('td');
        tdname.innerText=`${x.name}`;
        tdexp.innerText=`${x.totalexp}`;
        tr.appendChild(tdname);
        tr.appendChild(tdexp);
        tbody.appendChild(tr);
    }
    tbody.onclick=async ()=>{
        const target=event.target.parentNode.id;
        console.log(target);
        if(!Number.isInteger(parseInt(target))) return;
        const exp=await axios.post('http://localhost:3000/getpremiumexpense',{id:target},{
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }})
        expenses=exp.data.expenses;
        showExpenseOnScreen();
    }
    console.log(document.getElementById('premium-feature-buttons'))
    const timelyreport=document.getElementById('premium-feature-buttons');
    timelyreport.style.display="block";
    timelyreport.onclick=async ()=>{
        const target=(event.target.id);
        axios.post('http://localhost:3000/getpremiumreport',{time:target},{
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }})
    };
    
}

function addExpense(){
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    axios.post('http://localhost:3000/addexpense',{
        amount:amount,
        description:description,
        category:category
    },
    {
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
}}).then(res=>{
    document.getElementById('amount').value='';
    document.getElementById('description').value='';
    // console.log(res.data);
    expenses.push(res.data);
    showExpenseOnScreen();
})
}
async function showExpenseOnScreen(){
    const expensePerPage=localStorage.getItem('EPP');
    document.getElementById('pageno').innerText=`${page}`;
    pageLast=Math.ceil(expenses.length/expensePerPage);
    showPremiumExpenseOnScreen(expenses.slice((page-1)*expensePerPage,page*expensePerPage));
}

async function showPremiumExpenseOnScreen(res1){
    showPremiumFeatures();
    // console.log(res1);
    const div=document.getElementById('expense-container');
    div.innerHTML='<h1>Past Expenditure</h1>';
    for(x of res1){
        const li=document.createElement('li');
        li.innerText=`${x.amount}---${x.description}---${x.category}`
        div.appendChild(li);
    }
    const li=document.createElement('li');
    console.log(res1);
    li.innerText=`TOTAL:${res1[res1.length-1].total}`
    console.log(li);
    div.appendChild(li);
    console.log(4)

}

var options = {
	"key": "rzp_test_0kDo7gsnQPiQjX",
	"amount": "100",
	"currency": "INR",
	"name": "Ashish Academy",
	"description": "Upgrade the features of this app and enjoy this app even more!!!",
		"image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
	"order_id": "order_HdPuQW0s9hY9AU",
	"handler": async function (response){
        const order_id=response.razorpay_order_id;
        const payment_id=response.razorpay_payment_id;
        const razorpay_signature=response.razorpay_signature;
		console.log(response)
		alert("This step of Payment Succeeded");
        const verification=await axios.post('http://localhost:3000/verifyorder',
        {order_id,payment_id},{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'x-razorpay-signature': razorpay_signature}
        })
        postVerification(verification);
	},
	"prefill": {
		//Here we are prefilling random contact
		"contact":"7892932527",
		//name and email id, so while checkout
		"name": "Ashish KAbade",
		"email": "akabade05@gmail.com" 
	},
	"notes" : {
		"description":"Best Course for SDE placements",
		"language":"Available in 4 major Languages JAVA,C/C++, Python, Javascript",
		"access":"This course have Lifetime Access"
	},
	"theme": {
		"color": "#2300a3"
	}
};

async function paymentgateway(){
    console.log('started')
    const order=await axios.post('http://localhost:3000/createorder',{
        "amount":"100",
        "currency":"INR",
        "receipt":"ashishisgreatest983265741",
        "notes":{
            "description":"Upgrade the features of this app and enjoy this app even more!!!",
            "access":"Lifetime"
        }},{
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });
    // console.log(order);
    options.order_id=order.data.id;
    options.notes=order.data.notes;
    options.amount=order.data.amount;
    console.log(order)
    let razorpayObject = new Razorpay(options);
	await razorpayObject.open();
    razorpayObject.on('payment.failed', function (response){
		console.log(response);
		alert("This step of Payment Failed");
});

}
async function downloadExp(){
    try{
        const urlResponse=await axios.get('http://localhost:3000/download',{
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }
                });
        if(urlResponse.response.status===404) return paymentgateway();
        console.log(urlResponse)
        window.open(urlResponse.data.fileURL.location);
        }
    catch(error){
        if(error.response.status===404) return paymentgateway();
        console.log(error);
    }
}
async function pagination(){
    const target=event.target.id;
    console.log(target,event.target,event);
    switch(target){
        case 'first':
            page=1;
            showExpenseOnScreen();
            break;
        case 'prev':
            page=(page>1)?page-1:page
            showExpenseOnScreen();
            break;
        case 'next':
            page=(page<(pageLast))?page+1:page
            showExpenseOnScreen();
            break;
        case 'last':
            page=pageLast;
            showExpenseOnScreen();
            break;
        default:
            break;
    }
}
async function deleteExpense(){

}