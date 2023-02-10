import { renderBlock } from './lib.js';
import { reRenderUserBlock } from './index.js';
export function renderSearchStubBlock() {
    renderBlock('search-results-block', `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `);
}
const isFavoriteItem = (obj) => {
    return typeof obj === 'object'
        && obj !== null;
};
const toggleFavoriteItem = (e, data) => {
    const button = e.target;
    if (!button.classList.contains('favorites'))
        return;
    const favoriteItemsJSON = localStorage.getItem('favoriteItems');
    const favoriteItems = JSON.parse(favoriteItemsJSON);
    const favoriteItemsData = isFavoriteItem(favoriteItems) ? favoriteItems : {};
    const favoritesAmountJSON = localStorage.getItem('favoritesAmount');
    const favoritesAmount = JSON.parse(favoritesAmountJSON);
    let numberFavoritesAmount = typeof favoritesAmount === 'number' ? favoritesAmount : 0;
    if (!favoriteItemsData[button.id]) {
        button.classList.add('active');
        const favoriteItem = {
            id: data[button.id].id,
            name: data[button.id].name,
            image: data[button.id].image
        };
        favoriteItemsData[button.id] = favoriteItem;
        numberFavoritesAmount++;
    }
    else {
        e.target.classList.remove('active');
        delete favoriteItemsData[button.id];
        numberFavoritesAmount--;
    }
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItemsData));
    localStorage.setItem('favoritesAmount', JSON.stringify(numberFavoritesAmount));
    reRenderUserBlock(numberFavoritesAmount);
};
export function renderSearchResultsBlock(data) {
    console.log(data);
    let list = '';
    if (!data)
        renderBlock('search-results-block', `<div class="search-results-header">
            <p>Не удалось найти</p>
          </div>`);
    else {
        for (const el in data) {
            list += `<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div id="${el}" class="favorites"></div>
            <img class="result-img" src="${data[el].image}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${data[el].name}</p>
              <p class="price">${data[el].price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">${data[el].description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
        }
        renderBlock('search-results-block', `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list">
        ${list}
    </ul>
    `);
        document.getElementsByClassName('results-list')[0]
            .addEventListener('click', (e) => {
            toggleFavoriteItem(e, data);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFN0MsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7OztLQUtDLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsYUFBYTtJQUN6RCxXQUFXLENBQ1Qsc0JBQXNCLEVBQ3RCOzs7V0FHTyxhQUFhOztLQUVuQixDQUNGLENBQUM7QUFDSixDQUFDO0FBTUQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFZLEVBQXlCLEVBQUU7SUFDN0QsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRO1dBQ3pCLEdBQUcsS0FBSyxJQUFJLENBQUE7QUFDbkIsQ0FBQyxDQUFBO0FBRUQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLENBQVEsRUFBRSxJQUFZLEVBQVEsRUFBRTtJQUMxRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBMEIsQ0FBQTtJQUUzQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO1FBQUUsT0FBTTtJQUVuRCxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDL0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ25ELE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQVksQ0FBQTtJQUV0RixNQUFNLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNuRSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDdkQsSUFBSSxxQkFBcUIsR0FBRyxPQUFPLGVBQWUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRXJGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7UUFFOUIsTUFBTSxZQUFZLEdBQW1CO1lBQ25DLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSTtZQUMxQixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLO1NBQzdCLENBQUE7UUFFRCxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFBO1FBQzNDLHFCQUFxQixFQUFFLENBQUE7S0FDeEI7U0FBTTtRQUNKLENBQUMsQ0FBQyxNQUEyQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDekQsT0FBTyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbkMscUJBQXFCLEVBQUUsQ0FBQTtLQUN4QjtJQUVELFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLFlBQVksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUE7SUFFOUUsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUMxQyxDQUFDLENBQUE7QUFHRCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsSUFBYTtJQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2pCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUViLElBQUksQ0FBQyxJQUFJO1FBQUUsV0FBVyxDQUFDLHNCQUFzQixFQUMzQzs7aUJBRWEsQ0FBQyxDQUFBO1NBQ1g7UUFDSCxLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksRUFBRTtZQUNyQixJQUFJLElBQUk7Ozt1QkFHUyxFQUFFOzJDQUNrQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSzs7OzttQkFJdEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUk7aUNBQ0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7Ozs4Q0FHRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVzs7Ozs7Ozs7WUFRdEQsQ0FBQTtTQUNQO1FBQ0QsV0FBVyxDQUNULHNCQUFzQixFQUN0Qjs7Ozs7Ozs7Ozs7OztVQWFJLElBQUk7O0tBRVQsQ0FDQSxDQUFDO1FBRUYsUUFBUSxDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFRLEVBQVEsRUFBRTtZQUM1QyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDN0IsQ0FBQyxDQUFDLENBQUE7S0FDTDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJztcclxuaW1wb3J0IHtQbGFjZSwgUGxhY2VzfSBmcm9tICcuL3NlYXJjaC1mb3JtLmpzJ1xyXG5pbXBvcnQge3JlUmVuZGVyVXNlckJsb2NrfSBmcm9tICcuL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hTdHViQmxvY2soKSB7XHJcbiAgcmVuZGVyQmxvY2soXHJcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxyXG4gICAgYFxyXG4gICAgPGRpdiBjbGFzcz1cImJlZm9yZS1yZXN1bHRzLWJsb2NrXCI+XHJcbiAgICAgIDxpbWcgc3JjPVwiaW1nL3N0YXJ0LXNlYXJjaC5wbmdcIiAvPlxyXG4gICAgICA8cD7Qp9GC0L7QsdGLINC90LDRh9Cw0YLRjCDQv9C+0LjRgdC6LCDQt9Cw0L/QvtC70L3QuNGC0LUg0YTQvtGA0LzRgyDQuCZuYnNwO9C90LDQttC80LjRgtC1IFwi0J3QsNC50YLQuFwiPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckVtcHR5T3JFcnJvclNlYXJjaEJsb2NrKHJlYXNvbk1lc3NhZ2UpIHtcclxuICByZW5kZXJCbG9jayhcclxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXHJcbiAgICBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibm8tcmVzdWx0cy1ibG9ja1wiPlxyXG4gICAgICA8aW1nIHNyYz1cImltZy9uby1yZXN1bHRzLnBuZ1wiIC8+XHJcbiAgICAgIDxwPiR7cmVhc29uTWVzc2FnZX08L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIGBcclxuICApO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRmF2b3JpdGVQbGFjZXMge1xyXG4gIFtrZXk6IHN0cmluZ106IFBhcnRpYWw8UGxhY2U+XHJcbn1cclxuXHJcbmNvbnN0IGlzRmF2b3JpdGVJdGVtID0gKG9iajogdW5rbm93bik6IG9iaiBpcyBGYXZvcml0ZVBsYWNlcyA9PiB7XHJcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXHJcbiAgICAmJiBvYmogIT09IG51bGxcclxufVxyXG5cclxuY29uc3QgdG9nZ2xlRmF2b3JpdGVJdGVtID0gKGU6IEV2ZW50LCBkYXRhOiBQbGFjZXMpOiB2b2lkID0+IHtcclxuICBjb25zdCBidXR0b24gPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50XHJcblxyXG4gIGlmICghYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnZmF2b3JpdGVzJykpIHJldHVyblxyXG5cclxuICBjb25zdCBmYXZvcml0ZUl0ZW1zSlNPTiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmYXZvcml0ZUl0ZW1zJylcclxuICBjb25zdCBmYXZvcml0ZUl0ZW1zID0gSlNPTi5wYXJzZShmYXZvcml0ZUl0ZW1zSlNPTilcclxuICBjb25zdCBmYXZvcml0ZUl0ZW1zRGF0YSA9IGlzRmF2b3JpdGVJdGVtKGZhdm9yaXRlSXRlbXMpID8gZmF2b3JpdGVJdGVtcyA6IHt9IGFzIFBsYWNlc1xyXG5cclxuICBjb25zdCBmYXZvcml0ZXNBbW91bnRKU09OID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhdm9yaXRlc0Ftb3VudCcpXHJcbiAgY29uc3QgZmF2b3JpdGVzQW1vdW50ID0gSlNPTi5wYXJzZShmYXZvcml0ZXNBbW91bnRKU09OKVxyXG4gIGxldCBudW1iZXJGYXZvcml0ZXNBbW91bnQgPSB0eXBlb2YgZmF2b3JpdGVzQW1vdW50ID09PSAnbnVtYmVyJyA/IGZhdm9yaXRlc0Ftb3VudCA6IDBcclxuXHJcbiAgaWYgKCFmYXZvcml0ZUl0ZW1zRGF0YVtidXR0b24uaWRdKSB7XHJcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuXHJcbiAgICBjb25zdCBmYXZvcml0ZUl0ZW06IFBhcnRpYWw8UGxhY2U+ID0ge1xyXG4gICAgICBpZDogZGF0YVtidXR0b24uaWRdLmlkLFxyXG4gICAgICBuYW1lOiBkYXRhW2J1dHRvbi5pZF0ubmFtZSxcclxuICAgICAgaW1hZ2U6IGRhdGFbYnV0dG9uLmlkXS5pbWFnZVxyXG4gICAgfVxyXG5cclxuICAgIGZhdm9yaXRlSXRlbXNEYXRhW2J1dHRvbi5pZF0gPSBmYXZvcml0ZUl0ZW1cclxuICAgIG51bWJlckZhdm9yaXRlc0Ftb3VudCsrXHJcbiAgfSBlbHNlIHtcclxuICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgZGVsZXRlIGZhdm9yaXRlSXRlbXNEYXRhW2J1dHRvbi5pZF1cclxuICAgIG51bWJlckZhdm9yaXRlc0Ftb3VudC0tXHJcbiAgfVxyXG5cclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmF2b3JpdGVJdGVtcycsIEpTT04uc3RyaW5naWZ5KGZhdm9yaXRlSXRlbXNEYXRhKSk7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zhdm9yaXRlc0Ftb3VudCcsIEpTT04uc3RyaW5naWZ5KG51bWJlckZhdm9yaXRlc0Ftb3VudCkpXHJcblxyXG4gIHJlUmVuZGVyVXNlckJsb2NrKG51bWJlckZhdm9yaXRlc0Ftb3VudClcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soZGF0YT86IFBsYWNlcykge1xyXG4gIGNvbnNvbGUubG9nKGRhdGEpXHJcbiAgbGV0IGxpc3QgPSAnJ1xyXG5cclxuICBpZiAoIWRhdGEpIHJlbmRlckJsb2NrKCdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXHJcbiAgICBgPGRpdiBjbGFzcz1cInNlYXJjaC1yZXN1bHRzLWhlYWRlclwiPlxyXG4gICAgICAgICAgICA8cD7QndC1INGD0LTQsNC70L7RgdGMINC90LDQudGC0Lg8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5gKVxyXG4gIGVsc2Uge1xyXG4gICAgZm9yIChjb25zdCBlbCBpbiBkYXRhKSB7XHJcbiAgICAgIGxpc3QgKz0gYDxsaSBjbGFzcz1cInJlc3VsdFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWltZy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBpZD1cIiR7ZWx9XCIgY2xhc3M9XCJmYXZvcml0ZXNcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGltZyBjbGFzcz1cInJlc3VsdC1pbWdcIiBzcmM9XCIke2RhdGFbZWxdLmltYWdlfVwiIGFsdD1cIlwiPlxyXG4gICAgICAgICAgPC9kaXY+XHRcclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mb1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWhlYWRlclwiPlxyXG4gICAgICAgICAgICAgIDxwPiR7ZGF0YVtlbF0ubmFtZX08L3A+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmljZVwiPiR7ZGF0YVtlbF0ucHJpY2V9JiM4MzgxOzwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZXN1bHQtaW5mby0tbWFwXCI+PGkgY2xhc3M9XCJtYXAtaWNvblwiPjwvaT4gMi410LrQvCDQvtGCINCy0LDRgTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVzdWx0LWluZm8tLWRlc2NyXCI+JHtkYXRhW2VsXS5kZXNjcmlwdGlvbn08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlc3VsdC1pbmZvLS1mb290ZXJcIj5cclxuICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbj7Ql9Cw0LHRgNC+0L3QuNGA0L7QstCw0YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2xpPmBcclxuICAgIH1cclxuICAgIHJlbmRlckJsb2NrKFxyXG4gICAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxyXG4gICAgICBgXHJcbiAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdHMtaGVhZGVyXCI+XHJcbiAgICAgICAgPHA+0KDQtdC30YPQu9GM0YLQsNGC0Ysg0L/QvtC40YHQutCwPC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtcmVzdWx0cy1maWx0ZXJcIj5cclxuICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJpY29uIGljb24tZmlsdGVyXCI+PC9pPiDQodC+0YDRgtC40YDQvtCy0LDRgtGMOjwvc3Bhbj5cclxuICAgICAgICAgICAgPHNlbGVjdD5cclxuICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ9XCJcIj7QodC90LDRh9Cw0LvQsCDQtNC10YjRkdCy0YvQtTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD1cIlwiPtCh0L3QsNGH0LDQu9CwINC00L7RgNC+0LPQuNC1PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uPtCh0L3QsNGH0LDQu9CwINCx0LvQuNC20LU8L29wdGlvbj5cclxuICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDx1bCBjbGFzcz1cInJlc3VsdHMtbGlzdFwiPlxyXG4gICAgICAgICR7bGlzdH1cclxuICAgIDwvdWw+XHJcbiAgICBgXHJcbiAgICApO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Jlc3VsdHMtbGlzdCcpWzBdXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgICAgIHRvZ2dsZUZhdm9yaXRlSXRlbShlLCBkYXRhKVxyXG4gICAgICB9KVxyXG4gIH1cclxufVxyXG4iXX0=