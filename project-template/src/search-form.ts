import { Place, SearchFormData } from './interface.js';
import { renderBlock, renderToast } from './lib.js';
import { renderEmptyOrErrorSearchBlock, showSearchResultsBlock } from './search-results.js';

const URL_API = 'http://localhost:3000/places';
const timerName: Array<number> = [];

export function renderSearchFormBlock(dateBegin?: string, dateFinish?: string): void {

  function calcDate(y: number, m: number, d: number): string {
    const currentTime = new Date();

    return formatDate(
      new Date(
        currentTime.getFullYear() + y,
        currentTime.getMonth() + m,
        m !== 0 && d === 0 ? 0 : currentTime.getDate() + d
      )
        .toLocaleDateString());
  }

  function formatDate(date: string): string {
    return date.split('.').reverse().join('-');
  }

  const minTimeSelect = calcDate(0, 0, 0);
  const maxTimeSelect = calcDate(0, 2, 0);
  const defaultDateBegin = dateBegin ? formatDate(dateBegin) : calcDate(0, 0, 1);
  const defaultDateFinish = dateFinish ? formatDate(dateFinish) : calcDate(0, 0, 3);

  window.addEventListener('load', () => {
    const searchForm = document.forms.namedItem('searchForm');

    if (searchForm === null) return;
    searchForm.addEventListener('change', resetForm);

    // enum Genre {
    //   city,
    //   checkin,
    //   checkout,
    //   price
    // }

    function search(e: Event, fnCollBack: CallableFunction): void {
      e.preventDefault();

      let data: SearchFormData = {
        city: '',
        checkin: '',
        checkout: '',
        price: 0,
      };
      if (searchForm === null) return;
      const formData = new FormData(searchForm);
      for (const key in data) {
        // if (isNaN(+key)) {
        data = { ...data, [key]: formData.get(key) };
        // data[key] = formData.get(key);
        if (key === 'price') data[key] = +data[key];
        // }
      }

      searchFormData(data);
      fnCollBack();
    }

    async function searchFormData(searchData: SearchFormData): Promise<void> {
      await fetchDataAPI()
        .then((res) => {
          const result: Place[] = [];

          for (const key in res) {
            if (Object.prototype.hasOwnProperty.call(res, key)) {
              const el: Place = res[key as keyof typeof res];
              if (el.price <= searchData.price) result.push(res[key as keyof typeof res]);
            }
          }
          if (Object.keys(result).length === 0) {
            renderEmptyOrErrorSearchBlock('Нет результатов удовлетворяющих данному запросу.');
          } else {
            showSearchResultsBlock(result);
          }
        })
        .catch((err: Error) => console.log(err));
    }

    async function fetchDataAPI(): Promise<Array<Place> | Error> {
      const response = await fetch(URL_API);

      if (!response.ok) {
        return new Error('Ошибка HTTP: ' + response.status);
      }
      return await response.json();
    }

    searchForm.addEventListener('submit', (e) => search(e, resetForm));
  });

  function resetForm(): void {
    const elemNodeResultsBlock: Element = document.querySelector('.results-list')!;
    const elemNodeFiledset: Element = document.querySelector('.search-filedset')!;

    function disabledButton(elements: Element): void {
      elements.querySelectorAll('button').forEach(el => el.disabled = true);
    }

    timerName.forEach((item: number) => clearInterval(item));

    const timer = setTimeout(() => {
      elemNodeResultsBlock !== null ? disabledButton(elemNodeResultsBlock) : '';
      disabledButton(elemNodeFiledset);

      renderToast(
        {
          text: 'Необходимо обновить данные формы!',
          type: 'success',
        },
        {
          name: 'Обновить',
          handler: () => {
            location.reload();
          },
        }
      );
    }, 300000);

    timerName.push(timer);
  }

  renderBlock(
    'search-form-block',
    `
    <form name="searchForm" id="searchForm">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" name="city" value="Санкт-Петербург" />
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
            <input id="check-in-date" type="date" value="${defaultDateBegin}" min="${minTimeSelect}" max="${maxTimeSelect}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${defaultDateFinish}" min="${defaultDateBegin}" max="${maxTimeSelect}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="number" value="6000" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}

