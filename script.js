

//Filter ID
document.getElementById('btnSearch').addEventListener('click', ()=>{
  const id = document.getElementById('appId').value.trim();
  if (!id) return showError('Application ID ထည့်ပေးပါ');
  showError('');
 if(id === '12345'){
  window.location.href = 'success.html';
 }else{
  window.location.href = 'not-found.html'
 }

});

let currentStatus = null;

const btnAccept = document.getElementById('btnAccept');
const btnDecline = document.getElementById('btnDecline');
const termsCheckbox = document.getElementById('termsCheckbox');

btnAccept.addEventListener('click', () => {
    currentStatus = 'Accepted';
    termsCheckbox.checked = true;
    showError('');
    
   
    btnAccept.classList.add('active', 'btn-success'); 
    btnAccept.classList.remove('btn-outline-success')
    btnDecline.classList.remove('active', 'btn-danger');
    btnDecline.classList.add('btn-outline-danger')
});

btnDecline.addEventListener('click', () => {
    currentStatus = 'Declined';
    termsCheckbox.checked = false;
    showError('');
    
    
    btnDecline.classList.add('active', 'btn-danger');
    btnDecline.classList.remove('btn-outline-danger');
    btnAccept.classList.remove('active', 'btn-success');
    btnAccept.classList.add('btn-outline-success');
});


document.getElementById('btnSubmit').addEventListener('click', () => {
    const appId = document.getElementById('appId').value.trim();
    
    
  

    // Validation
    if (!appId) return showError('Application ID လိုအပ်ပါသည်');
    if (!currentStatus) {
        return showError('ကျေးဇူးပြု၍ Accept သို့မဟုတ် Decline ကို ရွေးချယ်ပါ ');
    }
    
   
    

   
    const payload = {
        applicationId: appId,
        status: currentStatus , 
        timestamp: new Date().toISOString() 
    };

    console.log('Submitting payload:', payload);
    alert(`Form submitted successfully! \nStatus: ${payload.status}`);
    showError('');
});


function showError(msg) {
    const errorDiv = document.getElementById('error');
    if(errorDiv) {
        errorDiv.textContent = msg || '';
        
        errorDiv.style.color = 'red'; 
    } else {
        console.warn("Error container not found:", msg);
    }
}











