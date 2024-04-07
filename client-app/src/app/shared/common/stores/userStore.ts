import { makeAutoObservable, runInAction } from "mobx";
import agent from "../utils/agent";
import { router } from "../../../router/Routes";
import { store } from "./store";
import { PATHS } from "../../../configs/paths";
import { User, UserFormValues } from "./types";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    const user = await agent.Account.login(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    console.log(user);
    router.navigate(PATHS.problems);
    store.modalStore.closeModal();
  };

  register = async (creds: UserFormValues) => {
    const user = await agent.Account.register(creds);
    store.commonStore.setToken(user.token);
    runInAction(() => (this.user = user));
    router.navigate(PATHS.login);
    store.modalStore.closeModal();
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = null;
    console.log("logged out");
    router.navigate(PATHS.login);
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  setImage = (image: string) => {
    if (this.user) this.user.image = image;
  };

  setUserPhoto = (url: string) => {
    if (this.user) this.user.image = url;
  };

  setDisplayName = (name: string) => {
    if (this.user) this.user.displayName = name;
  };
}
