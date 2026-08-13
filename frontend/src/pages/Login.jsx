import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Alert, Link } from '@mui/material';
import { setCredentials } from '../redux/slices/authSlice';
import { loginAPI } from '../services/authService';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setErrorMsg('');

      const response = await loginAPI(data);
      const token = response.token;

      // store token so axios interceptor can use it
      localStorage.setItem('token', token);

      // decode token to get the subject (email)
      const jwtDecode = (await import('jwt-decode')).default;
      let email = null;
      try {
        const decoded = jwtDecode(token);
        // backend sets subject as email
        email = decoded?.sub || decoded?.email || decoded?.subject || null;
      } catch (err) {
        // ignore decode errors
      }

      let user = null;
      if (email) {
        try {
          const usersResp = await (await import('../api/axiosInstance')).default.get('/api/users');
          const users = usersResp.data || [];
          user = users.find((u) => String(u.email).toLowerCase() === String(email).toLowerCase());
        } catch (err) {
          // if fetching user fails, continue with null user; UI will fallback to 'User'
        }
      }

      dispatch(setCredentials({ token, user }));

      navigate(from, { replace: true });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setErrorMsg('Network error. Is the server running?');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Sign In
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;