const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_q9pf3dp';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => { 
        btn.value = 'Enviar';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tu mensaje fue enviado exitosamente',
          showConfirmButton: true,
          timer: 1500
        })
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Intentalo nuevamente!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        btn.value = 'Enviar';
        alert(JSON.stringify(err));
      });
  });  