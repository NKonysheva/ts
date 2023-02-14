import { Place } from '../../domain/place.js';
import { Provider } from '../../domain/provider.js';
import { SearchFilter } from '../../domain/search-filter.js';
import { HttpHelper } from '../../utils/http-helper.js';
import { PlaceResponse, PlaceListResponse, Place as SDKPlace } from './response.js';

export class SDKProvider implements Provider {
  public static provider = 'SDK';
  private static apiUrl = 'http://localhost:3000';

  public find(filter: SearchFilter): Promise<Place[]> {
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      SDKProvider.apiUrl
      + '/places?' +
      this.convertFilterToQueryString(filter)
    )
      .then((response) => {
        this.assertIsValidResponse(response)
        return this.convertPlaceListResponse(response)
      })
  }

  public getById(id: string): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(SDKProvider.apiUrl + '/place/' + id)
      .then((response) => {
        this.assertIsValidResponse(response)
        return this.convertPlaceResponse(response.item)
      })
  }

  private assertIsValidResponse(response: PlaceListResponse | PlaceResponse): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage);
    }
  }

  private convertFilterToQueryString(filter: SearchFilter): string {
    return `city=${filter.city}&priceLimit=${filter.priceLimit}&checkInDate=${filter.checkInDate}&checkOutDate=${filter.checkOutDate}`;
  }

  private convertPlaceListResponse(response: PlaceListResponse): Place[] {
    return response.items.map((item) => {
      return this.convertPlaceResponse(item)
    })
  }

  private convertPlaceResponse(item: SDKPlace): Place {
    return new Place(
      SDKProvider.provider,
      String(item.id),
      item.title,
      item.details,
      item.photos[0],
      null,
      item.coordinates,
      item.bookedDates,
      item.price,
    );
  }
}

