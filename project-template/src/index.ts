import { favoritesAmountType, userType } from './interface';
import { renderSearchFormBlock } from './search-form.js';
import { calcFavoritesAmount, renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { FlatRentSdk, addDays, cloneDate } from './flat-rent-sdk.js';

export function setLocalStorage(key: string, data: object): void {
  localStorage.setItem(key, JSON.stringify(data));
};
// unknown - потому что такое было ДЗ из 1 урока
export function getUserData(): unknown {
  return JSON.parse(localStorage.getItem('user'));
};
// unknown - потому что такое было ДЗ из 1 урока
export function getFavoritesAmount(): unknown {
  return JSON.parse(localStorage.getItem('favoritesAmount'));
};

const sdk = new FlatRentSdk();
const today = new Date();
// sdk.get('mvm32l')
//   .then((flat) => {
//     console.log('flat by id', flat)
//   });
sdk.search({
  city: 'Санкт-Петербург',
  checkInDate: cloneDate(today),
  checkOutDate: addDays(cloneDate(today), 1),
  priceLimit: 15000
})
  .then(res => console.log(res))
  .catch((result) => {
    console.error('serach without dates', result)
  })

window.addEventListener('DOMContentLoaded', () => {
  setLocalStorage('user', { username: 'Wade Warren', avatarUrl: '/img/avatar.png' });
  setLocalStorage('favoritesAmount', { favoritesAmount: calcFavoritesAmount() });

  renderUserBlock(
    (getUserData() as userType).username,
    (getUserData() as userType).avatarUrl,
    (getFavoritesAmount() as favoritesAmountType).favoritesAmount
  );
  renderSearchFormBlock();
  renderSearchStubBlock();
});
