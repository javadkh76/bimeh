import { create } from 'zustand';
import { Address } from '@/types/address';

type FormData = {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
  address: Address | null;
};
interface IFormStore {
  formData: FormData;
  setFormData: (data: FormData) => void;
}
export const useFormStore = create<IFormStore>(set => ({
  formData: {
    nationalId: '',
    phoneNumber: '',
    addressId: '',
    address: null,
  },
  setFormData: (data: FormData) => set({ formData: data }),
}));
