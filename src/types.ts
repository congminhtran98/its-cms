export interface IPost {
  id: string;
  title: string;
  content: string;
}

export interface IEventRegistration {
  id: string;
  userId: number;
  eventId: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  registeredAt: string;
  canceledAt?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: IUser;
  event?: IEvent;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  capacity: number;
  createdAt: string;
}

export interface IMembership {
  id: string;
  userId: number;
  company: string;
  position: string;
  membershipType: string;
  startDate: string;
  endDate: string;
  user?: IUser;
}

export interface IUser {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
