import { ConfigProvider } from "antd";
import ptBR from "antd/locale/pt_BR";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <ConfigProvider locale={ptBR} theme={{ token: { colorPrimary: "#1890ff" } }}>
      <MainPage />
    </ConfigProvider>
  );
}

export default App;
