import { PrismaClient } from "@/generated/prisma";

export const prismaclient = new PrismaClient();

type UserType = {
    email: string,
    password: string
} | null

export default UserType;