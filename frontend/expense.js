
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