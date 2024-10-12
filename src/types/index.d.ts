declare global {
  type Role = "customer" | "admin";

  type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    role: Role;
    deleted: boolean;
    updatedAt: string;
    createdAt: string;
  };

  type Doctor = {
    id: string;
    name: string;
    specialist: "aesthetic" | "dermatologist";
    availableDates: Array<number>;

    updatedAt: string;
    createdAt: string;
  };

  type Appointment = {
    id: string;
    updatedAt: string;
    createdAt: string;
    userId: string | null;
    doctorId: string | null;
    appointmentDate: string;
    status: "cancelled" | "pending" | "rejected" | "success" | "expired";
    age: number;
    remark: string | null;
    user: Pick<
      User,
      "name" | "email" | "role" | "deleted" | "createdAt"
    > | null;
    doctor: Pick<Doctor, "name" | "specialist" | "availableDates"> | null;
  };

  type Service = {
    id: string;
    name: string;
    description: string;

    updatedAt: string;
    createdAt: string;
  };

  type Product = {
    name: string;
    description: string;
    price: number;
    id: string;
    updatedAt: string;
    createdAt: string;
  };

  type PageProps = {
    params: Record<string, string>;
    searchParams: Record<string, string>;
  };
}

export {};
