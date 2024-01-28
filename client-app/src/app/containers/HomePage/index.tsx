import { useStore } from "../../shared/common/stores/store";


const printUser = () =>{
  const { userStore } = useStore();
  console.log(userStore.getUser);
}

const HomePage = () => {

  return <>
  
  
  <div>HomePage</div>
  {printUser}
  </>
};

export default HomePage;
