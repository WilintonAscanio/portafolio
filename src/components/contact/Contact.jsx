import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import './contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validar el correo electrónico
    if (name === 'email') {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(value)) {
        setEmailError('Correo electrónico no válido');
      } else {
        setEmailError('');
      }
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    // Verificar si hay errores de validación antes de enviar
    if (emailError) {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, corrige los errores en el formulario.',
      });
      return;
    }

    try {
      const response = await emailjs.sendForm(
        'service_lkk93kc',
        'template_amk4hws',
        e.target,
        'SNNiga3j41sI-K--x'
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          text: 'Mensaje enviado',
        });
        // Limpiar el formulario
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          text:
            'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.',
        });
      }

      console.log(response);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      Swal.fire({
        icon: 'error',
        text: 'Error al enviar el mensaje',
      });
    }
  };

  return (
    <article id='contact' className='contact'>
      <strong>Contact me</strong>
      <form onSubmit={sendEmail}>
        <TextField
          label='Name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          label='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          label='Message'
          rows={8}
          className='contact__message'
          multiline
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type='submit' className='btnDownload'>
          SEND
        </button>
      </form>
    </article>
  );
};

export default Contact;
