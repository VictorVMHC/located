import { Local } from '../Interfaces/DbInterfaces'

export const compareLocal= (local: Local, updateLocal: Local) => {
    const updatedFields: Partial<Local> = {};

    if (local.name !== updateLocal.name && updateLocal.name !== undefined) {
        updatedFields.name = updateLocal.name;
    }
    if (local.description !== updateLocal.description && updateLocal.description !== undefined) {
        updatedFields.description = updateLocal.description;
    }
    if (local.address !== updateLocal.address && updateLocal.address !== undefined) {
        updatedFields.address = updateLocal.address;
    }
    if (local.uriImage !== updateLocal.uriImage && updateLocal.uriImage !== undefined) {
        updatedFields.uriImage = updateLocal.uriImage;
    }
    if (local.isVerify !== updateLocal.isVerify && updateLocal.isVerify !== undefined) {
        updatedFields.isVerify = updateLocal.isVerify;
    }
    if (local.country !== updateLocal.country && updateLocal.country !== undefined) {
        updatedFields.country = updateLocal.country;
    }
    if (local.state !== updateLocal.state && updateLocal.state !== undefined) {
        updatedFields.state = updateLocal.state;
    }
    if (local.town !== updateLocal.town && updateLocal.town !== undefined) {
        updatedFields.town = updateLocal.town;
    }
    if (local.postalCode !== updateLocal.postalCode && updateLocal.postalCode !== undefined) {
        updatedFields.postalCode = updateLocal.postalCode;
    }
    if (local.contact !== updateLocal.contact && updateLocal.contact !== undefined) {
        updatedFields.contact = updateLocal.contact;
    }
    if (local.schedules !== updateLocal.schedules && updateLocal.schedules !== undefined) {
        updatedFields.schedules = updateLocal.schedules;
    }
    if (local.rate !== updateLocal.rate && updateLocal.rate !== undefined) {
        updatedFields.rate = updateLocal.rate;
    }
    if (local.quantityRate !== updateLocal.quantityRate && updateLocal.quantityRate !== undefined) {
        updatedFields.quantityRate = updateLocal.quantityRate;
    }
    if (local.tags !== updateLocal.tags && updateLocal.tags !== undefined) {
        updatedFields.tags = updateLocal.tags;
    }
    if (local.location.latitude !== updateLocal.location.latitude && updateLocal.location.latitude !== undefined) {
        updatedFields.location = updateLocal.location;
    }
    if (local.location.longitude !== updateLocal.location.longitude && updateLocal.location.longitude !== undefined) {
        updatedFields.location = updateLocal.location;
    }
    if (local.open !== updateLocal.open && updateLocal.open !== undefined) {
        updatedFields.open = updateLocal.open;
    }
    if (local.businessType !== updateLocal.businessType && updateLocal.businessType !== undefined) {
        updatedFields.businessType = updateLocal.businessType;
    }
    if (local.localLikes !== updateLocal.localLikes && updateLocal.localLikes !== undefined) {
        updatedFields.localLikes = updateLocal.localLikes;
    }
    if (local.liked !== updateLocal.liked && updateLocal.liked !== undefined) {
        updatedFields.liked = updateLocal.liked;
    }

    return updatedFields;
};
