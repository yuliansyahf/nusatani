export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'petani' | 'pengolah';
  address: string;
  waNumber: string;
  saldo: number;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  farmerId: string;
  name: string;
  category: string;
  quantityKg: number;
  pricePerKg: number;
  location: string;
  description: string;
  imageUrl: string;
  harvestDate: string;
  storageMethod: string;
  status: 'aktif' | 'terjual' | 'kadaluarsa';
  createdAt: string;
}

export interface Offer {
  id: string;
  productId: string;
  buyerId: string;
  offeredPricePerKg: number;
  quantityKg: number;
  note: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Transaction {
  id: string;
  productId: string;
  farmerId: string;
  buyerId: string;
  offerId: string;
  finalPricePerKg: number;
  totalAmount: number;
  commission: number;
  farmerEarning: number;
  status: 'deal' | 'paid' | 'pickup_scheduled' | 'in_transit' | 'completed';
  pickupDate?: string;
  createdAt: string;
}
