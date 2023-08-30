import { User } from '../Interfaces/UserInterface'

export const compareUsers = (user: User, updatedUser: User) => {
    const updatedFields: Partial<User> = {};

    if (user.name !== updatedUser.name && updatedUser.name !== undefined) {
        updatedFields.name = updatedUser.name;
    }
    if (user.username !== updatedUser.username && updatedUser.username !== undefined) {
        updatedFields.username = updatedUser.username;
    }
    if (user.email !== updatedUser.email && updatedUser.email !== undefined) {
        updatedFields.email = updatedUser.email;
    }
    if (user.phone !== updatedUser.phone && updatedUser.phone !== undefined) {
        updatedFields.phone = updatedUser.phone;
    }
    if (user.age !== updatedUser.age && updatedUser.age !== undefined) {
        updatedFields.age = updatedUser.age;
    }

    return updatedFields;
};