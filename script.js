

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

document.getElementById('btnSubmit').addEventListener('click', () => {
  const appId = document.getElementById('appId').value.trim();
  
  const checked = document.getElementById('agree').checked;

  if (!appId) return showError('Application ID လိုအပ်ပါသည်။');
  if (!checked) return showError('ကျေးဇူးပြု၍ သဘောတူကြောင်း သတ်မှတ်ရန် လိုအပ်ပါသည်။');
  

  const payload = {
    applicationId: appId,
    timestamp: new Date().toISOString()
  };

  console.log('Submitting payload:', payload);
  alert(`appId: ${appId} is submitted form successfully!`);
  showError('');
});

function showError(msg) {
  document.getElementById('error').textContent = msg || '';
}













