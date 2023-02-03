import { renderBlock } from './lib.js';
export function renderUserBlock(name, avatarUrl, favoriteItemsAmount) {
    const favoritesCaption = favoriteItemsAmount
        ? favoriteItemsAmount
        : 'ничего нет';
    const hasFavoriteItems = !!favoriteItemsAmount;
    renderBlock('user-block', `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="${name}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFdkMsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsSUFBWSxFQUNaLFNBQWlCLEVBQ2pCLG1CQUE0QjtJQUU1QixNQUFNLGdCQUFnQixHQUFHLG1CQUFtQjtRQUMxQyxDQUFDLENBQUMsbUJBQW1CO1FBQ3JCLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDakIsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUM7SUFFL0MsV0FBVyxDQUNULFlBQVksRUFDWjs7aUNBRTZCLFNBQVMsVUFBVSxJQUFJOzs0QkFFNUIsSUFBSTs7a0NBRzlCLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQ2pDLFNBQVMsZ0JBQWdCOzs7O0tBSXBCLENBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJVc2VyQmxvY2soXHJcbiAgbmFtZTogc3RyaW5nLFxyXG4gIGF2YXRhclVybDogc3RyaW5nLFxyXG4gIGZhdm9yaXRlSXRlbXNBbW91bnQ/OiBudW1iZXJcclxuKSB7XHJcbiAgY29uc3QgZmF2b3JpdGVzQ2FwdGlvbiA9IGZhdm9yaXRlSXRlbXNBbW91bnRcclxuICAgID8gZmF2b3JpdGVJdGVtc0Ftb3VudFxyXG4gICAgOiAn0L3QuNGH0LXQs9C+INC90LXRgic7XHJcbiAgY29uc3QgaGFzRmF2b3JpdGVJdGVtcyA9ICEhZmF2b3JpdGVJdGVtc0Ftb3VudDtcclxuXHJcbiAgcmVuZGVyQmxvY2soXHJcbiAgICAndXNlci1ibG9jaycsXHJcbiAgICBgXHJcbiAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWNvbnRhaW5lclwiPlxyXG4gICAgICA8aW1nIGNsYXNzPVwiYXZhdGFyXCIgc3JjPVwiJHthdmF0YXJVcmx9XCIgYWx0PVwiJHtuYW1lfVwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvXCI+XHJcbiAgICAgICAgICA8cCBjbGFzcz1cIm5hbWVcIj4ke25hbWV9PC9wPlxyXG4gICAgICAgICAgPHAgY2xhc3M9XCJmYXZcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJoZWFydC1pY29uJHtcclxuICBoYXNGYXZvcml0ZUl0ZW1zID8gJyBhY3RpdmUnIDogJydcclxufVwiPjwvaT4ke2Zhdm9yaXRlc0NhcHRpb259XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICBgXHJcbiAgKTtcclxufVxyXG4iXX0=