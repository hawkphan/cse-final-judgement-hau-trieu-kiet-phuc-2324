import { Box } from "@mui/material";
import { useStore } from "../../shared/common/stores/store";
import Header from "./component(temp)/Header";
import Header2 from "./component(temp)/H2";
import Carousel from "./component(temp)/Carousel";
import bg from "../../../assets/images/Untitled.png";

const printUser = () => {
  const { userStore } = useStore();
  console.log(userStore.getUser);
};

const HomePage = () => {
  return (
    <div
      style={{
        //backgroundImage: "linear-gradient(to bottom right, #1976D2, #4880EC, #FFF)",
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat'
      }} 
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <>
          {
            //<Skelenton/>
          }
          {printUser}
        </>
        <div >
         <Carousel children={undefined}/> 
         </div>
        <Header children={undefined}/>
          <div style={{textAlign: 'center', margin: 'auto', marginBottom: 28}}>
            <p style={{fontSize: 24, fontWeight: 'bold', color: 'red'}}>Title Content</p>
            <p>Content content content content content content content content content</p>
          </div>
        <Header2 />
      </Box>
    </div>
  );
};

export default HomePage;
