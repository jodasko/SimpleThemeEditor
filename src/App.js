import React from 'react';
import './App.css';
import { Layout } from 'antd';
import EditorInline from './components/editorinline';
import { ThemeProvider } from './ThemeContext';

const { Header } = Layout;

function App() {
  return (
    <div className="App container mt-y">
      <Layout>
        <Header className="header">
          <h1 className="title">Simple Theme Editor</h1>
        </Header>
      </Layout>

      <div className="block propertiesBlock">
        <div className="container-fluid">
          <ThemeProvider>
            <EditorInline />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
