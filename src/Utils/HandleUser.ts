import { User } from '../Interfaces/UserInterface'

export const compareUsers = (user: User, updatedUser: User) => {
    const changes: Record<string, boolean> = {};

    if (user.name !== updatedUser.name) {
        changes.name = true;
    }
    if (user.username !== updatedUser.username) {
        changes.username = true;
    }
    if (user.email !== updatedUser.email) {
        changes.email = true;
    }
    if (user.phone !== updatedUser.phone) {
        changes.phone = true;
    }
    if (user.age !== updatedUser.age) {
        changes.age = true;
    }

    return changes;
};