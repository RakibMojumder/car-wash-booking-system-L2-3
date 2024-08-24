import { TService } from './service.interface';
import Service from './service.model';

const createServiceIntoDB = async (payload: TService) => {
    const result = await Service.create(payload);
    return result;
};

const getAllServicesFromDB = async () => {
    const result = await Service.find();
    return result;
};

const getSingleServiceFromDB = async (id: string) => {
    const result = await Service.findOne({ _id: id });
    return result;
};

const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
    const result = await Service.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteServiceFromDB = async (id: string) => {
    const result = await Service.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
};

const serviceServices = {
    createServiceIntoDB,
    getAllServicesFromDB,
    getSingleServiceFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB,
};

export default serviceServices;
