import '../styles/globals.css';
import UserState from '../context/user/UserState';
import { SnackbarProvider } from 'notistack';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
      <UserState>
        <Component {...pageProps} />
      </UserState>
    </SnackbarProvider>
  )
}

export default MyApp
