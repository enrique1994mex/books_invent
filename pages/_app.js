import '../styles/globals.css';
import UserProvider from '../context/user/User';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    </SnackbarProvider>
  )
}

export default MyApp
