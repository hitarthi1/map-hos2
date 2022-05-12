const hospitalForm = document.getElementById('hospital-form');


const  hospitalAddress= document.getElementById('hospital-address');
const hospitalId = document.getElementById('hospitalId');
const web_url = document.getElementById('web_url');
const image_url = document.getElementById('image_url');
const  rating= document.getElementById('rating');
const phone = document.getElementById('phone');
const  name= document.getElementById('name');
const typeHC = document.getElementById('typeHC');
const open = document.getElementById('open');
const spetiality = document.getElementById('spetiality');



// Send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  // if (storeId.value === '' || storeAddress.value === '') {
  //   alert('Please fill in fields');
  // }

  const sendBody = {
    // storeId: storeId.value,
    // address: storeAddress.value
    hospitalId:hospitalId.value,
    address:hospitalAddress.value,
    web_url:web_url.value,
    rating:rating.value,
    image_url:image_url.value,
    phone:phone.value,
    name:name.value,
    spetiality:spetiality.value,
    typeHC:typeHC.value
    //open.from:open.value


  };




  try {
    const res = await fetch('/api/v1/hospitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('hospital already exists!');
    }

    alert('  hospital added!');
    window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }



  
}

hospitalForm.addEventListener('submit', addStore);
