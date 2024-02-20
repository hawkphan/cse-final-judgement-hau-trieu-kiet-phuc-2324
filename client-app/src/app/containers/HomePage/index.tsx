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
{/*         <>
          {printUser}
        </> */}
        <div >
         <Carousel children={undefined}/> 
         </div>
        <Header children={undefined}/>
          <div style={{textAlign: 'center', margin: 'auto', marginBottom: 28,  marginTop: 30,}}>
            <p style={{fontSize: 24, fontWeight: 'bold', color: 'red'}}>Title Content</p>
            <p>Content content content content content content content content content</p>
          </div>
        <Header2 />
        <div style={{textAlign: 'center', margin: 'auto', marginBottom: 30, marginTop: 30, maxWidth: '500px'}}>
            <p>If you are passionate about tackling some of the most interesting problems around, we would love to hear from you.</p>
            <p style={{color: '#00A9F5',fontSize: 16}}><a href="" style={{color: '#00A9F5',fontSize: 16,  fontWeight: 'bold'}}>Join with us</a>   &#11166;</p>
          </div>
      </Box>
    </div>
  );
};

export default HomePage;
