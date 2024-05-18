/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile } from "../Profiles";

export interface Notification {
  id: string;
  content: string;
  type: number;
  timestamp: string;
  status: number;
  receiverId: string;
  senderId: string;
  receiver: Profile<any>;
  sender: Profile<any>;
}
