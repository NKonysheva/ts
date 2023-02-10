import { Place } from './domain/place.js';
import { SearchFilter } from './domain/search-filter.js';
import { SDKProvider } from './providers/sdk/sdk-provider.js';
import { FakeAPIProvider } from './providers/fakeAPI/fakeAPI-provider.js'

const providers = [
  new FakeAPIProvider(),
  new SDKProvider()
];

const filter: SearchFilter = {
  city: 'Санкт-Петербург',
  checkInDate: new Date(),
  checkOutDate: new Date(),
  priceLimit: 4500
}

function sortByPrice(one: Place, two: Place): 1 | -1 | 0 {
  if (one.price > two.price) {
    return 1
  } else if (one.price < two.price) {
    return -1
  } else {
    return 0
  }
}

Promise.all(
  providers.map(provider => provider.find(filter))
).then((results) => {
  const allResults: Place[] = [].concat(...results);
  allResults.sort(sortByPrice);
});
