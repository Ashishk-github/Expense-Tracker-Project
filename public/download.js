
window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const res=await axios.get('http://localhost:3000/previous-downloads',{
            headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}` 
                    }})
        const downloads=res.data;
        showDownloadsOnScreen(downloads);
    }catch(err){
        if(err.response.status===404) {
            alert('Please Buy Our Premium Membership');
        };
        console.log(err)
    }
});
function showDownloadsOnScreen(res){
    const div=document.getElementById('downloads-container');
    console.log(res);
    div.innerHTML='<h1>Past Downloads</h1>';
    for(x of res){
        const a=document.createElement('a');
        a.href=`${x.fileURL}`
        a.innerText=`${x.fileURL}`
        div.appendChild(li);
    }
}
