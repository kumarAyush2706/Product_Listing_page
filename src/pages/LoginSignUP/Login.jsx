import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Box, Paper, Grid,
} from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    name: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // const res = await fetch('https://fakestoreapi.com/users');
      // const users = await res.json();

      // const curr_user = users.find(
      //   (u) => u.password === form.password && u.username === form.username
      // );
      // console.log(curr_user)

      // if (curr_user) {
      //   setMessage('Login successful!');
      //   setUser(curr_user);
      // } else {
      //   setMessage('Invalid credentials!');
      //   setUser(null)
      // }

      const res = await axios.post("https://fakestoreapi.com/auth/login", {username: form.username, password: form.password});
      const data = res.data; 
      if (data.token) {
        localStorage.setItem("token_123", data.token)
        setMessage('Login successful!');
        navigate("/")
      }
    } catch (err) {
      console.error(err);
      setMessage('Login failed!');
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
          name: {
            firstname: form.name.split(' ')[0],
            lastname: form.name.split(' ')[1] || '',
          },
          address: {
            city: 'city',
            street: 'street',
            number: 3,
            zipcode: '12345',
            geolocation: {
              lat: '0',
              long: '0',
            },
          },
          phone: '123-456-7890',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);
      setMessage('Signup successful!');
    } catch (err) {
      console.error(err);
      setMessage('Signup failed!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    isLogin ? handleLogin() : handleSignup();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          {isLogin ? 'Login' : 'Signup'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          /> */}
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {!isLogin && (
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          )}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" fullWidth>
              {isLogin ? 'Login' : 'Signup'}
            </Button>
          </Box>
        </form>
        <Box mt={2}>
          <Typography color="primary">{message}</Typography>
        </Box>
        <Box mt={2}>
          <Button onClick={() => setIsLogin(!isLogin)} color="secondary">
            {isLogin ? 'New here? Sign up' : 'Already have an account? Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
