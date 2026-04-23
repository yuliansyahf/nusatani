import { User, Product, Offer, Transaction } from '@/types';

const KEYS = {
  users: 'nusatani_users',
  products: 'nusatani_products',
  offers: 'nusatani_offers',
  transactions: 'nusatani_transactions',
  currentUser: 'nusatani_current_user',
};

// ── Users ─────────────────────────────────────────────
export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.users) || '[]');
  } catch { return []; }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(KEYS.users, JSON.stringify(users));
}

export function getUserById(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function upsertUser(user: User): void {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  saveUsers(users);
}

// ── Current Session ───────────────────────────────────
export function getCurrentUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(KEYS.currentUser);
}

export function setCurrentUserId(id: string): void {
  localStorage.setItem(KEYS.currentUser, id);
}

export function clearCurrentUser(): void {
  localStorage.removeItem(KEYS.currentUser);
}

export function getCurrentUser(): User | null {
  const id = getCurrentUserId();
  if (!id) return null;
  return getUserById(id) ?? null;
}

// ── Products ──────────────────────────────────────────
export function getProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.products) || '[]');
  } catch { return []; }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(KEYS.products, JSON.stringify(products));
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(p => p.id === id);
}

export function upsertProduct(product: Product): void {
  const products = getProducts();
  const idx = products.findIndex(p => p.id === product.id);
  if (idx >= 0) products[idx] = product;
  else products.push(product);
  saveProducts(products);
}

export function deleteProduct(id: string): void {
  saveProducts(getProducts().filter(p => p.id !== id));
}

// ── Offers ────────────────────────────────────────────
export function getOffers(): Offer[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.offers) || '[]');
  } catch { return []; }
}

export function saveOffers(offers: Offer[]): void {
  localStorage.setItem(KEYS.offers, JSON.stringify(offers));
}

export function getOffersByProduct(productId: string): Offer[] {
  return getOffers().filter(o => o.productId === productId);
}

export function getOffersByBuyer(buyerId: string): Offer[] {
  return getOffers().filter(o => o.buyerId === buyerId);
}

export function upsertOffer(offer: Offer): void {
  const offers = getOffers();
  const idx = offers.findIndex(o => o.id === offer.id);
  if (idx >= 0) offers[idx] = offer;
  else offers.push(offer);
  saveOffers(offers);
}

// ── Transactions ──────────────────────────────────────
export function getTransactions(): Transaction[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEYS.transactions) || '[]');
  } catch { return []; }
}

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(KEYS.transactions, JSON.stringify(transactions));
}

export function getTransactionById(id: string): Transaction | undefined {
  return getTransactions().find(t => t.id === id);
}

export function getTransactionsByFarmer(farmerId: string): Transaction[] {
  return getTransactions().filter(t => t.farmerId === farmerId);
}

export function getTransactionsByBuyer(buyerId: string): Transaction[] {
  return getTransactions().filter(t => t.buyerId === buyerId);
}

export function upsertTransaction(transaction: Transaction): void {
  const transactions = getTransactions();
  const idx = transactions.findIndex(t => t.id === transaction.id);
  if (idx >= 0) transactions[idx] = transaction;
  else transactions.push(transaction);
  saveTransactions(transactions);
}

// ── Seed check ────────────────────────────────────────
export function isSeeded(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('nusatani_seeded') === 'true';
}

export function markSeeded(): void {
  localStorage.setItem('nusatani_seeded', 'true');
}
