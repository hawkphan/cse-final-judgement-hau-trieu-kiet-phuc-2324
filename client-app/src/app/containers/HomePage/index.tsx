import { Box } from "@mui/material";
import { useStore } from "../../shared/common/stores/store";
import Header from "./component(temp)/Header";
import Header2 from "./component(temp)/H2";
import Carousel from "./component(temp)/Carousel";

const printUser = () => {
  const { userStore } = useStore();
  console.log(userStore.getUser);
};

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom right, #4880EC, #FFF)",
      }}
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <>
          {
            //<Skelenton/>
          }
          {printUser}
        </>
        <Carousel children={undefined}/>
        <Header children={undefined}/>

        <Header2 />
      </Box>
    </div>
  );
};

export default HomePage;
