// src/pages/Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions')
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async data => {
    // Directly navigate to the posts page on form submission
    navigate('/posts');
  };
  /*const onSubmit = async data => {
    try {
      const response = await login(data);
      if (response.data.length > 0) {
        alert('Login successful!');
        navigate('/posts'); // Navigate to the posts page
      } else {
        setServerError('Invalid email or password.');
      }
    } catch (error) {
      setServerError('Login failed. Please try again later.');
    }
  };*/

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" {...register('username')} />
            <FaUser className="icon" />
            {errors.username && <p className="error">{errors.username.message}</p>}
          </div>
          <div className="input-box">
            <input type="text" placeholder="Email" {...register('email')} />
            <FaEnvelope className="icon" />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" {...register('password')} />
            <FaLock className="icon" />
            <div className="password-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <div className="input-box">
            <input type="password" placeholder="Confirm Password" {...register('confirmPassword')} />
            <div className="password-icon" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password</a>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="error" {...register('terms')} />
              <span className="text-sm text-gray-700">Accept terms and conditions</span>
            </label>
            {errors.terms && <p className="error">{errors.terms.message}</p>}
          </div>
          {serverError && <p className="error">{serverError}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
