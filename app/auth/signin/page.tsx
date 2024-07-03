'use client';

import React, { useRef, useState } from 'react';
import { signIn, getCsrfToken, getProviders } from 'next-auth/react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Checkbox from '@mui/material/Checkbox';
//Social Icon
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Radio } from '@mui/icons-material';
//CSS
const cssBody = { backgroundColor: '#fff' };
const cssCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '15px 15px 0px 0px',
};
const cssButton = { display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 };
const cssContainer = { height: { sm: 'auto', md: '100vh' } };
const cssBoxCenter = { justifyContent: 'center', alignItems: 'center', margin: '0 auto' };
const font15 = { fontSize: 15, color: '#325381', marginBottom: '10px' };
const cssIcon = { m: 2, color: '#516164', fontSize: 30 };

const cssBoxLogin = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 4,
  border: '1px solid #D4D4D4',
  maxWidth: '500px',
  margin: '0 auto',
};

const cssBackgroundImage = {
  backgroundImage: `url('/images/bg.png')`, // Thay đường dẫn tới ảnh của bạn ở đây
  backgroundSize: 'full',
  backgroundPosition: 'center',
};

const cssInput = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
  border: '0.5px solid #e1e4e7',
  borderRadius: 2,
};

const cssSocial = {
  backgroundColor: '#f8f9fa',
  padding: '10px 50px',
  color: '#325381',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: 2,
  border: '0.5px solid #e1e4e7',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#e1e4e7',
    backgroundColor: '#fff',
  },
};
//END CSS

const SignIn = () => {
  const email = useRef('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const callbackUrl = window.location.origin;
    try {
      const result = await signIn('credentials', {
        employeeId: email.current,
        password: password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError('ID社員番号またはパスワードが正しくありません。');
      } else {
        router.refresh();
        router.push(callbackUrl);
      }
    } catch (e) {
      // console.log('Login error:', 'login Fail', e);
    }
  };

  return (
    <div>
      <Box sx={{ ...cssBody, ...cssBackgroundImage }}>
        <form noValidate>
          <Grid container alignItems='center' sx={cssContainer}>
            <Box sx={cssBoxCenter}>
              <Box sx={cssBoxLogin}>
                <Grid item xs={12}>
                  <Grid container spacing={2} style={{ padding: 30 }}>
                    <Grid item xs={12} sx={{ mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ height: 50, mb: 1 }}>
                          <Paper elevation={0} onClick={() => signIn('facebook')} sx={cssSocial}>
                            <GoogleIcon /> <Typography> Sign In with Google</Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{ height: 50, mb: 1 }}>
                          <Paper elevation={0} onClick={() => signIn('facebook')} sx={cssSocial}>
                            <FacebookIcon /> <Typography>Sign In with Facebook</Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ height: 50, mb: 1, display: 'flex', justifyContent: 'center' }}
                    >
                      <Typography sx={{ color: '#325381', textAlign: 'center' }}>OR</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel id='email'>
                        <Typography sx={font15} style={{ marginBottom: '10px' }}>
                          Email Address
                        </Typography>
                      </FormLabel>
                      <Box sx={cssInput}>
                        <PersonIcon sx={cssIcon} />
                        {/* <Divider orientation='vertical' flexItem /> */}
                        <InputBase
                          sx={{ ml: 1, flex: 1, p: 1 }}
                          id='email'
                          name='email'
                          autoComplete='email'
                          placeholder='Nhập email'
                          inputProps={{
                            sx: {
                              '& input': {
                                backgroundColor: '#fff',
                              },
                            },
                          }}
                          onChange={(e) => (email.current = e.target.value)}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel id='email'>
                        <Typography sx={font15}>Password</Typography>
                      </FormLabel>
                      <Box sx={cssInput}>
                        <LockIcon sx={cssIcon} />
                        {/* <Divider orientation='vertical' flexItem /> */}
                        <InputBase
                          sx={{ ml: 1, flex: 1, p: 1 }}
                          id='password'
                          name='password'
                          type='password'
                          placeholder='Mật khẩu'
                          inputProps={{
                            sx: {
                              '& input': {
                                backgroundColor: '#fff',
                              },
                            },
                          }}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onSubmit(e);
                            }
                          }}
                        />
                        <VisibilityOffIcon sx={cssIcon} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={font15} style={{ textAlign: 'left' }}>
                        <Checkbox defaultChecked />
                        Remember me
                      </Typography>
                      <Typography
                        sx={{
                          ...font15,
                          textAlign: 'right',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Forgot Password?
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={cssButton}>
                      <Button
                        variant='contained'
                        onClick={onSubmit}
                        sx={{
                          backgroundColor: '#516164',
                          padding: '10px 50px',
                          '&:hover': {
                            backgroundColor: '#516164',
                          },
                          width: '100%',
                        }}
                      >
                        ĐĂNG NHẬP
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default SignIn;
