
window.addEventListener('DOMContentLoaded',showExpenseOnScreen())
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
    showExpenseOnScreen();
})
}
function showExpenseOnScreen(){
    axios.get('http://localhost:3000/addexpense',{
        headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}` 
}}).then(res=>{
    console.log(res)
    const div=document.getElementById('expense-container');
    for(x of res.data){
        const li=document.createElement('li');
        li.innerText=`${x.amount}---${x.description}---${x.category}`
        div.appendChild(li);
    }
    console.log(4)
})
}
var options = {
	"key": "rzp_live_rqrUBPoBHN0Jlp",
	"amount": "100",
	"currency": "INR",
	"name": "Ashish Academy",
	"description": "Upgrade the features of this app and enjoy this app even more!!!",
		"image": "https://media.geeksforgeeks.org/wp-content/uploads/20210806114908/dummy-200x200.png",
	"order_id": "order_HdPuQW0s9hY9AU",
	"handler": async function (response){
        const razorpay_order_id=response.razorpay_order_id;
        const razorpay_payment_id=response.razorpay_payment_id;
        const razorpay_signature=response.razorpay_signature;
		console.log(response)
		alert("This step of Payment Succeeded");
        const verification=await axios.post('http://localhost:3000/createorder',
        {razorpay_order_id,razorpay_payment_id},{
            headers: {
                'x-razorpay-signature': razorpay_signature}
        })
        console.log(verification)
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

// console.log(razorpayObject);
async function paymentgateway(e){
    console.log('started')
    const order=await axios.post('http://localhost:3000/createorder',{
        "amount":"100",
        "currency":"INR",
        "receipt":"ashishisgreatest983265741",
        "notes":{
            "description":"Upgrade the features of this app and enjoy this app even more!!!",
            "access":"Lifetime"
        }
    });
    console.log(order);
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
