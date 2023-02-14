export function renderBlock(elementId, html) {
    const element = document.getElementById(elementId);
    element.innerHTML = html;
}
export function renderToast(message, action) {
    let messageText = '';
    if (message != null) {
        messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${(action === null || action === void 0 ? void 0 : action.name) || 'Закрыть'}</button>
      </div>
    `;
    }
    renderBlock('toast-block', messageText);
    const button = document.getElementById('toast-main-action');
    if (button != null) {
        button.onclick = function () {
            if (action != null && action.handler != null) {
                action.handler();
            }
            renderToast(null, null);
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJO0lBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkQsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDM0IsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU07SUFDekMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0lBRXJCLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtRQUNuQixXQUFXLEdBQUc7K0NBQzZCLE9BQU8sQ0FBQyxJQUFJO2FBQzlDLE9BQU8sQ0FBQyxJQUFJO3lDQUNnQixDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLEtBQUksU0FBUzs7S0FFN0QsQ0FBQztLQUNIO0lBRUQsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV4QyxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDNUQsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1FBQ2xCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7WUFDZixJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQzVDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtZQUNELFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDO0tBQ0g7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckJsb2NrKGVsZW1lbnRJZCwgaHRtbCkge1xyXG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xyXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclRvYXN0KG1lc3NhZ2UsIGFjdGlvbikge1xyXG4gIGxldCBtZXNzYWdlVGV4dCA9ICcnO1xyXG5cclxuICBpZiAobWVzc2FnZSAhPSBudWxsKSB7XHJcbiAgICBtZXNzYWdlVGV4dCA9IGBcclxuICAgICAgPGRpdiBpZD1cImluZm8tYmxvY2tcIiBjbGFzcz1cImluZm8tYmxvY2sgJHttZXNzYWdlLnR5cGV9XCI+XHJcbiAgICAgICAgPHA+JHttZXNzYWdlLnRleHR9PC9wPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJ0b2FzdC1tYWluLWFjdGlvblwiPiR7YWN0aW9uPy5uYW1lIHx8ICfQl9Cw0LrRgNGL0YLRjCd9PC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICB9XHJcblxyXG4gIHJlbmRlckJsb2NrKCd0b2FzdC1ibG9jaycsIG1lc3NhZ2VUZXh0KTtcclxuXHJcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvYXN0LW1haW4tYWN0aW9uJyk7XHJcbiAgaWYgKGJ1dHRvbiAhPSBudWxsKSB7XHJcbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKGFjdGlvbiAhPSBudWxsICYmIGFjdGlvbi5oYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICBhY3Rpb24uaGFuZGxlcigpO1xyXG4gICAgICB9XHJcbiAgICAgIHJlbmRlclRvYXN0KG51bGwsIG51bGwpO1xyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19