export interface IPost {
  id: string;
  title: string;
  content: string;
}

export interface IEventRegistration {
  id: string;
  status: string;
  canceledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  capacity: number;
}

export interface IMembership {
  id: string;
  userId: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface IUser {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  isVerified: boolean;
}
