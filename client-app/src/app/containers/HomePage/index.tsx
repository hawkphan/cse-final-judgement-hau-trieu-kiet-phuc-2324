import { useStore } from "../../shared/common/stores/store";

const HomePage = () => {
  const { userStore } = useStore();
  userStore.getUser();

  return <div>HomePage</div>;
};

export default HomePage;
