import { renderBlock } from './lib.js';
import { formatDate, getLastDayOfNextMonth, shiftDate } from './date-utils.js';
import { renderSearchResultsBlock } from './search-results.js';
export function renderSearchFormBlock(checkInDate, checkOutDate) {
    const nowDate = new Date();
    const checkIn = formatDate(checkInDate || shiftDate(nowDate, 1));
    const checkOut = formatDate(checkOutDate || shiftDate(checkInDate || nowDate, 2));
    const minDate = formatDate(nowDate);
    const maxDate = formatDate(getLastDayOfNextMonth(nowDate));
    renderBlock('search-form-block', `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkIn}" min="${minDate}" max="${maxDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${checkOut}" min="${minDate}" max="${maxDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="search">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
}
const search = (searchData) => {
    console.log(searchData);
    fetch('http://localhost:3000/places')
        .then((response) => {
        return response.text();
    })
        .then((responseText) => {
        return JSON.parse(responseText);
    })
        .then((data) => {
        for (const el in data) {
            if (data[el].price > searchData.maxPrice)
                delete data[el];
        }
        if (!Object.keys(data).length)
            renderSearchResultsBlock();
        else
            renderSearchResultsBlock(data);
    });
};
export const searchHandler = () => {
    const city = document.getElementById('city');
    const checkIn = document.getElementById('check-in-date');
    const checkOut = document.getElementById('check-out-date');
    const maxPrice = document.getElementById('max-price');
    const searchData = {
        city: city.value,
        checkIn: checkIn.value,
        checkOut: checkOut.value,
        maxPrice: +maxPrice.value
    };
    search(searchData);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9FLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBRTlELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxXQUFrQixFQUFFLFlBQW1CO0lBQzNFLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDM0IsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUN6QixZQUFZLElBQUksU0FBUyxDQUFDLFdBQVcsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQ3JELENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDM0QsV0FBVyxDQUNULG1CQUFtQixFQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7MkRBaUJ1RCxPQUFPLFVBQVUsT0FBTyxVQUFVLE9BQU87Ozs7NERBSXhDLFFBQVEsVUFBVSxPQUFPLFVBQVUsT0FBTzs7Ozs7Ozs7Ozs7O0tBWWpHLENBQ0YsQ0FBQztBQUNKLENBQUM7QUF1QkQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxVQUEwQixFQUFFLEVBQUU7SUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUV2QixLQUFLLENBQUMsOEJBQThCLENBQUM7U0FDbEMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDakIsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDeEIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFTLENBQUMsWUFBWSxFQUFFLEVBQUU7UUFDN0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2pDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2IsS0FBSSxNQUFNLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDcEIsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRO2dCQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQzFEO1FBQ0QsSUFBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtZQUFFLHdCQUF3QixFQUFFLENBQUE7O1lBQ25ELHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3JDLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBO0FBRUQsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFHLEdBQVMsRUFBRTtJQUN0QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBcUIsQ0FBQTtJQUNoRSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBcUIsQ0FBQTtJQUM1RSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFxQixDQUFBO0lBQzlFLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFxQixDQUFBO0lBRXpFLE1BQU0sVUFBVSxHQUFtQjtRQUNqQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7UUFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1FBQ3RCLFFBQVEsRUFBRSxRQUFRLENBQUMsS0FBSztRQUN4QixRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSztLQUMxQixDQUFBO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnO1xuaW1wb3J0IHsgZm9ybWF0RGF0ZSwgZ2V0TGFzdERheU9mTmV4dE1vbnRoLCBzaGlmdERhdGUgfSBmcm9tICcuL2RhdGUtdXRpbHMuanMnO1xuaW1wb3J0IHsgcmVuZGVyU2VhcmNoUmVzdWx0c0Jsb2NrIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0cy5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jayhjaGVja0luRGF0ZT86IERhdGUsIGNoZWNrT3V0RGF0ZT86IERhdGUpIHtcbiAgY29uc3Qgbm93RGF0ZSA9IG5ldyBEYXRlKCk7XG4gIGNvbnN0IGNoZWNrSW4gPSBmb3JtYXREYXRlKGNoZWNrSW5EYXRlIHx8IHNoaWZ0RGF0ZShub3dEYXRlLCAxKSk7XG4gIGNvbnN0IGNoZWNrT3V0ID0gZm9ybWF0RGF0ZShcbiAgICBjaGVja091dERhdGUgfHwgc2hpZnREYXRlKGNoZWNrSW5EYXRlIHx8IG5vd0RhdGUsIDIpXG4gICk7XG4gIGNvbnN0IG1pbkRhdGUgPSBmb3JtYXREYXRlKG5vd0RhdGUpO1xuICBjb25zdCBtYXhEYXRlID0gZm9ybWF0RGF0ZShnZXRMYXN0RGF5T2ZOZXh0TW9udGgobm93RGF0ZSkpO1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybT5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZCB2YWx1ZT1cItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGlzYWJsZWQgdmFsdWU9XCI1OS45Mzg2LDMwLjMxNDFcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiaG9teVwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgY2hlY2tlZCAvPiBGbGF0UmVudDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+LS0hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7Y2hlY2tJbn1cIiBtaW49XCIke21pbkRhdGV9XCIgbWF4PVwiJHttYXhEYXRlfVwiIG5hbWU9XCJjaGVja2luXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLW91dC1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT1cIiR7Y2hlY2tPdXR9XCIgbWluPVwiJHttaW5EYXRlfVwiIG1heD1cIiR7bWF4RGF0ZX1cIiBuYW1lPVwiY2hlY2tvdXRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibWF4LXByaWNlXCI+0JzQsNC60YEuINGG0LXQvdCwINGB0YPRgtC+0Lo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwibWF4LXByaWNlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJwcmljZVwiIGNsYXNzPVwibWF4LXByaWNlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj48YnV0dG9uIGlkPVwic2VhcmNoXCI+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGBcbiAgKTtcbn1cblxuaW50ZXJmYWNlIFNlYXJjaEZvcm1EYXRhIHtcbiAgY2l0eTogc3RyaW5nLFxuICBjaGVja0luOiBzdHJpbmcsXG4gIGNoZWNrT3V0OiBzdHJpbmcsXG4gIG1heFByaWNlOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbGFjZSB7XG4gICAgYm9va2VkRGF0ZXM6IEFycmF5PGFueT4sXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICBpZDogbnVtYmVyLFxuICAgIGltYWdlOiBzdHJpbmcsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHByaWNlOiBudW1iZXIsXG4gICAgcmVtb3RlbmVzczogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxhY2VzIHtcbiAgW2tleTogc3RyaW5nXTogUGxhY2Vcbn1cblxuY29uc3Qgc2VhcmNoID0gKHNlYXJjaERhdGE6IFNlYXJjaEZvcm1EYXRhKSA9PiB7XG4gIGNvbnNvbGUubG9nKHNlYXJjaERhdGEpXG5cbiAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wbGFjZXMnKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKVxuICAgIH0pXG4gICAgLnRoZW48UGxhY2VzPigocmVzcG9uc2VUZXh0KSA9PiB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwb25zZVRleHQpXG4gICAgfSlcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgZm9yKGNvbnN0IGVsIGluIGRhdGEpIHtcbiAgICAgICAgaWYgKGRhdGFbZWxdLnByaWNlID4gc2VhcmNoRGF0YS5tYXhQcmljZSkgZGVsZXRlIGRhdGFbZWxdXG4gICAgICB9XG4gICAgICBpZighT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoKSByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soKVxuICAgICAgZWxzZSByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soZGF0YSlcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc2VhcmNoSGFuZGxlciA9ICgpOiB2b2lkID0+IHtcbiAgY29uc3QgY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5JykgYXMgSFRNTElucHV0RWxlbWVudFxuICBjb25zdCBjaGVja0luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrLWluLWRhdGUnKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gIGNvbnN0IGNoZWNrT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrLW91dC1kYXRlJykgYXMgSFRNTElucHV0RWxlbWVudFxuICBjb25zdCBtYXhQcmljZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXgtcHJpY2UnKSBhcyBIVE1MSW5wdXRFbGVtZW50XG5cbiAgY29uc3Qgc2VhcmNoRGF0YTogU2VhcmNoRm9ybURhdGEgPSB7XG4gICAgY2l0eTogY2l0eS52YWx1ZSxcbiAgICBjaGVja0luOiBjaGVja0luLnZhbHVlLFxuICAgIGNoZWNrT3V0OiBjaGVja091dC52YWx1ZSxcbiAgICBtYXhQcmljZTogK21heFByaWNlLnZhbHVlXG4gIH1cblxuICBzZWFyY2goc2VhcmNoRGF0YSlcbn1cbiJdfQ==