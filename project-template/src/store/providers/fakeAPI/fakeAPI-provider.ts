import { Place } from '../../domain/place.js';
import { Provider } from '../../domain/provider.js';
import { SearchFilter } from '../../domain/search-filter.js';
import { HttpHelper } from '../../utils/http-helper.js';
import { PlaceResponse, PlaceListResponse, Place as FakeAPIPlace } from './response.js';

export class FakeAPIProvider implements Provider {
  public static provider = 'faceAPI';
  private static apiUrl = 'http://localhost:3000I';

  public find(filter: SearchFilter): Promise<Place[]> {
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      FakeAPIProvider.apiUrl
      + '/reservationAP?' +
      this.convertFilterToQueryString(filter)
    )
      .then((response) => {
        this.assertIsValidResponse(response)
        return this.convertPlaceListResponse(response)
      })
  }

  public getById(id: string): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(FakeAPIProvider.apiUrl + '/place/' + id)
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

  private convertPlaceResponse(item: FakeAPIPlace): Place {
    return new Place(
      FakeAPIProvider.provider,
      String(item.id),
      item.name,
      item.description,
      item.image,
      item.remoteness,
      [],
      [],
      item.price,
    );
  }
}

