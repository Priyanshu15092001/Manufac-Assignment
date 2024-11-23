import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import CropMaxMin from "./components/CropMaxMin/CropMaxMin";
import CropsAverage from "./components/CropsAverage/CropsAverage";

export default function App() {
  return <MantineProvider theme={theme}>
    <CropMaxMin/>
    <CropsAverage/>
  </MantineProvider>;
}
