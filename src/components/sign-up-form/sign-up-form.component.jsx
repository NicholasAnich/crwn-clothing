import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { SignUpContainer, SignUpTitle } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState(null);
  const { displayName, email, password, confirmPassword } = formFields;

  function resetFormField() {
    setFormFields(defaultFormFields);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormField();

      setError(null);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else {
        console.log(error.message);
      }
      setError(error.message);
    }
  }

  return (
    <>
      <SignUpContainer>
        <SignUpTitle>Don't have an account?</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange}
            required
          />
          <FormInput
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
          <FormInput
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />
          <FormInput
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          <Button buttonType='default' type='submit'>
            Submit
          </Button>
          {error && <p>{error}</p>}
        </form>
      </SignUpContainer>
    </>
  );
}
