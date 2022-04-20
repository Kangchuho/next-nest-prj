import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  //쿠키를 기준으로 인증처리
  const { data } = {}; //await client.get('/api/auth');
  //쿠키 -> header체크 ->  Bearer토크 체크 -> 인증처리

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      //data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
