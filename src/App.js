import React from 'react';
import { Layout } from 'antd';
import UserForm from './components/UserForm';


const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px',backgroundColor:"blue" }}>Form Application</Header>
      <Content style={{ padding: '50px' }}>
        <UserForm />
      </Content>
    </Layout>
  );
};

export default App;
